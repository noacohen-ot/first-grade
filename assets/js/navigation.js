
// Default tab settings (in case none are saved)
const defaultTabs = [
    { id: 'school', name: 'בית ספר', icon: '🏫', visible: true },
    { id: 'memory', name: 'זיכרון', icon: '🧠', visible: true },
    { id: 'executive', name: 'תפקודים ניהוליים', icon: '🎯', visible: true },
    { id: 'emotions', name: 'ויסות רגשי', icon: '💚', visible: true },
    { id: 'social', name: 'מיומנויות חברתיות', icon: '🤝', visible: true },
    { id: 'backpack', name: 'התרמיל הרגשי', icon: '🎒', visible: true }
];

// Apply tab visibility settings
document.addEventListener('DOMContentLoaded', function() {
    const tabSettings = JSON.parse(localStorage.getItem('tabSettings')) || defaultTabs;
    
    tabSettings.forEach(tab => {
        const tabElement = document.querySelector(`.main-tab[onclick*="${tab.id}"]`);
        if (tabElement) {
            tabElement.style.display = tab.visible ? 'block' : 'none';
        }
    });
});