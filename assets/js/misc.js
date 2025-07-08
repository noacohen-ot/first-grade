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
            
            // Update backpack if needed
            if (tabName === 'backpack') {
                updateBackpackSummary();
            }
        }

        // Setup drag and drop
        // function setupDragAndDrop() {
        //     document.addEventListener('dragstart', function(e) {
        //         if (e.target.classList.contains('draggable-item')) {
        //             e.dataTransfer.setData('text/plain', e.target.outerHTML);
        //             e.dataTransfer.setData('application/x-element-id', Math.random().toString());
        //             e.target.style.opacity = '0.5';
        //         }
        //     });

        //     document.addEventListener('dragend', function(e) {
        //         if (e.target.classList.contains('draggable-item')) {
        //             e.target.style.opacity = '1';
        //         }
        //     });

        //     document.addEventListener('dragover', function(e) {
        //         if (e.target.classList.contains('drop-zone') || e.target.closest('.drop-zone')) {
        //             e.preventDefault();
        //             const dropZone = e.target.closest('.drop-zone') || e.target;
        //             dropZone.classList.add('drag-over');
        //         }
        //     });

        //     document.addEventListener('dragleave', function(e) {
        //         if (e.target.classList.contains('drop-zone')) {
        //             e.target.classList.remove('drag-over');
        //         }
        //     });

        //     document.addEventListener('drop', function(e) {
        //         if (e.target.classList.contains('drop-zone') || e.target.closest('.drop-zone')) {
        //             e.preventDefault();
        //             const dropZone = e.target.closest('.drop-zone') || e.target;
        //             dropZone.classList.remove('drag-over');
                    
        //             const draggedHTML = e.dataTransfer.getData('text/plain');
                    
        //             // Create new element from HTML
        //             const tempDiv = document.createElement('div');
        //             tempDiv.innerHTML = draggedHTML;
        //             const newElement = tempDiv.firstChild;
                    
        //             // Remove the original element
        //             const draggedElements = document.querySelectorAll('.draggable-item');
        //             draggedElements.forEach(el => {
        //                 if (el.outerHTML === draggedHTML && el.style.opacity === '0.5') {
        //                     el.remove();
        //                 }
        //             });
                    
        //             // Add to drop zone
        //             dropZone.appendChild(newElement);
        //         }
        //     });
        // }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            //setupDragAndDrop();
            
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