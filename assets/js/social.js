        // Social situations functionality
        const socialSituations = {
            sharing: {
                emoji: '🧸',
                title: 'שיתוף צעצועים',
                description: 'יותם משחק עם הרכבת שאני רוצה לשחק איתה. הוא משחק כבר הרבה זמן ואני ממש רוצה תור.',
                options: [
                    {
                        text: 'אומר "תן לי את זה עכשיו!"',
                        type: 'aggressive',
                        feedback: 'זה לא יעבוד טוב. יותם ירגיש רע ולא ירצה לשתף.'
                    },
                    {
                        text: 'מחכה בשקט ולא אומר כלום',
                        type: 'passive',
                        feedback: 'אפשר לחכות, אבל טוב גם להביע את הרצון שלנו.'
                    },
                    {
                        text: 'אומר "יותם, אפשר שנשחק יחד?"',
                        type: 'good',
                        feedback: 'מעולה! שיתוף זה כיף יותר ויותם יהיה מאושר לשחק יחד.'
                    },
                    {
                        text: 'אומר "יותם, כשתסיים, אפשר תור?"',
                        type: 'good',
                        feedback: 'נהדר! אתה מכבד את המשחק שלו ומבקש יפה.'
                    }
                ],
                lesson: 'שיתוף הוא כיף! כשאנחנו מבקשים יפה או מציעים לשחק יחד, כולם נהנים יותר.'
            },
            joining: {
                emoji: '👥',
                title: 'הצטרפות לקבוצה',
                description: 'רואה קבוצת ילדים משחקים במשחק שנראה מהנה. אני רוצה להצטרף אבל לא יודע איך.',
                options: [
                    {
                        text: 'נכנס בכוח למשחק בלי לשאול',
                        type: 'aggressive',
                        feedback: 'זה יפריע למשחק ויכעיס את הילדים.'
                    },
                    {
                        text: 'עומד מהצד ומסתכל בלי לעשות כלום',
                        type: 'passive',
                        feedback: 'הילדים לא יודעים שאתה רוצה להצטרף.'
                    },
                    {
                        text: 'שואל "אפשר להצטרף אליכם?"',
                        type: 'good',
                        feedback: 'מעולה! ברוב המקרים ילדים יהיו שמחים שתצטרף.'
                    },
                    {
                        text: 'אומר "איזה משחק כיף! איך משחקים?"',
                        type: 'good',
                        feedback: 'נהדר! אתה מראה עניין ומזמין את עצמך בצורה נחמדה.'
                    }
                ],
                lesson: 'להצטרף לקבוצה זה קל כשאנחנו שואלים יפה ומראים שאנחנו רוצים להיות חלק מהכיף!'
            },
            excluded: {
                emoji: '😔',
                title: 'הרגשה מחוץ לקבוצה',
                description: 'החברים אמרו שהם לא רוצים שאשחק איתם היום. אני מרגיש עצוב ובודד.',
                options: [
                    {
                        text: 'צועק עליהם ואומר דברים רעים',
                        type: 'aggressive',
                        feedback: 'זה יגרום להם להתרחק עוד יותר ולא יפתור את הבעיה.'
                    },
                    {
                        text: 'הולך לבכות בפינה',
                        type: 'passive',
                        feedback: 'זה בסדר להרגיש עצוב, אבל יש דרכים טובות יותר להתמודד.'
                    },
                    {
                        text: 'מוצא ילדים אחרים לשחק איתם',
                        type: 'good',
                        feedback: 'בחירה חכמה! יש הרבה ילדים נחמדים לשחק איתם.'
                    },
                    {
                        text: 'הולך למורה ומספר איך אני מרגיש',
                        type: 'good',
                        feedback: 'נכון! המורה יכולה לעזור ולתמוך בזמנים קשים.'
                    }
                ],
                lesson: 'לפעמים לא כולם רוצים לשחק, וזה בסדר. יש תמיד דרכים אחרות להנות ולמצוא חברים.'
            },
            conflict: {
                emoji: '😤',
                title: 'ויכוח עם חבר',
                description: 'רבתי עם החבר הכי טוב שלי על איזה משחק לשחק. עכשיו שנינו כועסים ולא מדברים.',
                options: [
                    {
                        text: 'אומר שהוא טיפש ולא אדבר איתו יותר',
                        type: 'aggressive',
                        feedback: 'זה רק יגרום לריב גדול יותר ותאבד חבר טוב.'
                    },
                    {
                        text: 'מתעלם ממנו ומתחיל לשחק לבד',
                        type: 'passive',
                        feedback: 'החברות שלכם חשובה מדי כדי לוותר עליה ככה.'
                    },
                    {
                        text: 'אומר "סליחה שצעקתי, בואו נמצא פתרון"',
                        type: 'good',
                        feedback: 'מעולה! חברים אמיתיים יודעים לבקש סליחה ולפתור ביחד.'
                    },
                    {
                        text: 'מציע "בואו נשחק במשהו שטוב לשנינו"',
                        type: 'good',
                        feedback: 'נהדר! פשרה היא דרך נהדרת לשמור על חברות.'
                    }
                ],
                lesson: 'ריבים קורים בין חברים, אבל חברות אמיתית חזקה יותר מכל ויכוח!'
            },
            helping: {
                emoji: '🤲',
                title: 'עזרה לחבר',
                description: 'רואה ילדה שיושבת לבד ונראית עצובה. נראה שאף אחד לא משחק איתה.',
                options: [
                    {
                        text: 'מתעלם ממנה - זה לא העניין שלי',
                        type: 'passive',
                        feedback: 'אנחנו יכולים לעשות הבדל בחיים של מישהו אחר.'
                    },
                    {
                        text: 'אומר לכולם שהיא מוזרה',
                        type: 'aggressive',
                        feedback: 'זה יגרום לה להרגיש עוד יותר רע ולא נחמד.'
                    },
                    {
                        text: 'ניגש אליה ושואל "איך אתה מרגישה?"',
                        type: 'good',
                        feedback: 'נהדר! לפעמים זה מה שאנשים הכי צריכים - מישהו שיקשיב.'
                    },
                    {
                        text: 'מזמין אותה לשחק איתי',
                        type: 'good',
                        feedback: 'מעולה! אתה יכול להיות החבר שהיא צריכה.'
                    }
                ],
                lesson: 'לעזור לאחרים זה אחד הדברים הכי יפים שאפשר לעשות. זה מרגיש טוב לכולם!'
            },
            teasing: {
                emoji: '😢',
                title: 'התגרות או לעג',
                description: 'ילד צוחק על הנעליים החדשות שלי ואומר שהן מוזרות. ילדים אחרים מתחילים לצחוק גם.',
                options: [
                    {
                        text: 'מתחיל לצעוק ולדחוף אותו',
                        type: 'aggressive',
                        feedback: 'זה יגרום למצב להסלים ותיכנס לצרות.'
                    },
                    {
                        text: 'מתחיל לבכות ובורח',
                        type: 'passive',
                        feedback: 'זה מובן שתרגיש רע, אבל יש דרכים טובות יותר להגיב.'
                    },
                    {
                        text: 'אומר בביטחון "לי הן מאוד מוצאות חן"',
                        type: 'good',
                        feedback: 'מעולה! ביטחון עצמי זה הכוח הכי גדול נגד לעג.'
                    },
                    {
                        text: 'הולך למורה ומספר מה קרה',
                        type: 'good',
                        feedback: 'נכון! המורה צריכה לדעת כשמישהו לא מתנהג יפה.'
                    }
                ],
                lesson: 'אף אחד לא זכאי לגרום לנו להרגיש רע. אנחנו מיוחדים בדיוק כמו שאנחנו!'
            }
        };

        function showSocialSituation(situationKey) {
            const situation = socialSituations[situationKey];
            const detailDiv = document.getElementById('socialSituationDetail');
            const optionsDiv = document.getElementById('situationOptions');
            
            // Update content
            document.getElementById('situationEmoji').textContent = situation.emoji;
            document.getElementById('situationTitle').textContent = situation.title;
            document.getElementById('situationDescription').textContent = situation.description;
            
            // Clear and create options
            optionsDiv.innerHTML = '';
            situation.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.style.cssText = `
                    background: white;
                    padding: 15px;
                    border-radius: 10px;
                    border: 2px solid #ddd;
                    cursor: pointer;
                    transition: all 0.3s ease;
                `;
                optionDiv.innerHTML = `<strong>${index + 1}.</strong> ${option.text}`;
                optionDiv.onclick = () => showSocialFeedback(situationKey, index);
                optionsDiv.appendChild(optionDiv);
            });
            
            // Show detail section
            detailDiv.style.display = 'block';
            detailDiv.scrollIntoView({ behavior: 'smooth' });
            
            // Hide feedback initially
            document.getElementById('socialFeedback').style.display = 'none';
        }

        function showSocialFeedback(situationKey, optionIndex) {
            const situation = socialSituations[situationKey];
            const option = situation.options[optionIndex];
            const feedbackDiv = document.getElementById('socialFeedback');
            const feedbackContent = document.getElementById('feedbackContent');
            
            // Color code the selected option
            const optionsDiv = document.getElementById('situationOptions');
            const optionDivs = optionsDiv.children;
            
            Array.from(optionDivs).forEach((div, index) => {
                if (index === optionIndex) {
                    if (option.type === 'good') {
                        div.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                        div.style.color = 'white';
                        div.style.borderColor = '#4CAF50';
                    } else if (option.type === 'aggressive') {
                        div.style.background = 'linear-gradient(45deg, #ff4757, #ff3742)';
                        div.style.color = 'white';
                        div.style.borderColor = '#ff4757';
                    } else {
                        div.style.background = 'linear-gradient(45deg, #ffa726, #ff9800)';
                        div.style.color = 'white';
                        div.style.borderColor = '#ffa726';
                    }
                } else {
                    div.style.background = '#f5f5f5';
                    div.style.color = '#666';
                    div.style.borderColor = '#ddd';
                }
                div.style.pointerEvents = 'none';
            });
            
            // Show feedback
            let feedbackHTML = `
                <div style="padding: 20px; border-radius: 10px; margin-bottom: 15px; ${
                    option.type === 'good' ? 'background: #e8f5e8; border-right: 5px solid #4CAF50;' :
                    option.type === 'aggressive' ? 'background: #ffebee; border-right: 5px solid #ff4757;' :
                    'background: #fff3e0; border-right: 5px solid #ffa726;'
                }">
                    <p style="margin: 0; font-size: 1.1rem;">${option.feedback}</p>
                </div>
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px;">
                    <p style="margin: 0; font-size: 1.1rem; font-weight: 500;">${situation.lesson}</p>
                </div>
            `;
            
            feedbackContent.innerHTML = feedbackHTML;
            feedbackDiv.style.background = option.type === 'good' ? '#e8f5e8' : 
                                         option.type === 'aggressive' ? '#ffebee' : '#fff3e0';
            feedbackDiv.style.display = 'block';
        }

        function hideSocialSituation() {
            document.getElementById('socialSituationDetail').style.display = 'none';
        }

        // Superpower quiz functionality
        let quizAnswers = {};
        let currentQuestion = 1;

        const superpowers = {
            creative: {
                emoji: '🎨',
                title: 'יוצר/ת הקסמים',
                description: 'יש לך דמיון מדהים ויכולת להמציא דברים חדשים ומיוחדים! אתה יודע לראות את העולם בצורה שונה ומעניינת.',
                schoolBenefit: 'בכיתה תוכל לעזור בפרויקטים יצירתיים, להציע רעיונות מקוריים ולהפוך את הלמידה למעניינת ומהנה לכולם.'
            },
            helper: {
                emoji: '🤗',
                title: 'גיבור/ת הלב',
                description: 'יש לך לב זהב ואכפת לך מאחרים! אתה תמיד מוכן לעזור ולדאוג שכולם ירגישו טוב.',
                schoolBenefit: 'בכיתה תהיה החבר שכולם אוהבים - תעזור לילדים חדשים להשתלב, תנחם מי שעצוב ותוודא שאף אחד לא נשאר לבד.'
            },
            leader: {
                emoji: '👑',
                title: 'מנהיג/ה טבעי',
                description: 'יש לך כוח להוביל ולארגן! אתה יודע איך לקחת אחריות ולעזור לקבוצה להצליח.',
                schoolBenefit: 'בכיתה תוכל לעזור למורה לארגן פעילויות, להוביל קבוצות עבודה ולוודא שכולם עובדים יחד בהרמוניה.'
            },
            peaceful: {
                emoji: '🕊️',
                title: 'שומר/ת השלום',
                description: 'יש לך כוח מיוחד לפתור קונפליקטים ולהביא שקט! אתה יודע איך לעזור לאנשים להבין אחד את השני.',
                schoolBenefit: 'בכיתה תהיה השופט הוגן - תעזור לפתור ויכוחים, לנחם מי שכועס ולשמור על אווירה טובה לכולם.'
            },
            cheerful: {
                emoji: '🌟',
                title: 'מקרין/ת השמחה',
                description: 'יש לך כוח להאיר את היום של כולם! אתה יודע איך לגרום לאנשים לחייך ולהרגיש טוב.',
                schoolBenefit: 'בכיתה תהיה מקור האנרגיה החיובית - תעזור לכולם להנות מהלמידה, תרים מצב רוח בימים קשים ותגרום לכיתה להיות מקום כיף.'
            }
        };

        function selectQuizAnswer(questionNum, answerType, element) {
            // Store the answer
            quizAnswers[questionNum] = answerType;
            
            // Visual feedback
            const options = element.parentElement.querySelectorAll('.quiz-option');
            options.forEach(opt => {
                opt.style.borderColor = 'transparent';
                opt.style.background = 'white';
            });
            
            element.style.borderColor = '#667eea';
            element.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            element.style.color = 'white';
            
            // Move to next question after delay
            setTimeout(() => {
                if (questionNum < 3) {
                    document.getElementById(`question${questionNum}`).style.display = 'none';
                    document.getElementById(`question${questionNum + 1}`).style.display = 'block';
                    currentQuestion++;
                } else {
                    // Calculate result
                    showSuperpowerResult();
                }
            }, 1000);
        }

        function showSuperpowerResult() {
            // Count answers
            const counts = {};
            Object.values(quizAnswers).forEach(answer => {
                counts[answer] = (counts[answer] || 0) + 1;
            });
            
            // Find the most common answer
            let maxCount = 0;
            let result = 'helper'; // default
            
            Object.keys(counts).forEach(type => {
                if (counts[type] > maxCount) {
                    maxCount = counts[type];
                    result = type;
                }
            });
            
            // Show result
            const resultDiv = document.getElementById('superpowerResult');
            const quizDiv = document.getElementById('superpowerQuiz');
            const superpower = superpowers[result];
            
            document.getElementById('superpowerEmoji').textContent = superpower.emoji;
            document.getElementById('superpowerTitle').textContent = superpower.title;
            document.getElementById('superpowerDescription').textContent = superpower.description;
            document.getElementById('superpowerSchoolBenefit').textContent = superpower.schoolBenefit;
            
            quizDiv.style.display = 'none';
            resultDiv.style.display = 'block';
            
            // Scroll to result
            setTimeout(() => {
                resultDiv.scrollIntoView({ behavior: 'smooth' });
            }, 200);
        }

        function resetSuperpowerQuiz() {
            quizAnswers = {};
            currentQuestion = 1;
            
            // Reset all questions
            for (let i = 1; i <= 3; i++) {
                const question = document.getElementById(`question${i}`);
                question.style.display = i === 1 ? 'block' : 'none';
                
                // Reset options
                const options = question.querySelectorAll('.quiz-option');
                options.forEach(opt => {
                    opt.style.borderColor = 'transparent';
                    opt.style.background = 'white';
                    opt.style.color = '#333';
                });
            }
            
            // Hide result and show quiz
            document.getElementById('superpowerResult').style.display = 'none';
            document.getElementById('superpowerQuiz').style.display = 'block';
        }

