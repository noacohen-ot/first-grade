// Tab functionality
function showTab(tabId) {
    // Get all tab contents and buttons
    const allTabs = document.querySelectorAll('.tab-content');
    const allButtons = document.querySelectorAll('.main-tab');
    const tabsContainer = document.querySelector('.tabs-container');
    
    // If no tab ID is provided, default to home
    if (!tabId) {
        tabId = 'home';
    }
    
    // Show loading state
    if (tabsContainer) {
        tabsContainer.style.minHeight = '300px'; // Prevent layout shift
    }
    
    // Deactivate all tabs and buttons
    allTabs.forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active');
        tab.style.visibility = 'hidden';
    });
    
    allButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Find and activate the selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        // Show the selected tab
        selectedTab.style.display = 'block';
        selectedTab.style.visibility = 'visible';
        selectedTab.classList.add('active');
        
        // Activate the corresponding button
        const clickedButton = Array.from(allButtons).find(button => 
            button.getAttribute('onclick') && button.getAttribute('onclick').includes(`'${tabId}'`)
        );
        if (clickedButton) {
            clickedButton.classList.add('active');
        }
        
        // Save the current tab to localStorage
        try {
            localStorage.setItem('lastActiveTab', tabId);
        } catch (e) {
            console.error('Error saving tab state:', e);
        }
        
        // Scroll to top of the page
        window.scrollTo(0, 0);
    } else {
        console.error(`Tab with ID '${tabId}' not found`);
        // Fallback to home tab if the requested tab doesn't exist
        if (tabId !== 'home') {
            showTab('home');
        }
    }
}

// Drag and drop functionality
function setupDragAndDrop() {
    // Use event delegation for dynamically added elements
    document.addEventListener('dragstart', function(e) {
        if (e.target.classList.contains('draggable-item')) {
            e.target.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', e.target.dataset.item || '');
            
            // Store the original parent if this is the first drag
            if (!e.target.dataset.originalParent) {
                e.target.dataset.originalParent = e.target.parentNode.id;
            }
        }
    });
    
    document.addEventListener('dragend', function(e) {
        if (e.target.classList.contains('draggable-item')) {
            e.target.classList.remove('dragging');
        }
    });
    
    // Handle dragover for drop zones
    document.addEventListener('dragover', function(e) {
        if (e.target.classList.contains('drop-zone') || e.target.closest('.drop-zone')) {
            e.preventDefault();
            const dropZone = e.target.classList.contains('drop-zone') ? e.target : e.target.closest('.drop-zone');
            dropZone.classList.add('drag-over');
            e.dataTransfer.dropEffect = 'move';
        }
    });
    
    // Handle dragleave for drop zones
    document.addEventListener('dragleave', function(e) {
        if (e.target.classList.contains('drop-zone')) {
            e.target.classList.remove('drag-over');
        }
    });
    
    // Handle drop
    document.addEventListener('drop', function(e) {
        e.preventDefault();
        
        // Find the drop zone (could be the target or a parent)
        let dropZone = e.target;
        if (!dropZone.classList.contains('drop-zone')) {
            dropZone = e.target.closest('.drop-zone');
        }
        
        if (dropZone) {
            // Remove drag-over class from all drop zones
            document.querySelectorAll('.drop-zone').forEach(zone => {
                zone.classList.remove('drag-over');
            });
            
            const data = e.dataTransfer.getData('text/plain');
            const draggedItem = document.querySelector(`.draggable-item[data-item="${data}"]`);
            
            if (draggedItem) {
                // Clone the item if it's being dragged from the original container
                if (draggedItem.parentNode.id === 'sortingItems') {
                    const clone = draggedItem.cloneNode(true);
                    clone.setAttribute('draggable', 'true');
                    clone.classList.add('draggable-item');
                    dropZone.appendChild(clone);
                } else {
                    // Move the existing item
                    dropZone.appendChild(draggedItem);
                }
                
                // Adjust the drop zone's minimum height if needed
                if (dropZone.children.length > 1) {
                    dropZone.style.minHeight = 'auto';
                }
            }
        }
    });
    
    // Make sure all draggable items have the correct attributes
    function updateDraggableItems() {
        document.querySelectorAll('.draggable-item').forEach(item => {
            if (!item.getAttribute('draggable')) {
                item.setAttribute('draggable', 'true');
            }
        });
    }
    
    // Update draggable items when the tab changes
    document.addEventListener('DOMContentLoaded', updateDraggableItems);
    document.addEventListener('showTab', updateDraggableItems);
}

