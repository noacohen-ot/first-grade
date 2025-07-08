        // Game state variables
        let sequenceItems = ['🍎', '🍌', '🍊', '🍓', '🍇', '🍉', '🍒', '🍍', '🦁', '🐶', '🐱', '🐔', '🐷', '🐴'];
        let currentSequence = [];
        let playerSequence = [];
        let sequenceLevel = 1;
        let sequenceShowTime = 1500; // 1.5 seconds per item

        // Memory game variables
        let memoryItems = ['🍎', '🚗', '⚽', '🎈'];
        let originalOrder = [];
        let newOrder = [];

        // Memory Game Functions
        function startMemoryGame() {
            const grid = document.getElementById('memoryGrid');
            const instructions = document.getElementById('memoryInstructions');
            const startBtn = document.getElementById('startMemoryBtn');
            const hideBtn = document.getElementById('hideCardsBtn');
            
            grid.innerHTML = '';
            // Randomize the initial order
            originalOrder = [...memoryItems].sort(() => Math.random() - 0.5);
            selectedMemoryAnswers = [];
            
            // Create memory cards with randomized order
            originalOrder.forEach((item, index) => {
                const card = document.createElement('div');
                card.style.cssText = `
                    width: 100px; 
                    height: 100px; 
                    background: linear-gradient(45deg, #667eea, #764ba2); 
                    border-radius: 15px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 3rem; 
                    color: white; 
                    cursor: pointer; 
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                `;
                card.textContent = item;
                card.dataset.original = index;
                grid.appendChild(card);
            });
            
            instructions.textContent = 'זכרו את המיקום של כל פריט!';
            startBtn.style.display = 'none';
            hideBtn.style.display = 'inline-block';
        }

        function hideCards() {
            const cards = document.querySelectorAll('#memoryGrid > div');
            const instructions = document.getElementById('memoryInstructions');
            const hideBtn = document.getElementById('hideCardsBtn');
            const checkBtn = document.getElementById('checkMemoryBtn');
            const questionDiv = document.getElementById('memoryQuestion');
            const optionsDiv = document.getElementById('memoryOptions');
            
            // Hide cards
            cards.forEach(card => {
                card.style.background = '#ddd';
                card.textContent = '?';
            });
            
            // Swap two random items
            const indices = [0, 1, 2, 3];
            const swapIndex1 = Math.floor(Math.random() * 4);
            let swapIndex2 = Math.floor(Math.random() * 4);
            while (swapIndex2 === swapIndex1) {
                swapIndex2 = Math.floor(Math.random() * 4);
            }
            
            newOrder = [...originalOrder];
            [newOrder[swapIndex1], newOrder[swapIndex2]] = [newOrder[swapIndex2], newOrder[swapIndex1]];
            changedItems = [originalOrder[swapIndex1], originalOrder[swapIndex2]];
            
            // Wait 2 seconds before revealing the swapped cards
            setTimeout(() => {
                // Show back the cards with new order
                cards.forEach((card, index) => {
                    card.style.cssText = `
                        width: 100px; 
                        height: 100px; 
                        background: linear-gradient(45deg, #667eea, #764ba2); 
                        border-radius: 15px; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        font-size: 3rem; 
                        color: white; 
                        cursor: pointer; 
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    `;
                    card.textContent = newOrder[index];
                    card.dataset.original = index;
                });

                // Show question
                instructions.textContent = 'איזה פריטים החליפו מקום? (בחרו את כל הפריטים שהחליפו מקום)';
                hideBtn.style.display = 'none';
                questionDiv.style.display = 'block';
                
                // Create options with all 4 items
                optionsDiv.innerHTML = '';
                memoryItems.forEach(item => {
                    const option = document.createElement('div');
                    option.style.cssText = `
                        background: white; 
                        padding: 15px; 
                        border-radius: 10px; 
                        text-align: center; 
                        cursor: pointer; 
                        transition: all 0.3s ease; 
                        border: 2px solid transparent;
                        font-size: 2rem;
                    `;
                    option.textContent = item;
                    option.onclick = () => toggleMemoryAnswer(option, item);
                    optionsDiv.appendChild(option);
                });
                
                checkBtn.style.display = 'inline-block';
            }, 2000);
        }

        function toggleMemoryAnswer(element, answer) {
            if (selectedMemoryAnswers.includes(answer)) {
                // Deselect
                selectedMemoryAnswers = selectedMemoryAnswers.filter(a => a !== answer);
                element.style.borderColor = 'transparent';
                element.style.background = 'white';
                element.style.color = '#333';
            } else {
                // Select
                selectedMemoryAnswers.push(answer);
                element.style.borderColor = '#667eea';
                element.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                element.style.color = 'white';
            }
        }

        function checkMemory() {
            const result = document.getElementById('memoryResult');
            const resetBtn = document.getElementById('resetMemoryBtn');
            const checkBtn = document.getElementById('checkMemoryBtn');
            
            if (selectedMemoryAnswers.length === 0) {
                result.innerHTML = '📝 אנא בחרו תשובה קודם';
                result.style.color = '#ffa726';
                return;
            }
            
            // Check if selected answers match exactly the changed items
            const isCorrect = selectedMemoryAnswers.length === changedItems.length &&
                            selectedMemoryAnswers.every(item => changedItems.includes(item)) &&
                            changedItems.every(item => selectedMemoryAnswers.includes(item));
            
            if (isCorrect) {
                result.innerHTML = '🎉 מעולה! זיהיתם נכון את כל הפריטים שהחליפו מקום!';
                result.style.color = '#4CAF50';
            } else {
                const correctItems = changedItems.join(' ו-');
                result.innerHTML = `😅 לא בדיוק... הפריטים שהחליפו מקום היו: ${correctItems}`;
                result.style.color = '#ff4757';
            }
            
            checkBtn.style.display = 'none';
            resetBtn.style.display = 'inline-block';
        }

        function resetMemoryGame() {
            const grid = document.getElementById('memoryGrid');
            const instructions = document.getElementById('memoryInstructions');
            const startBtn = document.getElementById('startMemoryBtn');
            const resetBtn = document.getElementById('resetMemoryBtn');
            const revealBtn = document.getElementById('revealCardsBtn');
            const questionDiv = document.getElementById('memoryQuestion');
            const result = document.getElementById('memoryResult');
            
            grid.innerHTML = '';
            instructions.textContent = 'זכרו את המיקום של הפריטים!';
            questionDiv.style.display = 'none';
            result.innerHTML = '';
            selectedAnswer = '';
            
            startBtn.style.display = 'inline-block';
            resetBtn.style.display = 'none';
            revealBtn.style.display = 'none';
        }

        // Sequence Game Functions
        function startSequenceGame() {
            const display = document.getElementById('sequenceDisplay');
            const inputDiv = document.getElementById('sequenceInput');
            const optionsDiv = document.getElementById('sequenceOptions');
            const result = document.getElementById('sequenceResult');
            const startBtn = document.querySelector('button[onclick="startSequenceGame()"]');
            
            // Hide start button during game
            if (startBtn) startBtn.style.display = 'none';
            
            // Clear all outputs
            display.innerHTML = '';
            optionsDiv.innerHTML = '';
            result.innerHTML = '';
            playerSequence = [];
            inputDiv.style.display = 'none';
            
            // Determine sequence length based on level
            let sequenceLength;
            if (sequenceLevel <= 2) sequenceLength = 2;
            else if (sequenceLevel <= 4) sequenceLength = 3;
            else if (sequenceLevel <= 6) sequenceLength = 4;
            else sequenceLength = 5;
            
            // Generate random sequence without duplicates
            currentSequence = [];
            const availableItems = [...sequenceItems];
            
            for (let i = 0; i < sequenceLength && i < availableItems.length; i++) {
                const randomIndex = Math.floor(Math.random() * availableItems.length);
                const selectedItem = availableItems[randomIndex];
                currentSequence.push(selectedItem);
                // Remove the selected item to prevent duplicates
                availableItems.splice(randomIndex, 1);
            }
            
            // Show sequence
            display.innerHTML = '';
            currentSequence.forEach((item, index) => {
                setTimeout(() => {
                    const itemDiv = document.createElement('div');
                    itemDiv.style.cssText = `
                        font-size: 4rem; 
                        padding: 10px; 
                        background: linear-gradient(45deg, #ff6b6b, #ffa726); 
                        border-radius: 15px; 
                        color: white; 
                        margin: 5px;
                        animation: pulse 0.5s;
                    `;
                    itemDiv.textContent = item;
                    display.appendChild(itemDiv);
                }, index * sequenceShowTime);
            });
            
            // Show input after sequence is complete
            setTimeout(() => {
                display.innerHTML = '<p style="color: #666;">עכשיו בחרו את הרצף בסדר הנכון:</p>';
                inputDiv.style.display = 'block';
                
                // Create shuffled options - include all items from the sequence plus some extras
                const optionItems = [...currentSequence];
                const remainingItems = sequenceItems.filter(item => !currentSequence.includes(item));
                
                // Add a few random items that weren't in the sequence (up to 3 extra)
                const extraCount = Math.min(3, remainingItems.length);
                for (let i = 0; i < extraCount; i++) {
                    const randomIndex = Math.floor(Math.random() * remainingItems.length);
                    optionItems.push(remainingItems[randomIndex]);
                    remainingItems.splice(randomIndex, 1);
                }
                
                // Shuffle all options
                const shuffledOptions = optionItems.sort(() => Math.random() - 0.5);
                
                optionsDiv.innerHTML = '';
                shuffledOptions.forEach(item => {
                    const option = document.createElement('div');
                    option.className = 'sequence-option';
                    option.textContent = item;
                    option.onclick = () => selectSequenceItem(option, item);
                    optionsDiv.appendChild(option);
                });
                
                // Show the check button when options are ready
                const checkBtn = document.querySelector('button[onclick="checkSequence()"]');
                if (checkBtn) checkBtn.style.display = 'inline-block';
            }, currentSequence.length * sequenceShowTime + 1000);
        }

        function selectSequenceItem(element, item) {
            if (element.classList.contains('selected')) {
                // Deselect the item
                element.classList.remove('selected');
                element.textContent = item; // Reset to original text
                
                // Remove the item from playerSequence
                const index = playerSequence.indexOf(item);
                if (index > -1) {
                    playerSequence.splice(index, 1);
                }
                
                // Update the numbering for all selected items
                const allSelected = document.querySelectorAll('.sequence-option.selected');
                allSelected.forEach((el, idx) => {
                    const itemText = el.textContent.split('. ')[1] || el.textContent;
                    el.textContent = `${idx + 1}. ${itemText}`;
                });
            } else {
                // Select the item
                element.classList.add('selected');
                playerSequence.push(item);
                element.textContent = `${playerSequence.length}. ${item}`;
            }
        }

        function checkSequence() {
            const result = document.getElementById('sequenceResult');
            const levelSpan = document.getElementById('sequenceLevel');
            const startBtn = document.querySelector('button[onclick="startSequenceGame()"]');
            const checkBtn = document.querySelector('button[onclick="checkSequence()"]');
            
            // Hide the check button immediately to prevent multiple clicks
            if (checkBtn) checkBtn.style.display = 'none';
            
            if (playerSequence.length < currentSequence.length) {
                result.innerHTML = '📝 אנא בחרו את כל הפריטים ברצף';
                result.style.color = '#ffa726';
                // Show the button again if validation fails
                if (checkBtn) checkBtn.style.display = 'inline-block';
                return;
            } else if (playerSequence.length > currentSequence.length) {
                result.innerHTML = '❌ בחרתם יותר מדי פריטים! נסו שוב';
                result.style.color = '#ff4757';
                // Show the button again if validation fails
                if (checkBtn) checkBtn.style.display = 'inline-block';
                return;
            }
            
            const correct = playerSequence.every((item, index) => item === currentSequence[index]);
            
            if (correct) {
                sequenceLevel++;
                result.innerHTML = `🎉 מעולה! עלינו לרמה ${sequenceLevel}`;
                result.style.color = '#4CAF50';
                levelSpan.textContent = `רמה: ${sequenceLevel}`;
                
                // Clear the options before starting the next level
                const optionsDiv = document.getElementById('sequenceOptions');
                if (optionsDiv) optionsDiv.innerHTML = '';
                
                setTimeout(() => {
                    startSequenceGame();
                }, 2000);
            } else {
                result.innerHTML = '😅 לא בדיוק... הרצף הנכון היה: ' + currentSequence.join(' ← ');
                result.style.color = '#ff4757';
                // Show start button again on failure
                if (startBtn) startBtn.style.display = 'inline-block';
            }
        }

