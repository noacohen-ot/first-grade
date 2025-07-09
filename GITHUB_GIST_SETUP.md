# הגדרת GitHub Gist לשמירת הגדרות

## שלב 1: יצירת Gist
1. היכנס ל-GitHub שלך
2. לך ל: https://gist.github.com
3. צור Gist חדש עם השם `first-grade-config.json`
4. הדבק את התוכן הבא:
```json
{
  "tabSettings": [
    { "id": "school", "name": "בית ספר", "icon": "🏫", "visible": true },
    { "id": "memory", "name": "זיכרון", "icon": "🧠", "visible": true },
    { "id": "executive", "name": "תפקודים ניהוליים", "icon": "🎯", "visible": true },
    { "id": "emotions", "name": "ויסות רגשי", "icon": "💚", "visible": true },
    { "id": "social", "name": "מיומנויות חברתיות", "icon": "🤝", "visible": true },
    { "id": "backpack", "name": "התרמיל הרגשי", "icon": "🎒", "visible": true }
  ]
}
```
5. שמור כ-**Public Gist**

## שלב 2: קבלת כתובת ה-Gist
1. לאחר יצירת ה-Gist, העתק את ה-ID שלו מהכתובת
   - לדוגמה: `https://gist.github.com/YOUR_USERNAME/GIST_ID`
2. הכתובת לקריאת התוכן תהיה:
   - `https://gist.githubusercontent.com/YOUR_USERNAME/GIST_ID/raw/first-grade-config.json`

## שלב 3: עדכון הקוד
עדכן את `navigation.js` לקרוא מה-Gist במקום מהקובץ המקומי.

## שלב 4: עדכון הגדרות
1. כדי לעדכן הגדרות, ערוך את ה-Gist ב-GitHub
2. השינויים ייכנסו לתוקף מיד (או תוך דקה-שתיים)
3. המשתמשים יראו את השינויים ברענון הדף

## יתרונות
- עובד עם GitHub Pages
- חינמי לחלוטין
- קל לעדכון
- לא דורש שרת

## חסרונות
- ה-Gist צריך להיות ציבורי (אבל זה בסדר כי אין מידע רגיש)
- עדכון ידני דרך GitHub