// Sequence game functionality
function setupSequenceGame() {
    const sequenceOptions = document.querySelectorAll('.sequence-option');
    let sequence = [];
    let userSequence = [];
    let canPlay = false;
    
    // Start the game
    document.getElementById('startSequenceGame')?.addEventListener('click', () => {
        sequence = [];
        userSequence = [];
        canPlay = false;
        document.getElementById('sequenceFeedback').textContent = '';
        nextRound();
    });
    
    // Add number to sequence
    function nextRound() {
        canPlay = false;
        const nextNumber = Math.floor(Math.random() * 5) + 1;
        sequence.push(nextNumber);
        
        // Show sequence to user
        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                const number = sequence[i];
                const option = document.querySelector(`[data-number="${number}"]`);
                if (option) {
                    option.classList.add('selected');
                    setTimeout(() => {
                        option.classList.remove('selected');
                    }, 500);
                }
                i++;
            } else {
                clearInterval(interval);
                canPlay = true;
                userSequence = [];
            }
        }, 1000);
    }
    
    // Handle user input
    sequenceOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (!canPlay) return;
            
            const number = parseInt(option.dataset.number);
            userSequence.push(number);
            
            // Check if user's sequence matches so far
            for (let i = 0; i < userSequence.length; i++) {
                if (userSequence[i] !== sequence[i]) {
                    // Game over
                    document.getElementById('sequenceFeedback').textContent = '❌ נסו שוב!';
                    canPlay = false;
                    return;
                }
            }
            
            // If user completed the sequence
            if (userSequence.length === sequence.length) {
                document.getElementById('sequenceFeedback').textContent = '✅ מעולה! הנה עוד מספר...';
                setTimeout(nextRound, 1000);
            }
        });
    });
}

// Problem situation functionality
function showProblem(problemId) {
    const problems = {
        'rain': {
            title: 'שכחתי את התיק בבית',
            questions: [
                'איך אני מרגיש עכשיו?',
                'מה אני יכול לעשות כדי לפתור את הבעיה?',
                'מי יכול לעזור לי?'
            ],
            tips: [
                'אפשר לבקש להשתמש בדפים של חבר/ה',
                'אפשר לבקש מהמורה להתקשר להורים',
                'אפשר להציע לעזור למורה בתמורה'
            ]
        },
        'forgot': {
            title: 'שכחתי את התיק בבית',
            questions: [
                'איך אני מרגיש עכשיו?',
                'מה אני יכול לעשות כדי לפתור את הבעיה?',
                'איך אוכל למנוע את זה בפעם הבאה?'
            ],
            tips: [
                'אפשר להכין את התיק בערב לפני',
                'אפשר להכין רשימת ציוד ולסמן מה הכנסנו',
                'אפשר לבקש עזרה מההורים'
            ]
        },
        'lost': {
            title: 'איבדתי את הקלמר שלי',
            questions: [
                'איפה ראיתי אותו בפעם האחרונה?',
                'איפה כדאי לחפש?',
                'למי אפשר לפנות לעזרה?'
            ],
            tips: [
                'לחפש בכיתה ליד השולחן',
                'לשאול את המורה אם מישהו מסר',
                'לבדוק בארון או בתיק'
            ]
        }
    };
    
    const problem = problems[problemId];
    if (!problem) return;
    
    const problemDisplay = document.getElementById('problemDisplay');
    const problemTitle = document.getElementById('problemTitle');
    const problemQuestions = document.getElementById('problemQuestions');
    const problemTips = document.getElementById('problemTips');
    
    problemDisplay.style.display = 'block';
    problemTitle.textContent = problem.title;
    
    // Update questions
    problemQuestions.innerHTML = problem.questions.map(q => 
        `<div style="margin-bottom: 10px;">• ${q}</div>`
    ).join('');
    
    // Update tips
    problemTips.innerHTML = problem.tips.map(tip => 
        `<div style="background: white; padding: 8px 12px; border-radius: 15px; margin: 5px 0; color: #333;">${tip}</div>`
    ).join('');
}

