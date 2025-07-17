        // Track items that have been added to sequence games
        const sequenceItemsUsed = new Set();

        // Sandwich types configuration
        const sandwichTypes = {
            chocolate: {
                name: 'שוקולד',
                emoji: '🍫',
                steps: [
                    { emoji: '🍞', text: 'לוקחים פרוסה' },
                    { emoji: '🍫', text: 'מורחים שוקולד' },
                    { emoji: '🍞', text: 'פרוסה שנייה' },
                    { emoji: '🥪', text: 'סנדוויץ\' מוכן!' }
                ]
            },
            cottage: {
                name: 'קוטג\'',
                emoji: '🥛',
                steps: [
                    { emoji: '🍞', text: 'לוקחים פרוסה' },
                    { emoji: '🥛', text: 'מורחים קוטג\'' },
                    { emoji: '🍞', text: 'פרוסה שנייה' },
                    { emoji: '🥪', text: 'סנדוויץ\' מוכן!' }
                ]
            },
            cheese: {
                name: 'גבינה צהובה',
                emoji: '🧀',
                steps: [
                    { emoji: '🍞', text: 'לוקחים פרוסה' },
                    { emoji: '🧀', text: 'שמים גבינה' },
                    { emoji: '🍞', text: 'פרוסה שנייה' },
                    { emoji: '🥪', text: 'סנדוויץ\' מוכן!' }
                ]
            },
            tuna: {
                name: 'טונה',
                emoji: '🐟',
                steps: [
                    { emoji: '🍞', text: 'לוקחים פרוסה' },
                    { emoji: '🐟', text: 'מורחים טונה' },
                    { emoji: '🍞', text: 'פרוסה שנייה' },
                    { emoji: '🥪', text: 'סנדוויץ\' מוכן!' }
                ]
            },
            hummus: {
                name: 'חומוס',
                emoji: '🥣',
                steps: [
                    { emoji: '🍞', text: 'לוקחים פרוסה' },
                    { emoji: '🥣', text: 'מורחים חומוס' },
                    { emoji: '🍞', text: 'פרוסה שנייה' },
                    { emoji: '🥪', text: 'סנדוויץ\' מוכן!' }
                ]
            }
        };

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
            },
            lateBus: {
                title: '🚌 איחרתי את ההסעה',
                questions: [
                    '• למי אפשר להודיע?',
                    '• איך אפשר להגיע לבית הספר?',
                    '• מה לעשות בפעם הבאה?'
                ],
                ideas: [
                    'להתקשר להורים מיד',
                    'לבקש מהמורה להתקשר',
                    'לחכות להסעה הבאה',
                    'לבקש מההורים להסיע',
                    'להכין את התיק בערב',
                    'לקום 10 דקות מוקדם יותר'
                ]
            },
            bulliedBus: {
                title: '😢 הציקו לי בהסעה',
                questions: [
                    '• למי אפשר לספר?',
                    '• איך אפשר להתרחק?',
                    '• מה אומרים למי שמציק?'
                ],
                ideas: [
                    'לספר למבוגר - הורה או מורה',
                    'לשבת ליד הנהג',
                    'לשבת עם חבר טוב',
                    'להגיד בקול ברור "תפסיק"',
                    'לא להגיב ולהתעלם',
                    'לבקש עזרה מילדים אחרים'
                ]
            },
            dontUnderstand: {
                title: '❓ לא הבנתי מה המורה אמרה',
                questions: [
                    '• איך אפשר לבקש הסבר?',
                    '• ממי אפשר לבקש עזרה?',
                    '• מה עושים אחרי השיעור?'
                ],
                ideas: [
                    'להרים יד ולשאול',
                    'לבקש מהמורה להסביר שוב',
                    'לשאול חבר בשקט',
                    'לכתוב שאלה במחברת',
                    'לגשת למורה בהפסקה',
                    'לבקש עזרה בבית'
                ]
            },
            aloneRecess: {
                title: '😔 נשארתי לבד בהפסקה',
                questions: [
                    '• איך אפשר למצוא חברים?',
                    '• במה אפשר להתעסק לבד?',
                    '• למי אפשר לגשת?'
                ],
                ideas: [
                    'לגשת לקבוצת ילדים ולשאול אם אפשר להצטרף',
                    'להביא משחק ולהזמין אחרים',
                    'ללכת לספריה',
                    'לעזור למורה תורנית',
                    'לחפש ילד אחר שלבד',
                    'להכין משהו להפסקה הבאה'
                ]
            },
            hungrySchool: {
                title: '🍎 אני רעב ועדיין לא הפסקת אוכל',
                questions: [
                    '• מה אפשר לעשות עד ההפסקה?',
                    '• למי אפשר לספר?',
                    '• איך להתכונן למחר?'
                ],
                ideas: [
                    'לשתות מים',
                    'לבקש רשות לאכול משהו קטן',
                    'לחשוב על דברים אחרים',
                    'לספר למורה בשקט',
                    'להביא חטיף נוסף למחר',
                    'לאכול ארוחת בוקר גדולה יותר'
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
            let expectedSteps = [];
            
            if (gameType === 'sandwich') {
                // Get the selected sandwich type
                const selectedType = document.getElementById('sandwichType').value;
                const sandwich = sandwichTypes[selectedType];
                if (sandwich) {
                    expectedSteps = sandwich.steps.map(step => step.text);
                }
            } else if (gameType === 'plant') {
                expectedSteps = [
                    'לוקחים עציץ',
                    'מוציאים שתיל',
                    'מניחים באדמה',
                    'משקים במים',
                    'פרח יפה!'
                ];
            }
            
            // Check if items are in the correct order
            items.forEach((item, index) => {
                const itemText = item.querySelector('.item-text').textContent;
                if (index < expectedSteps.length && itemText !== expectedSteps[index]) {
                    correctOrder = false;
                }
            });
            
            // Show appropriate message
            if (items.length === expectedSteps.length && correctOrder) {
                result.innerHTML = '🎉 מעולה! סידרתם נכון את השלבים!';
                result.style.color = '#4CAF50';
            } else if (items.length === expectedSteps.length) {
                result.innerHTML = '😅 לא בדיוק... נסו שוב לסדר את השלבים בסדר הנכון';
                result.style.color = '#ff4757';
                
                // Show the correct order as a hint
                result.innerHTML += '<br><small>הסדר הנכון: ' + expectedSteps.join(' ← ') + '</small>';
            } else {
                result.innerHTML = `📝 בבקשה סדרו את כל ${expectedSteps.length} השלבים בתיבה`;
                result.style.color = '#ffa726';
            }
        }

        // Update sandwich steps based on selected type
        function updateSandwichSteps() {
            const selectedType = document.getElementById('sandwichType').value;
            const stepsContainer = document.getElementById('sandwichSteps');
            const sandwichOrder = document.getElementById('sandwichOrder');
            
            // Clear existing steps
            stepsContainer.innerHTML = '';
            
            // Clear the sandwich order zone
            const existingItems = sandwichOrder.querySelectorAll('.clickable-item');
            existingItems.forEach(item => item.remove());
            
            // Reset used items
            sequenceItemsUsed.clear();
            
            // Get the steps for the selected sandwich type
            const sandwich = sandwichTypes[selectedType];
            if (sandwich) {
                // Shuffle the steps for the game
                const shuffledSteps = [...sandwich.steps].sort(() => Math.random() - 0.5);
                
                shuffledSteps.forEach((step, index) => {
                    const stepDiv = document.createElement('div');
                    stepDiv.className = 'clickable-item';
                    stepDiv.id = `sandwich-step-${index}`;
                    stepDiv.onclick = function() { addToSequence(this, 'sandwichOrder'); };
                    stepDiv.innerHTML = `
                        <div class="item-emoji">${step.emoji}</div>
                        <div class="item-text">${step.text}</div>
                    `;
                    stepsContainer.appendChild(stepDiv);
                });
            }
        }

        // Initialize sandwich steps on page load
        document.addEventListener('DOMContentLoaded', function() {
            updateSandwichSteps();
        });

        // Handle sandwich selection change in weekly planner
        function handleSandwichChange(selectElement) {
            const day = selectElement.dataset.day;
            const customInput = document.querySelector(`.custom-sandwich-input[data-day="${day}"]`);
            
            if (selectElement.value === 'other') {
                customInput.style.display = 'block';
                customInput.focus();
            } else {
                customInput.style.display = 'none';
                customInput.value = '';
            }
        }

        // Export weekly plan to PDF
        function printWeeklyPlan() {
            const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
            const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
            
            let planText = 'תכנון סנדוויצ\'ים לשבוע\n\n';
            
            dayKeys.forEach((dayKey, index) => {
                const select = document.querySelector(`.weekly-sandwich-select[data-day="${dayKey}"]`);
                const customInput = document.querySelector(`.custom-sandwich-input[data-day="${dayKey}"]`);
                
                let sandwichName = 'לא נבחר';
                if (select.value === 'other' && customInput.value) {
                    sandwichName = `🥪 ${customInput.value}`;
                } else if (select.value && sandwichTypes[select.value]) {
                    const sandwichType = sandwichTypes[select.value];
                    sandwichName = `${sandwichType.emoji} ${sandwichType.name}`;
                }
                
                planText += `${days[index]}: ${sandwichName}\n`;
            });
            
            // Create a simple PDF using the browser's print functionality
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html dir="rtl" lang="he">
                <head>
                    <meta charset="UTF-8">
                    <title>תכנון סנדוויצ'ים לשבוע</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            direction: rtl;
                        }
                        h1 {
                            text-align: center;
                            color: #4CAF50;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 12px;
                            text-align: right;
                        }
                        th {
                            background-color: #4CAF50;
                            color: white;
                        }
                        @media print {
                            body { margin: 0; }
                            @page {
                                margin: 0.5cm;
                                size: A4;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div style="text-align: right; margin-bottom: 20px;">
                        <img src="${window.location.protocol}//${window.location.host}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/assets/images/logo.jpg" alt="Logo" style="max-width: 120px; height: auto;">
                    </div>
                    <h1>תכנון סנדוויצ'ים לשבוע</h1>
                    <table>
                        <tr>
                            <th>יום</th>
                            <th>סוג סנדוויץ'</th>
                        </tr>
            `);
            
            dayKeys.forEach((dayKey, index) => {
                const select = document.querySelector(`.weekly-sandwich-select[data-day="${dayKey}"]`);
                const customInput = document.querySelector(`.custom-sandwich-input[data-day="${dayKey}"]`);
                
                let sandwichName = '-';
                if (select.value === 'other' && customInput.value) {
                    sandwichName = `🥪 ${customInput.value}`;
                } else if (select.value && sandwichTypes[select.value]) {
                    const sandwichType = sandwichTypes[select.value];
                    sandwichName = `${sandwichType.emoji} ${sandwichType.name}`;
                }
                
                printWindow.document.write(`
                    <tr>
                        <td>${days[index]}</td>
                        <td>${sandwichName}</td>
                    </tr>
                `);
            });
            
            printWindow.document.write(`
                    </table>
                    <p style="margin-top: 30px; text-align: center;">
                        תאריך: ${new Date().toLocaleDateString('he-IL')}
                    </p>
                </body>
                </html>
            `);
            
            printWindow.document.close();
            printWindow.focus();
            
            // Trigger print dialog
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 250);
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

