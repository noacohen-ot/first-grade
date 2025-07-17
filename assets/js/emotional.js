        // Emotion selection
        function selectEmotion(element, emotion) {
            // Remove previous selections
            document.querySelectorAll('#emotions div[onclick*="selectEmotion"]').forEach(card => {
                card.style.borderColor = 'transparent';
                card.style.background = 'white';
                card.style.color = '#333';
            });
            
            // Select current emotion
            element.style.borderColor = '#ff6b6b';
            element.style.background = 'linear-gradient(45deg, #ff6b6b, #ffa726)';
            element.style.color = 'white';
            
            // Show discussion
            const emotionTalk = document.getElementById('emotionTalk');
            const emotionQuestion = document.getElementById('emotionQuestion');
            
            const questions = {
                'שמח': 'מה גורם לכם להרגיש שמחים? איך אפשר לחלוק את השמחה עם אחרים?',
                'עצוב': 'זה בסדר להרגיש עצובים לפעמים. מה עוזר לכם כשאתם עצובים?',
                'מתרגש': 'התרגשות זה נפלא! איך אפשר לנתב את ההתרגשות למשהו טוב?',
                'כועס': 'כעס זה רגש טבעי. איך אפשר להביע כעס בצורה בטוחה ובריאה?',
                'מפחד': 'פחד עוזר לנו להיות זהירים. מה עוזר לכם כשאתם מפחדים?',
                'מופתע': 'הפתעות יכולות להיות נעימות או לא. איך אתם מרגישים עם הפתעות?',
                'גאה': 'כיף להרגיש גאה בהישגים! במה אתם הכי גאים בעצמכם?',
                'מבולבל': 'לפעמים דברים לא ברורים, וזה בסדר. למי אפשר לפנות כשמבולבלים?',
                'מתבייש': 'ביישנות זה רגש טבעי. מה עוזר לכם להרגיש יותר בנוח במצבים חדשים?'
            };
            
            emotionQuestion.textContent = questions[emotion] || 'ספרו לי עוד על הרגש הזה...';
            emotionTalk.style.display = 'block';
        }

        // Calming phrases functionality
        let selectedPhrases = [];

        function selectCalmingPhrase(element, phrase) {
            // Add visual feedback
            element.style.transform = 'scale(0.95)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
            
            // Add to selected phrases if not already there
            if (!selectedPhrases.includes(phrase)) {
                selectedPhrases.push(phrase);
                updatePhrasesList();
            }
            
            // Show success message
            const temp = element.innerHTML;
            element.innerHTML = '<div style="font-size: 1.8rem;">✅</div><div style="font-size: 1.2rem; font-weight: 600;">נוסף למשפטים שלי!</div>';
            setTimeout(() => {
                element.innerHTML = temp;
            }, 1000);
        }

        function addCustomPhrase() {
            const input = document.getElementById('customPhraseInput');
            const phrase = input.value.trim();
            
            if (phrase && !selectedPhrases.includes(phrase)) {
                selectedPhrases.push(phrase);
                input.value = '';
                updatePhrasesList();
            }
        }

        function updatePhrasesList() {
            const listContainer = document.getElementById('phrasesList');
            const selectedContainer = document.getElementById('selectedPhrases');
            
            if (selectedPhrases.length > 0) {
                selectedContainer.style.display = 'block';
                listContainer.innerHTML = '';
                
                selectedPhrases.forEach((phrase, index) => {
                    const phraseDiv = document.createElement('div');
                    phraseDiv.style.cssText = `
                        background: white; 
                        padding: 15px; 
                        border-radius: 10px; 
                        margin: 10px 0; 
                        border-right: 4px solid #4CAF50; 
                        display: flex; 
                        justify-content: space-between; 
                        align-items: center;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    `;
                    phraseDiv.innerHTML = `
                        <span style="font-weight: 500;">✨ "${phrase}"</span>
                        <button onclick="removePhrase(${index})" style="background: #ff4757; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 1.2rem;">×</button>
                    `;
                    listContainer.appendChild(phraseDiv);
                });
            } else {
                selectedContainer.style.display = 'none';
            }
        }

        function removePhrase(index) {
            selectedPhrases.splice(index, 1);
            updatePhrasesList();
        }

