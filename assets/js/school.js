        // Global variables
        let breathingInterval = null;

        // UI state
        let selectedSortableItem = null; // Track the currently selected sortable item

        // Click-based interaction functions
        function moveToDropZone(item, dropZoneId) {
            const dropZone = document.getElementById(dropZoneId);
            if (dropZone) {
                // Clone the item to avoid removing it from the original container
                const clonedItem = item.cloneNode(true);
                // Remove the click handler to prevent re-selection
                clonedItem.onclick = null;
                // Add a way to return the item
                clonedItem.style.cursor = 'pointer';
                clonedItem.onclick = function() {
                    this.remove();
                    // Re-enable the original item
                    item.style.opacity = '1';
                    item.style.pointerEvents = 'auto';
                };
                
                // Add to drop zone
                dropZone.appendChild(clonedItem);
                
                // Visual feedback
                item.style.opacity = '0.5';
                item.style.pointerEvents = 'none';
            }
        }

        function selectSortableItem(item) {
            // Deselect all other items
            document.querySelectorAll('.sortable-item').forEach(i => {
                if (i !== item) {
                    i.style.border = '2px solid transparent';
                    i.style.boxShadow = 'none';
                }
            });
            
            // Select the clicked item
            item.style.border = '2px solid #667eea';
            item.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.5)';
            selectedSortableItem = item;
            
            // Store the item's text content as an identifier
            const itemText = item.textContent.trim();
            if (itemText) {
                selectedSortableItem.setAttribute('data-item-text', itemText);
            }
        }
        
        function moveSelectedToZone(category) {
            if (!selectedSortableItem) return;
            
            const zone = document.querySelector(`.sorting-zone-items[data-category="${category}"]`);
            if (zone) {
                // Check if item is already in a zone
                if (selectedSortableItem.parentElement.classList.contains('sorting-zone-items')) {
                    selectedSortableItem.remove();
                }
                
                // Clone the item and add to the zone
                const clonedItem = selectedSortableItem.cloneNode(true);
                clonedItem.style.border = '2px dashed #ccc';
                clonedItem.style.boxShadow = 'none';
                
                // Store the item's text content on the cloned item
                const itemText = selectedSortableItem.getAttribute('data-item-text') || selectedSortableItem.textContent.trim();
                if (itemText) {
                    clonedItem.setAttribute('data-original-text', itemText);
                }
                
                clonedItem.onclick = function() {
                    // Find and restore the original item by matching text content
                    const originalText = this.getAttribute('data-original-text');
                    if (originalText) {
                        // Find the first matching item that's not in a drop zone
                        const allItems = document.querySelectorAll('.sortable-item');
                        for (const originalItem of allItems) {
                            const itemText = originalItem.getAttribute('data-item-text') || originalItem.textContent.trim();
                            if (itemText === originalText && 
                                !originalItem.closest('.sorting-zone-items') && 
                                originalItem.style.opacity !== '1') {
                                originalItem.style.opacity = '1';
                                originalItem.style.pointerEvents = 'auto';
                                originalItem.style.border = '2px solid transparent';
                                originalItem.style.boxShadow = 'none';
                                break;
                            }
                        }
                    }
                    // Remove the cloned item from the drop zone
                    this.remove();
                };
                
                zone.appendChild(clonedItem);
                
                // Visual feedback
                selectedSortableItem.style.opacity = '0.5';
                selectedSortableItem.style.pointerEvents = 'none';
                selectedSortableItem.style.border = '2px solid transparent';
                selectedSortableItem.style.boxShadow = 'none';
                selectedSortableItem = null;
            }
        }
        
        // Update breathing instructions based on selected type
        function updateBreathingInstructions() {
            const breathingType = document.querySelector('input[name="breathingType"]:checked').value;
            const instructionsDiv = document.getElementById('breathingInstructions');
            
            if (breathingType === 'balloon') {
                instructionsDiv.innerHTML = `
                    <p><strong>איך עושים נשימת בלון?</strong></p>
                    <p>1. שימו יד על הבטן</p>
                    <p>2. הכניסו אוויר לאט דרך האף - הבטן מתנפחת כמו בלון 🎈</p>
                    <p>3. עצרו רגע</p>
                    <p>4. הוציאו אוויר לאט דרך הפה - הבלון מתרוקן 💨</p>
                `;
            } else {
                instructionsDiv.innerHTML = `
                    <p><strong>איך עושים נשימת פרח ונר?</strong></p>
                    <p>1. דמיינו שאתם מחזיקים פרח יפה 🌸</p>
                    <p>2. הריחו את הפרח - שאפו לאט ועמוק דרך האף</p>
                    <p>3. עכשיו דמיינו נר דולק 🕯️</p>
                    <p>4. כבו את הנר - נשפו לאט ובעדינות דרך הפה</p>
                `;
            }
        }

        // Breathing animation
        function startBreathing() {
            const balloon = document.getElementById('schoolBalloon');
            const balloonText = document.getElementById('schoolBalloonText');
            const breathingType = document.querySelector('input[name="breathingType"]:checked').value;
            let isInhaling = true;
            
            stopBreathing();
            
            // Disable breathing type selection
            const radioButtons = document.querySelectorAll('input[name="breathingType"]');
            radioButtons.forEach(radio => {
                radio.disabled = true;
            });
            
            // Add visual feedback that options are disabled
            const labels = document.querySelectorAll('.breathing-option');
            labels.forEach(label => {
                label.style.opacity = '0.6';
                label.style.cursor = 'not-allowed';
            });
            
            balloonText.textContent = 'התכוננו...';

            breathingInterval = setInterval(() => {
                if (breathingType === 'balloon') {
                    if (isInhaling) {
                        balloon.style.transform = 'scale(1.3)';
                        balloon.style.borderRadius = '50%';
                        balloon.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                        balloonText.textContent = 'שאפו לאט דרך האף... 🌬️';
                        balloonText.style.fontSize = '1rem';
                    } else {
                        balloon.style.transform = 'scale(1)';
                        balloon.style.borderRadius = '50%';
                        balloon.style.background = 'linear-gradient(45deg, #ff6b6b, #ffa726)';
                        balloonText.textContent = 'נשפו לאט דרך הפה... 💨';
                        balloonText.style.fontSize = '1rem';
                    }
                } else {
                    if (isInhaling) {
                        balloon.style.transform = 'scale(1.3)';
                        balloon.style.borderRadius = '35% 65% 65% 35% / 35% 65% 35% 65%';
                        balloon.style.background = 'radial-gradient(circle at center, #ff99cc 30%, #ff66c4 60%, #ff1493 100%)';
                        balloon.style.boxShadow = '0 0 30px rgba(255, 102, 196, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.3)';
                        balloonText.innerHTML = '🌸';
                        balloonText.style.fontSize = '3rem';
                    } else {
                        balloon.style.transform = 'scale(1)';
                        balloon.style.borderRadius = '50%';
                        balloon.style.background = 'linear-gradient(45deg, #ffa500, #ff6347)';
                        balloon.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                        balloonText.innerHTML = '🕯️';
                        balloonText.style.fontSize = '4rem';
                    }
                }
                isInhaling = !isInhaling;
            }, 4000);
        }

        function stopBreathing() {
            if (breathingInterval) {
                clearInterval(breathingInterval);
                breathingInterval = null;
            }
            
            const balloon = document.getElementById('schoolBalloon');
            const balloonText = document.getElementById('schoolBalloonText');
            balloon.style.transform = 'scale(1)';
            balloon.style.borderRadius = '50%';
            balloon.style.background = 'linear-gradient(45deg, #ff6b6b, #ffa726)';
            balloon.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            balloonText.innerHTML = 'נשימה רגועה 😌';
            balloonText.style.fontSize = '1rem';
            
            // Re-enable breathing type selection
            const radioButtons = document.querySelectorAll('input[name="breathingType"]');
            radioButtons.forEach(radio => {
                radio.disabled = false;
            });
            
            // Restore visual feedback
            const labels = document.querySelectorAll('.breathing-option');
            labels.forEach(label => {
                label.style.opacity = '1';
                label.style.cursor = 'pointer';
            });
        }

        // School day ordering game
        function checkSchoolDayOrder() {
            const orderZone = document.getElementById('schoolDayOrder');
            const items = orderZone.querySelectorAll('.clickable-item');
            const result = document.getElementById('schoolDayResult');
            
            let correctOrder = true;
            items.forEach((item, index) => {
                const expectedOrder = parseInt(item.dataset.order);
                if (expectedOrder !== index + 1) {
                    correctOrder = false;
                }
            });
                        
            if (items.length === 6 && correctOrder) {
                result.innerHTML = '🎉 מעולה! סידרתם נכון את סדר היום בבית הספר!';
                result.style.color = '#4CAF50';
            } else if (items.length === 6) {
                result.innerHTML = '😅 לא בדיוק... בואו נחשוב על דרך אחרת שזה יכול לעבוד<br>הסדר הנכון: הגעה ← כניסה ← שיעור ← הפסקה ← שיעור ← נסיעה הביתה';
                result.style.color = '#ff4757';
            } else {
                result.innerHTML = '📝 בבקשה סדרו את כל הפעולות בתיבה';
                result.style.color = '#ffa726';
            }
        }

        // Sorting game
        function checkSortingAnswers() {
            const zones = document.querySelectorAll('.sorting-zone[data-category]');
            const result = document.getElementById('sortingResult');
            
            let totalItems = 0;
            let correctItems = 0;
            
            zones.forEach(zone => {
                const category = zone.dataset.category;
                const items = zone.querySelectorAll('.sortable-item');
                
                items.forEach(item => {
                    totalItems++;
                    if (item.dataset.category === category) {
                        correctItems++;
                        item.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                    } else if (item.dataset.category === 'maybe') {
                        // Color "maybe" items yellow when placed incorrectly
                        item.style.background = 'linear-gradient(45deg, #FFC107, #FFA000)';
                    } else {
                        item.style.background = 'linear-gradient(45deg, #ff4757, #ff3742)';
                    }
                });
            });
            
            if (totalItems === 0) {
                result.innerHTML = '📝 בבקשה בחרו לפחות פריט אחד!';
                result.style.color = '#ff4757';
            } else {
                const percentage = Math.round((correctItems / totalItems) * 100);
                if (percentage >= 80) {
                    result.innerHTML = `🌟 מעולה! חשבתם יחד אילו פריטים מתאימים לבית הספר ואילו לא!`;
                    result.style.color = '#4CAF50';
                } else if (percentage >= 60) {
                    result.innerHTML = `👍 טוב מאוד! חשבתם יחד אילו פריטים מתאימים לבית הספר ואילו לא`;
                    result.style.color = '#ffa726';
                } else {
                    result.innerHTML = `💪 בואו ננסה שוב`;
                    result.style.color = '#ff4757';
                }

                // Count only original sortable items (not in drop zones)
                const originalItems = document.querySelectorAll('.sortable-item:not(.sorting-zone .sortable-item)');
                if (totalItems < originalItems.length) {
                    result.innerHTML += '<br>בחרו פריטים נוספים והמשיכו לסדר!';
                }
            }
        }

        