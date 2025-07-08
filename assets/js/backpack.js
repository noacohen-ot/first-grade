        // Global variables
        let strengths = [];
        let challenges = [];
        let helpItems = [];
        let gradeEmotions = []; // Store selected emotions for grade transition
        let savedThoughts = { // Initialize saved thoughts object
            exciting: '',
            worried: '',
            hopeful: ''
        };


        // Grade emotions toggle
        function toggleGradeEmotion(element, emotion) {
            if (element.style.borderColor === 'rgb(255, 107, 107)') {
                // Remove selection
                element.style.borderColor = 'transparent';
                element.style.background = 'white';
                element.style.color = '#333';
                
                const index = gradeEmotions.indexOf(emotion);
                if (index > -1) {
                    gradeEmotions.splice(index, 1);
                }
            } else {
                // Add selection
                element.style.borderColor = '#ff6b6b';
                element.style.background = 'linear-gradient(45deg, #ff6b6b, #ffa726)';
                element.style.color = 'white';
                
                if (!gradeEmotions.includes(emotion)) {
                    gradeEmotions.push(emotion);
                }
            }
            
            updateGradeEmotions();
        }

        function updateGradeEmotions() {
            const display = document.getElementById('selectedGradeEmotions');
            if (gradeEmotions.length > 0) {
                display.textContent = gradeEmotions.join(', ');
            } else {
                display.textContent = 'בחרו רגשות מלמעלה...';
            }
        }

        // Backpack functions
        function addStrength() {
            const input = document.getElementById('strengthInput');
            const value = input.value.trim();
            
            if (value) {
                strengths.push(value);
                input.value = '';
                renderStrengths();
            }
        }

        function addChallenge() {
            const input = document.getElementById('challengeInput');
            const value = input.value.trim();
            
            if (value) {
                challenges.push(value);
                input.value = '';
                renderChallenges();
            }
        }

        function addHelp() {
            const input = document.getElementById('helpInput');
            const value = input.value.trim();
            
            if (value) {
                helpItems.push(value);
                input.value = '';
                renderHelp();
            }
        }

        function renderStrengths() {
            const list = document.getElementById('strengthsList');
            list.innerHTML = '';
            
            strengths.forEach((strength, index) => {
                const item = document.createElement('div');
                item.className = 'item';
                item.innerHTML = `
                    <span>⭐ ${strength}</span>
                    <button class="remove-button" onclick="removeStrength(${index})">×</button>
                `;
                list.appendChild(item);
            });
        }

        function renderChallenges() {
            const list = document.getElementById('challengesList');
            list.innerHTML = '';
            
            challenges.forEach((challenge, index) => {
                const item = document.createElement('div');
                item.className = 'item';
                item.innerHTML = `
                    <span>🎯 ${challenge}</span>
                    <button class="remove-button" onclick="removeChallenge(${index})">×</button>
                `;
                list.appendChild(item);
            });
        }

        function renderHelp() {
            const list = document.getElementById('helpsList');
            list.innerHTML = '';
            
            helpItems.forEach((help, index) => {
                const item = document.createElement('div');
                item.className = 'item';
                item.innerHTML = `
                    <span>🤝 ${help}</span>
                    <button class="remove-button" onclick="removeHelp(${index})">×</button>
                `;
                list.appendChild(item);
            });
        }

        function removeStrength(index) {
            strengths.splice(index, 1);
            renderStrengths();
        }

        function removeChallenge(index) {
            challenges.splice(index, 1);
            renderChallenges();
        }

        function removeHelp(index) {
            helpItems.splice(index, 1);
            renderHelp();
        }

        function updateBackpackSummary() {
            document.getElementById('summaryGradeEmotions').innerHTML = 
                gradeEmotions.length > 0 ? gradeEmotions.map(e => `• ${e}`).join('<br>') : 'טרם נבחרו רגשות';
            
            // Update thoughts summary
            let thoughtsHTML = '';
            if (savedThoughts.exciting) {
                thoughtsHTML += `<strong>🤔 מה מעניין אותי:</strong> ${savedThoughts.exciting}<br><br>`;
            }
            if (savedThoughts.worried) {
                thoughtsHTML += `<strong>😰 מה מדאיג אותי:</strong> ${savedThoughts.worried}<br><br>`;
            }
            if (savedThoughts.hopeful) {
                thoughtsHTML += `<strong>🌟 מה אני מצפה לו:</strong> ${savedThoughts.hopeful}<br><br>`;
            }
            
            document.getElementById('summaryThoughts').innerHTML = 
                thoughtsHTML || 'טרם נשמרו מחשבות';
            
            document.getElementById('summaryStrengths').innerHTML = 
                strengths.length > 0 ? strengths.map(s => `• ${s}`).join('<br>') : 'טרם נוספו חוזקות';
            
            document.getElementById('summaryChallenges').innerHTML = 
                challenges.length > 0 ? challenges.map(c => `• ${c}`).join('<br>') : 'טרם נוספו אתגרים';
            
            document.getElementById('summaryHelp').innerHTML = 
                helpItems.length > 0 ? helpItems.map(h => `• ${h}`).join('<br>') : 'טרם נוספו כלי עזרה';
        }

        // Save thoughts functionality
        function saveThoughts() {
            savedThoughts.exciting = document.getElementById('excitingThoughts').value.trim();
            savedThoughts.worried = document.getElementById('worriedThoughts').value.trim();
            savedThoughts.hopeful = document.getElementById('hopefulThoughts').value.trim();
            
            const savedDiv = document.getElementById('thoughtsSaved');
            if (savedThoughts.exciting || savedThoughts.worried || savedThoughts.hopeful) {
                savedDiv.style.display = 'block';
                setTimeout(() => {
                    savedDiv.scrollIntoView({ behavior: 'smooth' });
                }, 200);
            }
        }

        function saveAsPDF() {
            // Update backpack summary before creating PDF
            updateBackpackSummary();
            
            // Create a temporary div for PDF content
            const pdfContent = document.createElement('div');
            pdfContent.style.position = 'fixed';
            pdfContent.style.left = '-9999px';
            pdfContent.style.width = '800px';
            pdfContent.style.padding = '40px';
            pdfContent.style.backgroundColor = 'white';
            pdfContent.style.fontFamily = 'Heebo, sans-serif';
            pdfContent.style.direction = 'rtl';
            document.body.appendChild(pdfContent);
            
            // Build PDF content with proper styling
            const today = new Date().toLocaleDateString('he-IL');
            
            // Get all the data from the backpack
            const emotions = gradeEmotions.length > 0 ? gradeEmotions : [];
            const thoughts = {
                exciting: savedThoughts.exciting || '',
                worried: savedThoughts.worried || '',
                hopeful: savedThoughts.hopeful || ''
            };
            const strengthsList = strengths.length > 0 ? strengths : [];
            const challengesList = challenges.length > 0 ? challenges : [];
            const helpList = helpItems.length > 0 ? helpItems : [];
            const phrases = selectedPhrases.length > 0 ? selectedPhrases : [];
            
            pdfContent.innerHTML = `
                <div style="text-align: center; margin-bottom: 40px;">
                    <div style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 30px; border-radius: 15px; margin-bottom: 30px;">
                        <h1 style="font-size: 36px; margin: 0;">🎒 התרמיל הרגשי שלי</h1>
                        <p style="font-size: 18px; margin: 10px 0 0 0;">מתכוננים יחד לכיתה א'</p>
                    </div>
                    <p style="color: #666; font-size: 14px;">תאריך: ${today}</p>
                    <p style="color: #666; font-size: 12px; margin-top: 10px;">נעה כהן - מרפאה בעיסוק</p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <div style="background: linear-gradient(45deg, #ff6b6b, #ffa726); color: white; padding: 15px 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h2 style="margin: 0; font-size: 24px;">❤️ הרגשות שלי לגבי כיתה א'</h2>
                    </div>
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; border-right: 5px solid #ff6b6b;">
                        ${emotions.length > 0 
                            ? emotions.map(e => `<p style="margin: 10px 0; font-size: 16px;">• ${e}</p>`).join('')
                            : '<p style="color: #999; font-style: italic;">טרם נבחרו רגשות</p>'
                        }
                    </div>
                </div>

                ${thoughts.exciting || thoughts.worried || thoughts.hopeful ? `
                <div style="margin-bottom: 30px;">
                    <div style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 15px 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h2 style="margin: 0; font-size: 24px;">💭 המחשבות שלי</h2>
                    </div>
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; border-right: 5px solid #667eea;">
                        ${thoughts.exciting ? `
                            <div style="margin-bottom: 20px;">
                                <h4 style="color: #667eea; margin: 0 0 10px 0; font-size: 18px;">🤔 מה הכי מעניין אותי בכיתה א':</h4>
                                <p style="margin: 0; font-size: 16px; line-height: 1.5;">${thoughts.exciting}</p>
                            </div>
                        ` : ''}
                        ${thoughts.worried ? `
                            <div style="margin-bottom: 20px;">
                                <h4 style="color: #ff6b6b; margin: 0 0 10px 0; font-size: 18px;">😰 מה מדאיג אותי:</h4>
                                <p style="margin: 0; font-size: 16px; line-height: 1.5;">${thoughts.worried}</p>
                            </div>
                        ` : ''}
                        ${thoughts.hopeful ? `
                            <div style="margin-bottom: 0;">
                                <h4 style="color: #4CAF50; margin: 0 0 10px 0; font-size: 18px;">🌟 מה אני הכי מצפה לו:</h4>
                                <p style="margin: 0; font-size: 16px; line-height: 1.5;">${thoughts.hopeful}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}
                
                <div style="margin-bottom: 30px;">
                    <div style="background: linear-gradient(45deg, #ff6b6b, #ffa726); color: white; padding: 15px 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h2 style="margin: 0; font-size: 24px;">⭐ החוזקות שלי</h2>
                    </div>
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; border-right: 5px solid #ff6b6b;">
                        ${strengthsList.length > 0 
                            ? strengthsList.map(s => `<p style="margin: 10px 0; font-size: 16px;">• ${s}</p>`).join('')
                            : '<p style="color: #999; font-style: italic;">טרם נוספו חוזקות</p>'
                        }
                    </div>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <div style="background: linear-gradient(45deg, #ff6b6b, #ffa726); color: white; padding: 15px 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h2 style="margin: 0; font-size: 24px;">🎯 האתגרים שלי</h2>
                    </div>
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; border-right: 5px solid #ff6b6b;">
                        ${challengesList.length > 0 
                            ? challengesList.map(c => `<p style="margin: 10px 0; font-size: 16px;">• ${c}</p>`).join('')
                            : '<p style="color: #999; font-style: italic;">טרם נוספו אתגרים</p>'
                        }
                    </div>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <div style="background: linear-gradient(45deg, #ff6b6b, #ffa726); color: white; padding: 15px 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h2 style="margin: 0; font-size: 24px;">🤝 מה עוזר לי</h2>
                    </div>
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; border-right: 5px solid #ff6b6b;">
                        ${helpList.length > 0 
                            ? helpList.map(h => `<p style="margin: 10px 0; font-size: 16px;">• ${h}</p>`).join('')
                            : '<p style="color: #999; font-style: italic;">טרם נוספו כלי עזרה</p>'
                        }
                    </div>
                </div>

                ${phrases.length > 0 ? `
                <div style="margin-bottom: 30px;">
                    <div style="background: linear-gradient(45deg, #ab47bc, #9c27b0); color: white; padding: 15px 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h2 style="margin: 0; font-size: 24px;">✨ המשפטים הקסומים שלי</h2>
                    </div>
                    <div style="padding: 20px; background: #f3e5f5; border-radius: 10px; border-right: 5px solid #ab47bc;">
                        ${phrases.map(p => `<p style="margin: 10px 0; font-size: 16px;">• "${p}"</p>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                <div style="margin-bottom: 30px;">
                    <div style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 15px 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h2 style="margin: 0; font-size: 24px;">🎈 הכלי הסודי שלי</h2>
                    </div>
                    <div style="padding: 20px; background: #e3f2fd; border-radius: 10px; border-right: 5px solid #2196f3;">
                        <p style="margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">נשימת הבלון הקסומה - תמיד איתי!</p>
                        <p style="margin: 5px 0; font-size: 14px;">1. שימו יד על הבטן</p>
                        <p style="margin: 5px 0; font-size: 14px;">2. נשפו לאט דרך האף ותרגישו איך הבטן מתנפחת כמו בלון</p>
                        <p style="margin: 5px 0; font-size: 14px;">3. עצרו רגע</p>
                        <p style="margin: 5px 0; font-size: 14px;">4. נשפו לאט דרך הפה ותרגישו איך הבלון מתרוקן</p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 40px; padding: 20px; background: linear-gradient(45deg, #4CAF50, #45a049); color: white; border-radius: 10px;">
                    <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: bold;">🌟 אני מוכן/ה לכיתה א'! 🌟</p>
                    <p style="margin: 0; font-size: 14px;">עם התרמיל הרגשי שלי, אני יכול/ה להתמודד עם כל אתגר!</p>
                </div>
                
                <div style="text-align: center; margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 10px; border-top: 3px solid #667eea;">
                    <p style="margin: 0; font-size: 14px; color: #666;">נעה כהן - מרפאה בעיסוק</p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; color: #999;">כלי דיגיטלי להכנה לכיתה א'</p>
                </div>
            `;
            
            // Use html2canvas to convert the HTML to image, then to PDF
            html2canvas(pdfContent, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                width: 800,
                height: pdfContent.scrollHeight,
                scrollX: 0,
                scrollY: 0
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                
                // Calculate dimensions for continuous PDF
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                // Create PDF with custom height to fit all content
                const pdf = new window.jspdf.jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: [210, Math.max(297, imgHeight + 20)] // Ensure minimum A4 height or content height + margin
                });
                
                // Add the entire image as one continuous piece
                pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
                
                // Save the PDF with a descriptive name
                pdf.save(`התרמיל-הרגשי-${today.replace(/\//g, '-')}.pdf`);
                
                // Remove temporary element
                document.body.removeChild(pdfContent);
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(45deg, #4CAF50, #45a049);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    z-index: 10000;
                    font-family: Heebo, sans-serif;
                    font-size: 16px;
                    direction: rtl;
                `;
                successMsg.innerHTML = '✅ התרמיל הרגשי נשמר בהצלחה!';
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    if (document.body.contains(successMsg)) {
                        document.body.removeChild(successMsg);
                    }
                }, 3000);
                
            }).catch(error => {
                console.error('Error generating PDF:', error);
                alert('שגיאה ביצירת ה-PDF. אנא נסה שוב.');
                if (document.body.contains(pdfContent)) {
                    document.body.removeChild(pdfContent);
                }
            });
        }

