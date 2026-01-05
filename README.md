# 📚 SOP App Documentation Hub

## Welcome to Your SOP Management System!

This folder contains a complete **Standard Operating Procedures (SOPs) web application** designed for electrical field workers. The app provides interactive, step-by-step guidance through complex procedures with safety checklists, decision trees, and progress tracking.

---

## 🎯 Quick Start

### New Users (Start Here!)
1. Read [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - 5 min quick guide
2. Try [TUTORIAL.md](TUTORIAL.md) - Hands-on exercises
3. Keep [USER_GUIDE.md](USER_GUIDE.md) open while working

### Need to...
- **Modify text?** → See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) "Change Step Text"
- **Add a step?** → See [TUTORIAL.md](TUTORIAL.md) Exercise 2
- **Create new SOP?** → See [TUTORIAL.md](TUTORIAL.md) Exercise 5
- **Understand structure?** → See [VISUAL_GUIDE.md](VISUAL_GUIDE.md)
- **Look up syntax?** → See [USER_GUIDE.md](USER_GUIDE.md) Step Types section

---

## 📖 Documentation Files

| File | Purpose | When to Use |
|------|---------|-------------|
| **[USER_GUIDE.md](USER_GUIDE.md)** | Complete reference guide | Detailed explanations, all features |
| **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** | Fast lookup card | Quick syntax, common tasks |
| **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** | Architecture diagrams | Understanding structure, debugging |
| **[TUTORIAL.md](TUTORIAL.md)** | Hands-on exercises | Learning by doing |
| **[MODULARIZATION_GUIDE.md](MODULARIZATION_GUIDE.md)** | Breaking down sop.html | Making app easier to maintain |
| **README.md** (this file) | Documentation hub | Finding the right guide |

---

## 🏗️ App Structure Overview

```
Your SOP App
│
├── Frontend (User Interface)
│   └── sop.html ──────────► Single-page web application
│
├── Data (Content)
│   ├── general_sop_data.json
│   ├── dtr_data.json
│   ├── ht_line_data.json
│   ├── lt_service_data.json
│   └── [your custom SOPs].json
│
├── Templates (Downloads)
│   ├── generic_ptw.html
│   ├── cable_fault_ptw.html
│   └── [other forms/checklists]
│
└── Documentation (Guides)
    ├── USER_GUIDE.md
    ├── QUICK_REFERENCE.md
    ├── VISUAL_GUIDE.md
    ├── TUTORIAL.md
    └── README.md
```

---

## 🚀 Common Tasks - Quick Links

### 1. Modify Existing Content
**You want to:** Change question text, update steps, edit checklists

