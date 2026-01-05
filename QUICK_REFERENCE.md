# 🚀 SOP App Quick Reference Card

## 📋 Common Tasks

### Change Step Text
**File:** `[sop_name]_data.json`
```json
"step_key": {
  "content": "New question text here"
}
```

### Add Button to Step
```json
"actions": [
  {
    "label": "Button text",
    "goto": "target_step_key",
    "style": "positive"  // positive/negative/neutral
  }
]
```

### Add Checklist
```json
"step_key": {
  "type": "interaction",
  "content": "Question",
  "checklist": [
    "Item 1",
    "Item 2",
    "Item 3"
  ],
  "actions": [...]
}
```

### Add Helper Note
```json
"note": "This appears in yellow box"
```

## 🆕 Add New SOP (3 Steps)

### 1️⃣ Create JSON File: `my_sop_data.json`
```json
{
  "meta": {
    "appTitle": "Title",
    "appSubtitle": "Subtitle",
    "startNode": "start"
  },
  "steps": {
    "start": {
      "type": "interaction",
      "content": "First question?",
      "actions": [
        {"label": "Yes", "goto": "result_ok", "style": "positive"}
      ]
    },
    "result_ok": {
      "type": "result",
      "status": "success",
      "title": "✅ Success",
      "content": "Done!"
    }
  }
}
```

### 2️⃣ Add to `sop.html` (line ~1240)
```javascript
const sopCatalog = [
  // ... existing SOPs
  {
    id: 'my_sop',
    title: 'My SOP Title',
    subtitle: 'Description',
    summary: 'What it covers',
    json: 'my_sop_data.json',
    tags: ['Tag1', 'Tag2'],
    icon: '🔧'
  }
];
```

### 3️⃣ Test
1. Save files
2. Refresh browser
3. Click new SOP card
4. Test all paths

## 🎨 Button Styles
```json
"style": "positive"   // ✅ Green (success)
"style": "negative"   // ❌ Red (error/danger)
"style": "neutral"    // 🔶 Orange (normal)
```

## 📝 Step Types

### Interaction (Question)
```json
{
  "type": "interaction",
  "content": "Question text",
  "actions": [...]
}
```

### Result (Terminal)
```json
{
  "type": "result",
  "status": "success",  // or "fail"
  "title": "Result Title",
  "content": "Description"
}
```

### Multi-Select
```json
{
  "type": "interaction",
  "content": "Select problems:",
  "multiSelect": {
    "enabled": true,
    "ctaLabel": "Fix All"
  },
  "actions": [
    {"label": "Problem 1", "goto": "fix1"},
    {"label": "Problem 2", "goto": "fix2"}
  ]
}
```

## 🔗 Linking Steps
```json
"step_a": {
  "actions": [
    {"goto": "step_b"}  // ← Points to next step
  ]
}
```
⚠️ **Important:** Every `"goto"` must match an existing step key!

## ⚠️ Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Step not found | Wrong `goto` key | Check spelling |
| JSON parse error | Syntax error | Validate at jsonlint.com |
| SOP not showing | Not in catalog | Add to `sopCatalog` |
| Buttons disabled | Unchecked items | Check all checklist items |

## 🛠️ Testing Checklist
- [ ] All steps reachable
- [ ] No broken `goto` links
- [ ] Flowchart generates
- [ ] Checklists work
- [ ] Result steps have no actions
- [ ] Mobile responsive

## 📂 File Structure
```
sop-main/
├── sop.html              # Main app (edit lines ~1240, ~1370)
├── *_data.json           # SOP data files
└── USER_GUIDE.md         # Full documentation
```

## 💡 Tips
- Use existing SOPs as templates
- Test after each change
- Keep backups
- Use descriptive step names
- Add notes for clarity

## 🔍 Find Things Fast

**To edit text:** Open `*_data.json` → find step → change `"content"`

**To add SOP:** Create JSON → Add to `sopCatalog` → Test

**To add step:** Add step object → Link with `"goto"` → Test

**To fix broken link:** Search for step key in JSON → Update `"goto"`

---

📖 **Need more details?** See `USER_GUIDE.md`

🐛 **Something broken?** Check browser console (F12)

✅ **Working?** Great! Make a backup!
