// Data persistence functionality
const STORAGE_KEY = 'firstGradeAppData';

// Save breathing type when it changes
function saveBreathingType() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    data.breathingType = document.querySelector('input[name="breathingType"]:checked')?.value || 'balloon';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Load breathing type preference
function loadBreathingType() {
    const savedDataStr = localStorage.getItem(STORAGE_KEY);
    if (!savedDataStr) return;
    
    try {
        const data = JSON.parse(savedDataStr);
        if (data.breathingType) {
            // Wait a bit to ensure radio buttons are rendered
            setTimeout(() => {
                const breathingRadio = document.querySelector(`input[name="breathingType"][value="${data.breathingType}"]`);
                if (breathingRadio) {
                    breathingRadio.checked = true;
                    if (typeof updateBreathingInstructions !== 'undefined') {
                        updateBreathingInstructions();
                    }
                }
            }, 100);
        }
    } catch (error) {
        console.error('Error loading breathing type:', error);
    }
}

// Save only calming phrases
function saveCalmingPhrases() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    data.selectedPhrases = typeof selectedPhrases !== 'undefined' ? selectedPhrases : [];
    data.customPhrase = document.getElementById('customPhraseInput')?.value || '';
    data.savedAt = new Date().toISOString();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Load calming phrases
function loadCalmingPhrases() {
    const savedDataStr = localStorage.getItem(STORAGE_KEY);
    if (!savedDataStr) return;
    
    try {
        const data = JSON.parse(savedDataStr);
        
        // Load selected phrases
        if (data.selectedPhrases && typeof selectedPhrases !== 'undefined') {
            selectedPhrases.length = 0;
            selectedPhrases.push(...data.selectedPhrases);
            if (typeof updatePhrasesList !== 'undefined') {
                updatePhrasesList();
            }
        }
        
        // Load custom phrase
        if (data.customPhrase) {
            const customInput = document.getElementById('customPhraseInput');
            if (customInput) {
                customInput.value = data.customPhrase;
            }
        }
    } catch (error) {
        console.error('Error loading calming phrases:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load breathing type when school tab is shown
    const schoolTab = document.querySelector('button[onclick*="showTab(\'school\')"]');
    if (schoolTab) {
        schoolTab.addEventListener('click', function() {
            setTimeout(loadBreathingType, 50);
        });
    }
    
    // Also load immediately in case school tab is already visible
    loadBreathingType();
    
    // Load calming phrases when emotions tab is shown
    const emotionsTab = document.querySelector('button[onclick*="showTab(\'emotions\')"]');
    if (emotionsTab) {
        emotionsTab.addEventListener('click', function() {
            setTimeout(loadCalmingPhrases, 50);
        });
    }
    
    // Also load calming phrases immediately
    loadCalmingPhrases();
});