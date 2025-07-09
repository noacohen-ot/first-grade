
// Default tab settings (in case config file fails to load)
const defaultTabs = [
    { id: 'school', name: 'בית ספר', icon: '🏫', visible: true },
    { id: 'memory', name: 'זיכרון', icon: '🧠', visible: true },
    { id: 'executive', name: 'תפקודים ניהוליים', icon: '🎯', visible: true },
    { id: 'emotions', name: 'ויסות רגשי', icon: '💚', visible: true },
    { id: 'social', name: 'מיומנויות חברתיות', icon: '🤝', visible: true },
    { id: 'backpack', name: 'התרמיל הרגשי', icon: '🎒', visible: true }
];

// Apply tab visibility settings from server-side config
document.addEventListener('DOMContentLoaded', function() {
    // Load settings from config.json file
    fetch('config.json')
        .then(response => response.json())
        .then(data => {
            const tabSettings = data.tabSettings || defaultTabs;
            
            tabSettings.forEach(tab => {
                const tabElement = document.querySelector(`.main-tab[onclick*="${tab.id}"]`);
                if (tabElement) {
                    tabElement.style.display = tab.visible ? 'block' : 'none';
                }
            });
        })
        .catch(error => {
            console.error('Error loading config:', error);
            // Fallback to default settings if config.json can't be loaded
            defaultTabs.forEach(tab => {
                const tabElement = document.querySelector(`.main-tab[onclick*="${tab.id}"]`);
                if (tabElement) {
                    tabElement.style.display = tab.visible ? 'block' : 'none';
                }
            });
        });
});