// Social situation functionality
function showSocialSituation(situationId) {
    const situations = {
        'sharing': {
            title: 'חבר/ה לא רוצה לשתף איתך במשחק',
            question: 'מה תעשה?',
            options: [
                'אתעצבן ואלך משם',
                'אבקש יפה לשחק איתו/ה',
                'אציע משחק אחר שאפשר לשחק ביחד'
            ],
            feedback: 'תמיד טוב לנסות לדבר בצורה נעימה ולחשוב על פתרונות יצירתיים!' 
        },
        'team': {
            title: 'לא בחרו אותך לקבוצה',
            question: 'איך תגיב?',
            options: [
                'אכעס ואלך הביתה',
                'אבקש להצטרף לקבוצה אחרת',
                'אציע להיות שופט או עוזר מורה'
            ],
            feedback: 'מותר להרגיש מאוכזב, אבל חשוב לזכור שיש עוד הזדמנויות לשחק!' 
        },
        'mistake': {
            title: 'טעית בשעורי בית',
            question: 'מה תעשה?',
            options: [
                'אקרע את הדף',
                'אתקן את הטעות',
                'אבקש עזרה'
            ],
            feedback: 'כולם טועים לפעמים - מה שחשוב זה לנסות שוב ולא לוותר!' 
        }
    };
    
    const situation = situations[situationId];
    if (!situation) return;
    
    const detailSection = document.getElementById('socialSituationDetail');
    detailSection.style.display = 'block';
    
    detailSection.innerHTML = `
        <div class="game-container">
            <h4>${situation.title}</h4>
            <p style="font-size: 1.2rem; margin: 20px 0;">${situation.question}</p>
            
            <div style="display: flex; flex-direction: column; gap: 15px; margin: 25px 0;">
                ${situation.options.map((option, index) => `
                    <button class="btn" onclick="showSocialFeedback(${index}, '${situationId}')" 
                            style="text-align: right; width: 100%;">
                        ${option}
                    </button>
                `).join('')}
            </div>
            
            <div id="socialFeedback" style="margin-top: 20px; padding: 15px; border-radius: 10px; 
                                         background: #f0f8ff; display: none;">
                <p style="font-weight: 600; color: #333;">${situation.feedback}</p>
                <button class="btn" onclick="document.getElementById('socialFeedback').style.display = 'none';">
                    הבנתי!
                </button>
            </div>
        </div>
    `;
}

function showSocialFeedback(optionIndex, situationId) {
    const feedbackDiv = document.getElementById('socialFeedback');
    const feedbackText = feedbackDiv.querySelector('p');
    
    // In a real app, you might have different feedback for each option
    feedbackDiv.style.display = 'block';
    feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Global initialization function for all components
function initComponents() {
    console.log('Initializing all components...');
    
    // Initialize drag and drop functionality
    setupDragAndDrop();
    
    // Initialize sequence game
    setupSequenceGame();
    
    // Initialize any other components here
    if (typeof initBackpackTab === 'function') {
        initBackpackTab();
    }
    
    console.log('All components initialized');
}

/**
 * Check if the day sequence is in the correct order
 */
function checkDaySequence() {
    const correctOrder = [
        'wake-up',       // מתעורר בבוקר
        'breakfast',     // אוכל ארוחת בוקר
        'school',        // הולך לבית הספר
        'lunch',         // אוכל ארוחת צהריים
        'homework',      // עושה שיעורי בית
        'play',          // משחק עם חברים
        'dinner',        // אוכל ארוחת ערב
        'sleep'          // הולך לישון
    ];

    const daySequence = document.getElementById('daySequence');
    const items = Array.from(daySequence.querySelectorAll('.draggable-item'));
    const feedback = document.getElementById('sequenceFeedback');
    
    // Check if all items are placed
    if (items.length !== correctOrder.length) {
        feedback.textContent = 'לא סידרת את כל הפעולות. נסה שוב!';
        feedback.style.color = '#e74c3c';
        return;
    }
    
    // Check the order of items
    const isCorrect = items.every((item, index) => {
        return item.dataset.item === correctOrder[index];
    });
    
    if (isCorrect) {
        feedback.textContent = 'כל הכבוד! סידרת את היום בצורה מושלמת! 🎉';
        feedback.style.color = '#27ae60';
        
        // Add celebration effect
        daySequence.classList.add('celebrate');
        setTimeout(() => {
            daySequence.classList.remove('celebrate');
        }, 2000);
    } else {
        feedback.textContent = 'לא בדיוק... נסה לסדר מחדש לפי סדר היום הנכון.';
        feedback.style.color = '#e67e22';
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initComponents();
    
    // Show the home tab by default or the last active tab
    const lastActiveTab = localStorage.getItem('lastActiveTab');
    showTab(lastActiveTab || 'home');
    
    // Add click handler for print button if it exists
    const printButton = document.getElementById('printBackpackBtn');
    if (printButton) {
        printButton.addEventListener('click', printBackpack);
    }
});

// Make sure these functions are available globally
window.showTab = showTab;
window.printBackpack = function() {
    window.print();
};
