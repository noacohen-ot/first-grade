        // Track items that have been added to sequence games
        const sequenceItemsUsed = new Set();

        /**
         * Adds an item to a sequence game (sandwich or plant)
         * @param {HTMLElement} item - The clicked item element
         * @param {string} dropZoneId - The ID of the drop zone to add the item to
         */
        function addToSequence(item, dropZoneId) {
            // Check if the item is already in the sequence
            if (sequenceItemsUsed.has(item)) {
                // If clicked again, remove it from the sequence
                const dropZone = document.getElementById(dropZoneId);
                const itemInZone = dropZone.querySelector(`[data-original-id="${item.id || ''}"]`);
                if (itemInZone) {
                    dropZone.removeChild(itemInZone);
                    sequenceItemsUsed.delete(item);
                    item.style.opacity = '1';
                    item.style.border = '2px solid transparent';
                }
                return;
            }
            
            // Create a clone of the item to add to the drop zone
            const clone = item.cloneNode(true);
            const uniqueId = 'item-' + Date.now();
            clone.id = uniqueId;
            clone.setAttribute('data-original-id', item.id || '');
            clone.classList.add('clickable-item');
            clone.style.margin = '5px';
            clone.style.cursor = 'pointer';
            
            // Add click handler to remove the item when clicked in the drop zone
            clone.onclick = function() {
                // Get the original item using the stored reference
                const originalId = this.getAttribute('data-original-id');
                if (originalId) {
                    const originalItem = document.getElementById(originalId);
                    if (originalItem) {
                        // Restore the original item's appearance and make it clickable again
                        originalItem.style.opacity = '1';
                        originalItem.style.border = '2px solid transparent';
                        originalItem.style.cursor = 'pointer';
                        sequenceItemsUsed.delete(originalItem);
                    }
                } else {
                    // If no ID was stored, try to find the original by content
                    const itemText = this.querySelector('.item-text')?.textContent;
                    if (itemText) {
                        const allItems = document.querySelectorAll('.clickable-item');
                        allItems.forEach(originalItem => {
                            const originalText = originalItem.querySelector('.item-text')?.textContent;
                            if (originalText === itemText && sequenceItemsUsed.has(originalItem)) {
                                originalItem.style.opacity = '1';
                                originalItem.style.border = '2px solid transparent';
                                originalItem.style.cursor = 'pointer';
                                sequenceItemsUsed.delete(originalItem);
                            }
                        });
                    }
                }
                // Remove the clicked item from the drop zone
                this.remove();
                
                // If this was the last item, show the placeholder message again
                const dropZone = document.getElementById(dropZoneId);
                if (dropZone.children.length === 1 && dropZone.querySelector('h4')) {
                    dropZone.querySelector('h4').style.display = 'block';
                }
            };
            
            // Add the clone to the drop zone
            const dropZone = document.getElementById(dropZoneId);
            dropZone.appendChild(clone);
            
            // Mark the original item as used
            sequenceItemsUsed.add(item);
            item.style.opacity = '0.5';
            item.style.border = '2px dashed #667eea';
            
            // Remove the "drag here" message if it exists
            const message = dropZone.querySelector('h4');
            if (message && message.textContent.includes('סדרו כאן')) {
                message.remove();
            }
        }
        
        // Problem solving scenarios
        const problemScenarios = {
            rain: {
                title: '🌧️ יורד גשם ושכחתי מטריה',
                questions: [
                    '• מה אפשר לעשות כדי לא להירטב?',
                    
                    '• איפה אפשר לחכות עד שהגשם ייפסק?',
                    '• מי יכול לעזור לנו?'
                ],
                ideas: [
                    'לרוץ מהר מתחת לגגות',
                    'לבקש מטריה ממישהו',
                    'להתקשר להורים',
                    'לחכות שהגשם ייפסק',
                    'להשתמש בשקית כמו כובע',
                    'ללכת עם חבר תחת המטריה שלו'
                ]
            },
            toy: {
                title: '🧸 הצעצוע האהוב נקרע',
                questions: [
                    '• איך אפשר לתקן את הצעצוע?',
                    '• מי יכול לעזור לנו לתקן?',
                    '• מה אפשר לעשות בינתיים?'
                ],
                ideas: [
                    'לבקש מאמא או אבא לתפור',
                    'להשתמש בסרט דבק',
                    'לקחת לחנות תיקונים',
                    'לחבק אותו גם כשהוא קרוע',
                    'לשחק עם צעצוע אחר בינתיים',
                    'לתת לו שם חדש - "דובי המיוחד"'
                ]
            },
            light: {
                title: '💡 הפסקת חשמל',
                questions: [
                    '• איך אפשר להאיר את הבית?',
                    '• מה אפשר לעשות בלי חשמל?',
                    '• איך לא להיפחד מהחושך?'
                ],
                ideas: [
                    'להדליק נרות או פנס',
                    'לשחק משחקי קלפים',
                    'לספר סיפורים',
                    'לשיר שירים יחד',
                    'להסתכל על הכוכבים',
                    'להתחבק עם המשפחה'
                ]
            },
            hungry: {
                title: '🍎 רעב ואין אוכל מוכן',
                questions: [
                    '• מה אפשר לאכול מהר?',
                    '• איך אפשר להכין משהו פשוט?',
                    '• מי יכול לעזור?'
                ],
                ideas: [
                    'לאכול פרי או ירק',
                    'להכין כריך פשוט',
                    'לבקש עזרה מאמא או אבא',
                    'לשתות מים כדי לחכות',
                    'לאכול יוגורט או דגני בוקר',
                    'לבשל ביצה קשה'
                ]
            },
            lost: {
                title: '🔍 איבדתי משהו חשוב',
                questions: [
                    '• איפה ראיתי את זה בפעם האחרונה?',
                    '• איך אפשר לחפש בצורה מסודרת?',
                    '• מי יכול לעזור לי לחפש?'
                ],
                ideas: [
                    'לחפש במקומות שהייתי בהם',
                    'לבקש עזרה מהמשפחה',
                    'לנקות ולסדר כדי למצוא',
                    'לחשוב איפה השתמשתי בזה',
                    'לחפש מתחת למיטה ובכיסים',
                    'לשאול אם מישהו ראה'
                ]
            },
            bored: {
                title: '😴 משעמם ואין מה לעשות',
                questions: [
                    '• איזה דברים אני אוהב לעשות?',
                    '• מה אפשר לעשות בבית?',
                    '• עם מי אפשר לשחק?'
                ],
                ideas: [
                    'לצייר או ליצור משהו',
                    'לקרוא ספר או לשמוע סיפור',
                    'לשחק עם הצעצועים',
                    'לעזור בבית',
                    'להתקשר לחבר',
                    'לצאת לטיול קצר'
                ]
            }
        };

        // Executive functions - checks the order of items in sequence games
        function checkExecutiveOrder(gameType) {
            const orderZone = document.getElementById(gameType + 'Order');
            // Get all items in the drop zone (they should be in the order they were added)
            const items = orderZone.querySelectorAll('.clickable-item');
            const result = document.getElementById(gameType + 'Result');
            
            let correctOrder = true;
            let expectedCount = gameType === 'sandwich' ? 4 : 5;
            
            // Check if items are in the correct order
            items.forEach((item, index) => {
                const itemText = item.querySelector('.item-text').textContent;
                let expectedText = '';
                
                // Define expected text for each position based on game type
                if (gameType === 'sandwich') {
                    const sandwichSteps = [
                        'לוקחים פרוסה',
                        'מורחים שוקולד',
                        'פרוסה שנייה',
                        'סנדוויץ\' מוכן!'
                    ];
                    expectedText = sandwichSteps[index];
                } else if (gameType === 'plant') {
                    const plantSteps = [
                        'לוקחים עציץ',
                        'מוציאים שתיל',
                        'מניחים באדמה',
                        'משקים במים',
                        'פרח יפה!'
                    ];
                    expectedText = plantSteps[index];
                }
                
                if (itemText !== expectedText) {
                    correctOrder = false;
                }
            });
            
            // Show appropriate message
            if (items.length === expectedCount && correctOrder) {
                result.innerHTML = '🎉 מעולה! סידרתם נכון את השלבים!';
                result.style.color = '#4CAF50';
            } else if (items.length === expectedCount) {
                result.innerHTML = '😅 לא בדיוק... נסו שוב לסדר את השלבים בסדר הנכון';
                result.style.color = '#ff4757';
                
                // Show the correct order as a hint
                if (gameType === 'sandwich') {
                    result.innerHTML += '<br><small>הסדר הנכון: לחם → חמאה → עגבנייה → חסה → גבינה</small>';
                } else if (gameType === 'plant') {
                    result.innerHTML += '<br><small>הסדר הנכון: עציץ → שתיל → אדמה → מים → פרח</small>';
                }
            } else {
                result.innerHTML = `📝 בבקשה סדרו את כל ${expectedCount} השלבים בתיבה`;
                result.style.color = '#ffa726';
            }
        }

        // Problem solving functions
        function showProblem(problemKey) {
            const scenario = problemScenarios[problemKey];
            const display = document.getElementById('problemDisplay');
            const title = document.getElementById('problemTitle');
            const questions = document.getElementById('problemQuestions');
            const ideas = document.getElementById('solutionIdeas');
            
            title.textContent = scenario.title;
            
            questions.innerHTML = '';
            scenario.questions.forEach(q => {
                const li = document.createElement('li');
                li.textContent = q;
                li.style.marginBottom = '8px';
                questions.appendChild(li);
            });
            
            ideas.innerHTML = '';
            scenario.ideas.forEach(idea => {
                const div = document.createElement('div');
                div.textContent = '• ' + idea;
                div.style.padding = '8px';
                div.style.background = 'rgba(255,255,255,0.7)';
                div.style.borderRadius = '5px';
                ideas.appendChild(div);
            });
            
            display.style.display = 'block';
        }

