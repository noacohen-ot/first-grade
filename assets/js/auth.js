// Authentication handling
let validPasscodes = [];
let isAuthenticated = false;
let configLoadFailed = false;

// Master passcode - only works if config.json fails to load
const MASTER_PASSCODE = "NOACOHEN";

// Load passcodes from config.json
async function loadPasscodes() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        validPasscodes = config.passcodes || [];
        configLoadFailed = false;
        return true;
    } catch (error) {
        console.warn('Failed to load config.json, master passcode enabled:', error);
        configLoadFailed = true;
        return false;
    }
}

// Check if user has saved passcode
async function checkSavedPasscode() {
    const savedPasscode = localStorage.getItem('firstGradePasscode');
    if (savedPasscode) {
        const isValid = await validatePasscode(savedPasscode, false);
        if (!isValid) {
            // Clear invalid passcode from storage
            localStorage.removeItem('firstGradePasscode');
        }
        return isValid;
    }
    return false;
}

// Validate passcode against config
async function validatePasscode(passcode, showError = true) {
    // If we haven't tried loading config yet, try now
    if (validPasscodes.length === 0 && !configLoadFailed) {
        await loadPasscodes();
    }
    
    // Check against loaded passcodes
    if (validPasscodes.includes(passcode)) {
        isAuthenticated = true;
        return true;
    }
    
    // Check master passcode only if config load failed
    if (configLoadFailed && passcode === MASTER_PASSCODE) {
        isAuthenticated = true;
        return true;
    }
    
    if (showError) {
        showAuthError('קוד הגישה אינו תקף');
    }
    return false;
}

// Show authentication modal
function showAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Hide authentication modal
function hideAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Show error message
function showAuthError(message) {
    const errorDiv = document.getElementById('authError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

// Handle passcode submission
async function submitPasscode() {
    const input = document.getElementById('passcodeInput');
    const passcode = input.value.trim();
    
    if (!passcode) {
        showAuthError('נא להזין קוד גישה');
        return;
    }
    
    const isValid = await validatePasscode(passcode);
    
    if (isValid) {
        // Check if user wants to save passcode
        const saveCheckbox = document.getElementById('savePasscode');
        if (saveCheckbox && saveCheckbox.checked) {
            localStorage.setItem('firstGradePasscode', passcode);
        }
        
        // Hide modal and show main content
        hideAuthModal();
        document.querySelector('.container').style.display = 'block';
    } else {
        input.value = '';
        input.focus();
    }
}

// Handle logout
function logout() {
    localStorage.removeItem('firstGradePasscode');
    isAuthenticated = false;
    location.reload();
}

// Initialize authentication on page load
async function initAuth() {
    // Try to load passcodes from config first
    await loadPasscodes();
    
    // First check if we have a saved passcode
    const hasSavedPasscode = await checkSavedPasscode();
    
    if (hasSavedPasscode) {
        // User has valid saved passcode, show content
        document.querySelector('.container').style.display = 'block';
    } else {
        // Show authentication modal
        document.querySelector('.container').style.display = 'none';
        showAuthModal();
    }
}

// Show password while button is pressed
function showPassword() {
    const input = document.getElementById('passcodeInput');
    const icon = document.getElementById('togglePasswordIcon');
    
    input.type = 'text';
    icon.textContent = '👁️';
}

// Hide password when button is released
function hidePassword() {
    const input = document.getElementById('passcodeInput');
    const icon = document.getElementById('togglePasswordIcon');
    
    input.type = 'password';
    icon.textContent = '👁️‍🗨️';
}

// Add enter key support for passcode input
document.addEventListener('DOMContentLoaded', function() {
    const passcodeInput = document.getElementById('passcodeInput');
    if (passcodeInput) {
        passcodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitPasscode();
            }
        });
    }
});