**Go to:** [QUICK_REFERENCE.md → Change Step Text](QUICK_REFERENCE.md#change-step-text)

**Example:**
```json
"step_key": {
  "content": "Your new question text here?"
}
```

---

### 2. Add New Steps
**You want to:** Insert new decision points, add verification steps

**Go to:** [TUTORIAL.md → Exercise 2](TUTORIAL.md#exercise-2-add-a-new-step)

**Key Points:**
- Create step in JSON with unique key
- Link with "goto" from another step
- Test thoroughly

---

### 3. Create New SOP
**You want to:** Build complete new procedure from scratch

**Go to:** [TUTORIAL.md → Exercise 5](TUTORIAL.md#exercise-5-create-a-complete-new-sop)

**Steps:**
1. Create new JSON file
2. Define meta and steps
3. Register in sop.html
4. Test all paths

---

### 4. Add Checklists
**You want to:** Enforce safety compliance, step verification

**Go to:** [TUTORIAL.md → Exercise 3](TUTORIAL.md#exercise-3-add-a-checklist)

**Example:**
```json
"checklist": [
  "Item 1 to verify",
  "Item 2 to verify",
  "Item 3 to verify"
]
```

---

### 5. Create Multi-Select
**You want to:** Allow selecting multiple problems/repairs

**Go to:** [TUTORIAL.md → Exercise 4](TUTORIAL.md#exercise-4-create-multi-select-step)

**Use Case:** Multiple simultaneous issues, repair plans

---

### 6. Understand Architecture
**You want to:** Know how everything connects, debug issues

**Go to:** [VISUAL_GUIDE.md](VISUAL_GUIDE.md)

**Includes:** Flowcharts, diagrams, file relationships

---

## 🎓 Learning Path

### Beginner (0-2 hours)
1. **Read:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md) (15 min)
2. **Do:** [TUTORIAL.md](TUTORIAL.md) Exercise 1 (15 min)
3. **Practice:** Modify 3 existing steps (30 min)
4. **Test:** Verify changes in browser (15 min)

**Goal:** Confidently edit existing content

---

### Intermediate (2-5 hours)
1. **Do:** [TUTORIAL.md](TUTORIAL.md) Exercise 2 & 3 (45 min)
2. **Read:** [USER_GUIDE.md](USER_GUIDE.md) Step Types section (30 min)
3. **Practice:** Add 5 new steps to existing SOP (1 hour)
4. **Study:** [VISUAL_GUIDE.md](VISUAL_GUIDE.md) (30 min)

**Goal:** Add and link new steps, use checklists

---

### Advanced (5+ hours)
1. **Do:** [TUTORIAL.md](TUTORIAL.md) Exercise 4 & 5 (2 hours)
2. **Read:** [USER_GUIDE.md](USER_GUIDE.md) completely (1 hour)
3. **Create:** Build 2 complete SOPs from scratch (3 hours)
4. **Master:** Complete challenge exercise (1 hour)

**Goal:** Create complex SOPs independently

---

## 🛠️ Tools & Resources

### Validation Tools
- **JSON Validator:** https://jsonlint.com - Check syntax
- **Browser Console:** Press F12 - See JavaScript errors
- **Flowchart:** Click "Show Flowchart" in app - Visualize logic

### File Editors
- **VS Code:** Best for JSON editing (syntax highlighting)
- **Notepad++:** Lightweight alternative
- **Any text editor:** That supports UTF-8 encoding

### Testing
- **Modern browser:** Chrome, Firefox, Edge, Safari
- **Mobile testing:** Test on actual devices
- **Console logs:** Watch for errors while testing

---

## 🐛 Troubleshooting

### Problem: Changes don't appear
**Solution:**
- Save file
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors

### Problem: JSON won't load
**Solution:**
- Validate at jsonlint.com
- Check for missing commas/brackets
- Verify UTF-8 encoding

### Problem: Step not found
**Solution:**
- Verify "goto" matches step key exactly
- Check spelling (case-sensitive)
- Ensure step exists in "steps" object

### Problem: SOP not showing
**Solution:**
- Check registered in sopCatalog
- Verify JSON filename matches
- Ensure JSON file in same folder

**More Help:** See [USER_GUIDE.md → Troubleshooting](USER_GUIDE.md#troubleshooting)

---

## 📋 File Reference

### Core Application
- **sop.html** (2593 lines)
  - Line ~1240: `sopCatalog` - Register SOPs here
  - Line ~1370: `downloadRegistry` - Register downloads here
  - Contains all UI/UX logic

### SOP Data Files
- **general_sop_data.json** - General electrical work
- **dtr_data.json** - DTR troubleshooting
- **ht_line_data.json** - 11kV line restoration
- **lt_service_data.json** - LT service faults
- **dtr_pm_data.json** - DTR preventive maintenance
- **ptr_buchholz_data.json** - PTR Buchholz alarms

### Template Files (HTML)
- Various PTW and form templates
- Used as downloadable resources
- Referenced in downloadRegistry

---

## ✅ Pre-Flight Checklist

Before deploying changes to production:

**Testing**
- [ ] All modified steps tested
- [ ] New SOPs tested end-to-end
- [ ] All paths through flowchart verified
- [ ] Mobile responsiveness checked
- [ ] No console errors

**Validation**
- [ ] All JSON files validated
- [ ] No broken "goto" links
- [ ] Result steps have no actions
- [ ] Checklist steps tested
- [ ] Multi-select steps work

**Documentation**
- [ ] Changes documented
- [ ] Team trained on updates
- [ ] Backup of old version saved
- [ ] User guide updated if needed

**Registration**
- [ ] New SOPs in sopCatalog
- [ ] Download files registered
- [ ] Tags and icons set
- [ ] Summary text written

---

## 🎯 Best Practices

### JSON Editing
✅ Use a proper code editor (VS Code)  
✅ Validate after every edit  
✅ Save with UTF-8 encoding  
✅ Use consistent indentation  
✅ Add comments in notes, not JSON

### Step Design
✅ One question per step  
✅ Clear, actionable language  
✅ 3-5 actions maximum  
✅ Descriptive step keys  
✅ Helper notes for clarity

### Testing
✅ Test after each change  
✅ Try all possible paths  
✅ Verify on mobile  
✅ Check flowchart  
✅ Get field user feedback

### Version Control
✅ Keep dated backups  
✅ Document changes  
✅ Test before deploying  
✅ Train users on updates  
✅ Monitor for issues

---

## 📞 Support & Resources

### Documentation Files
- All guides in this folder
- Example SOPs as templates
- Inline comments in code

### Self-Help
1. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
2. Search [USER_GUIDE.md](USER_GUIDE.md)
3. Look at existing SOPs for examples
4. Validate JSON syntax
5. Check browser console

### Learning Resources
- Practice with [TUTORIAL.md](TUTORIAL.md)
- Study [VISUAL_GUIDE.md](VISUAL_GUIDE.md) diagrams
- Copy patterns from working SOPs

---

## 🎉 You're All Set!

You now have:
- ✅ Complete SOP application
- ✅ Comprehensive documentation
- ✅ Hands-on tutorials
- ✅ Quick reference materials
- ✅ Visual guides

### Next Steps
1. Choose a documentation file based on your need
2. Follow the exercises in the tutorial
3. Start modifying or creating SOPs
4. Test thoroughly
5. Deploy and train users

---

## 📊 Documentation Map

**Need quick syntax?**  
→ [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

**Want to learn by doing?**  
→ [TUTORIAL.md](TUTORIAL.md)

**Need detailed explanation?**  
→ [USER_GUIDE.md](USER_GUIDE.md)

**Want to see architecture?**  
→ [VISUAL_GUIDE.md](VISUAL_GUIDE.md)

**Want to modularize the app?**  
→ [MODULARIZATION_GUIDE.md](MODULARIZATION_GUIDE.md)

**Looking for overview?**  
→ README.md (you are here!)

---

## 🔄 Quick Update Workflow

```
1. Backup current files
   ↓
2. Open relevant JSON file
   ↓
3. Make changes
   ↓
4. Validate JSON (jsonlint.com)
   ↓
5. Save file
   ↓
6. Refresh browser
   ↓
7. Test changes
   ↓
8. Verify flowchart
   ↓
9. ✅ Done!
```

---

## 📝 Version Information

**App Version:** 1.0  
**Documentation Created:** January 2026  
**Last Updated:** January 2026

**Compatibility:**
- Modern browsers (Chrome, Firefox, Edge, Safari)
- Mobile responsive
- No server required (runs locally)
- UTF-8 encoding required

---

## 🌟 Tips for Success

1. **Start small** - Edit existing content before creating new
2. **Test often** - Verify after every change
3. **Use examples** - Copy patterns from working SOPs
4. **Validate always** - Check JSON syntax before testing
5. **Document changes** - Keep notes on what you modified
6. **Get feedback** - Ask field users what works
7. **Iterate** - Continuously improve based on usage

---

**Happy SOP building! 🚀**

*For questions or issues, refer to the documentation files or check browser console for error messages.*

---

**Documentation Structure:**
```
📚 Documentation Hub (README.md) ← You are here
  ├── 🎓 Tutorial (TUTORIAL.md)
  └── 🔧 Modularization Guide (MODULARIZATION_GUIDEER_GUIDE.md)
  ├── 🚀 Quick Reference (QUICK_REFERENCE.md)
  ├── 📊 Visual Guide (VISUAL_GUIDE.md)
  └── 🎓 Tutorial (TUTORIAL.md)
```

Choose the guide that fits your current need and skill level!
