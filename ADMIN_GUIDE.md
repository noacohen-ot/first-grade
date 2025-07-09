# מדריך למנהל - הגדרת תצוגת הלשוניות

## כיצד להסתיר או להציג לשוניות

### שלב 1: פתח את קובץ ההגדרות
פתח את הקובץ `config.json` בעורך טקסט כלשהו (למשל Notepad, VS Code, או כל עורך אחר).

### שלב 2: ערוך את ההגדרות
הקובץ מכיל רשימה של כל הלשוניות. כל לשונית נראית כך:
```json
{ "id": "school", "name": "בית ספר", "icon": "🏫", "visible": true }
```

- כדי **להסתיר** לשונית: שנה את `"visible": true` ל-`"visible": false`
- כדי **להציג** לשונית: שנה את `"visible": false` ל-`"visible": true`

### שלב 3: שמור את השינויים
שמור את הקובץ `config.json`.

### שלב 4: רענן את הדף
המשתמשים יצטרכו לרענן את הדף (F5) כדי לראות את השינויים.

## דוגמה מלאה

### להסתיר את לשוניות "זיכרון" ו"מיומנויות חברתיות":
```json
{
  "tabSettings": [
    { "id": "school", "name": "בית ספר", "icon": "🏫", "visible": true },
    { "id": "memory", "name": "זיכרון", "icon": "🧠", "visible": false },
    { "id": "executive", "name": "תפקודים ניהוליים", "icon": "🎯", "visible": true },
    { "id": "emotions", "name": "ויסות רגשי", "icon": "💚", "visible": true },
    { "id": "social", "name": "מיומנויות חברתיות", "icon": "🤝", "visible": false },
    { "id": "backpack", "name": "התרמיל הרגשי", "icon": "🎒", "visible": true }
  ]
}
```

## רשימת הלשוניות

| ID | שם הלשונית | אייקון |
|---|---|---|
| school | בית ספר | 🏫 |
| memory | זיכרון | 🧠 |
| executive | תפקודים ניהוליים | 🎯 |
| emotions | ויסות רגשי | 💚 |
| social | מיומנויות חברתיות | 🤝 |
| backpack | התרמיל הרגשי | 🎒 |

## הערות חשובות

1. **תמיד וודא שהקובץ JSON תקין** - כל שגיאה בתחביר (פסיק חסר, מרכאות חסרות וכו') תגרום לכך שההגדרות לא ייטענו.
2. **לשונית "דף ראשי" תמיד מוצגת** - היא לא מופיעה ברשימת ההגדרות ולא ניתן להסתיר אותה.
3. **גיבוי** - מומלץ לשמור עותק גיבוי של הקובץ לפני ביצוע שינויים.

## בדיקת תקינות JSON

אם אינך בטוח שהקובץ JSON תקין, תוכל להשתמש באתר כמו [JSONLint](https://jsonlint.com/) כדי לבדוק את התקינות.

## פתרון בעיות

### הלשוניות לא משתנות?
1. וודא ששמרת את הקובץ `config.json`
2. רענן את הדף עם Ctrl+F5 (רענון מלא)
3. בדוק בקונסול של הדפדפן (F12) אם יש שגיאות

### כל הלשוניות נעלמו?
כנראה יש שגיאה בקובץ JSON. החזר את הקובץ למצב הקודם או השתמש בקובץ הגיבוי.