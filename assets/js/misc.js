        // Tab navigation
        function showTab(tabName) {
            // Hide all tabs
            const allTabs = document.querySelectorAll('.tab-content');
            allTabs.forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active from all buttons
            const allButtons = document.querySelectorAll('.main-tab');
            allButtons.forEach(button => {
                button.classList.remove('active');
            });
            
            // Show selected tab
            const selectedTab = document.getElementById(tabName);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
            
            // Find and activate the clicked button
            allButtons.forEach(button => {
                if (button.getAttribute('onclick') && button.getAttribute('onclick').includes(`'${tabName}'`)) {
                    button.classList.add('active');
                }
            });
            
            // Save current tab to localStorage
            localStorage.setItem('currentTab', tabName);
            
            // Update backpack if needed
            if (tabName === 'backpack') {
                updateBackpackSummary();
            }
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            //setupDragAndDrop();
            
            // Restore the last active tab from localStorage
            const savedTab = localStorage.getItem('currentTab');
            if (savedTab) {
                showTab(savedTab);
            }
            
            // Enter key support for inputs
            document.getElementById('strengthInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') addStrength();
            });
            
            document.getElementById('challengeInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') addChallenge();
            });
            
            document.getElementById('helpInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') addHelp();
            });
            
            document.getElementById('customPhraseInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') addCustomPhrase();
            });
        });