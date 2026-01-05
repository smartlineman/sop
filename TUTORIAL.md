# 🎓 SOP App - Hands-On Tutorial

**Learn by doing! Follow these step-by-step exercises.**

---

## 📚 Tutorial Index
1. [Exercise 1: Modify Existing Text](#exercise-1-modify-existing-text)
2. [Exercise 2: Add a New Step](#exercise-2-add-a-new-step)
3. [Exercise 3: Add a Checklist](#exercise-3-add-a-checklist)
4. [Exercise 4: Create Multi-Select Step](#exercise-4-create-multi-select-step)
5. [Exercise 5: Create a Complete New SOP](#exercise-5-create-a-complete-new-sop)
6. [Challenge: Advanced SOP](#challenge-advanced-sop)

---

## Exercise 1: Modify Existing Text
**Goal:** Change the question text in an existing step  
**Time:** 5 minutes  
**Difficulty:** ⭐ Beginner

### What You'll Do
Change the first question in the General SOP.

### Steps

**1. Open the file:**
```
Open: general_sop_data.json
```

**2. Find this code (around line 6):**
```json
"start": {
  "type": "interaction",
  "content": "যেকোনো ইলেক্ট্রিক্যাল কাজ শুরু করার আগে নিজের সুরক্ষা নিশ্চিত করো। <br>ব্যক্তিগত সুরক্ষা সরঞ্জাম (PPE) নিয়েছ?",
```

**3. Change to:**
```json
"start": {
  "type": "interaction",
  "content": "Safety first! Do you have your Personal Protective Equipment (PPE)? <br>Check all items before starting work.",
```

**4. Save and test:**
- Save the file
- Open `sop.html` in browser
- Click "General SOP"
- See your new text!

### ✅ Success Criteria
- The new question text appears
- The checklist still shows
- Buttons still work

---

## Exercise 2: Add a New Step
**Goal:** Add a voltage check step  
**Time:** 10 minutes  
**Difficulty:** ⭐⭐ Intermediate

### What You'll Do
Add a new step between existing steps in the DTR SOP.

### Steps

**1. Open the file:**
```
Open: dtr_data.json
```

**2. Find the "final_charging" step (around line 140)**

**3. Add this NEW step before it:**
```json
"voltage_check": {
  "type": "interaction",
  "content": "Measure LT voltage with multimeter. What reading do you get?",
  "note": "Each phase should read 230V ±10%. Neutral to earth should be near zero.",
  "actions": [
    {
      "label": "230V ±10% (Good)",
      "goto": "final_charging",
      "style": "positive"
    },
    {
      "label": "Very low or zero",
      "goto": "result_defective_hv_earth",
      "style": "negative"
    }
  ]
}
```

**4. Link to this step:**

Find the "repair_oil" step and change its action from:
```json
"actions": [
  { "label": "তেল ভরা শেষ।", "goto": "final_charging", "style": "positive" }
]
```

To:
```json
"actions": [
  { "label": "তেল ভরা শেষ।", "goto": "voltage_check", "style": "positive" }
]
```

**5. Save and test:**
- Save the file
- Refresh browser
- Go through DTR SOP
- Your new voltage check step should appear!

### ✅ Success Criteria
- New step appears in sequence
- Both buttons work correctly
- Flowchart shows new step

### 💡 What You Learned
- How to add steps to existing flow
- How to link steps with "goto"
- How to test new additions

---

## Exercise 3: Add a Checklist
**Goal:** Add a safety checklist to an existing step  
**Time:** 10 minutes  
**Difficulty:** ⭐⭐ Intermediate

### What You'll Do
Add a checklist to the HT Line SOP start step.

### Steps

**1. Open the file:**
```
Open: ht_line_data.json
```

**2. Find the "start" step (line ~6)**

**3. Currently it looks like this:**
```json
"start": {
  "type": "interaction",
  "content": "কন্ট্রোল রুম জানালো: 11kV ফিডার ট্রিপ। PPE পরে রওনা দিয়েছ তো?",
  "note": "হেলমেট, আর্ক গ্লাভস, ভোল্টেজ টেস্টার, ডিসচার্জ রড সাথে নাও।",
  "checklist": [
    "হেলমেট, ফেস শিল্ড, আর্ক গ্লাভস",
    "স্টিল-টু বুট ও ফ্যাল-অ্যারেস্টার",
    "আইসোলেশন পারমিট কপি সাথে আছে"
  ],
  "actions": [...]
}
```

**4. Add more items to the checklist:**
```json
"start": {
  "type": "interaction",
  "content": "কন্ট্রোল রুম জানালো: 11kV ফিডার ট্রিপ। PPE পরে রওনা দিয়েছ তো?",
  "note": "হেলমেট, আর্ক গ্লাভস, ভোল্টেজ টেস্টার, ডিসচার্জ রড সাথে নাও।",
  "checklist": [
    "হেলমেট, ফেস শিল্ড, আর্ক গ্লাভস",
    "স্টিল-টু বুট ও ফ্যাল-অ্যারেস্টার",
    "আইসোলেশন পারমিট কপি সাথে আছে",
    "ভোল্টেজ টেস্টার চার্জড আছে",
    "ডিসচার্জ রড এবং আর্থিং সেট আছে",
    "মোবাইলে কন্ট্রোল রুম নাম্বার সেভড",
    "ফার্স্ট এইড বক্স গাড়িতে আছে"
  ],
  "actions": [...]
}
```

**5. Save and test:**
- Save the file
- Refresh browser
- Click "১১কেভি লাইন রিস্টোরেশন"
- Try checking items
- Notice: Button stays disabled until ALL are checked!

### ✅ Success Criteria
- All 7 checklist items appear
- Button is disabled initially
- Button enables when all checked
- Can uncheck and button disables again

### 💡 What You Learned
- How checklists enforce compliance
- Arrays in JSON (comma-separated items)
- User can't skip safety checks

---

## Exercise 4: Create Multi-Select Step
**Goal:** Create a step where users can select multiple problems  
**Time:** 15 minutes  
**Difficulty:** ⭐⭐⭐ Advanced

### What You'll Do
Create a new troubleshooting step with multiple issues.

### Steps

**1. Open the file:**
```
Open: lt_service_data.json
```

**2. Add this new step (add it anywhere in the "steps" section):**
```json
"meter_issues": {
  "type": "interaction",
  "content": "What meter problems do you observe? (Select all that apply)",
  "note": "Multiple issues can occur simultaneously. Select all visible problems.",
  "multiSelect": {
    "enabled": true,
    "ctaLabel": "Create Repair Plan",
    "planTitle": "Meter Repair Plan",
    "planSubtitle": "Fix all selected issues before re-energizing",
    "emptyState": "No issues selected yet"
  },
  "actions": [
    {
      "label": "Display not working",
      "goto": "fix_display",
      "style": "neutral"
    },
    {
      "label": "Loose terminals",
      "goto": "fix_terminals",
      "style": "neutral"
    },
    {
      "label": "Meter body cracked",
      "goto": "replace_meter",
      "style": "neutral"
    },
    {
      "label": "Cover seal broken",
      "goto": "fix_seal",
      "style": "neutral"
    }
  ]
}
```

**3. Add the repair steps:**
```json
"fix_display": {
  "type": "interaction",
  "content": "Check display connections and power supply.",
  "note": "If display still doesn't work, meter replacement needed.",
  "actions": [
    {
      "label": "Display fixed",
      "goto": "final_test_meter",
      "style": "positive"
    }
  ]
},
"fix_terminals": {
  "type": "interaction",
  "content": "Clean and tighten all terminal connections.",
  "note": "Use torque wrench to manufacturer specification.",
  "actions": [
    {
      "label": "Terminals secured",
      "goto": "final_test_meter",
      "style": "positive"
    }
  ]
},
"replace_meter": {
  "type": "interaction",
  "content": "Remove defective meter and install new one.",
  "note": "Document meter serial numbers in logbook.",
  "actions": [
    {
      "label": "New meter installed",
      "goto": "final_test_meter",
      "style": "positive"
    }
  ]
},
"fix_seal": {
  "type": "interaction",
  "content": "Apply new tamper-proof seal to meter cover.",
  "note": "Record new seal number in register.",
  "actions": [
    {
      "label": "Seal applied",
      "goto": "final_test_meter",
      "style": "positive"
    }
  ]
},
"final_test_meter": {
  "type": "result",
  "status": "success",
  "title": "✅ Meter Repairs Complete",
  "content": "All selected issues have been resolved. Meter is ready for service. <br><strong>Next:</strong> Update consumer records."
}
```

**4. Link to this step from an existing step:**

Find the "walk_the_line" step and add this action:
```json
{
  "label": "Meter problems found",
  "goto": "meter_issues",
  "style": "neutral"
}
```

**5. Save and test:**
- Save the file
- Refresh browser
- Navigate to the new step
- Select multiple problems
- Click "Create Repair Plan"
- See the plan with all repairs!

### ✅ Success Criteria
- Can select multiple options
- Button shows count (e.g., "Create Repair Plan (3)")
- Repair plan shows all selected items
- Each repair step appears correctly
- All paths lead to final result

### 💡 What You Learned
- Multi-select configuration
- How repair plans work
- Complex branching logic
- Multiple paths converging to one result

---

## Exercise 5: Create a Complete New SOP
**Goal:** Build a full SOP from scratch  
**Time:** 30 minutes  
**Difficulty:** ⭐⭐⭐ Advanced

### What You'll Build
A "Cable Joint Repair" SOP with:
- Safety checklist
- Branching decisions
- Multiple outcomes

### Steps

**1. Create new file:**
```
File: cable_joint_repair_data.json
```

**2. Copy this complete SOP:**
```json
{
  "meta": {
    "appTitle": "Cable Joint Repair SOP",
    "appSubtitle": "Underground Cable Fault Guide",
    "startNode": "start"
  },
  "steps": {
    "start": {
      "type": "interaction",
      "content": "Cable joint failure reported. Are you prepared for underground work?",
      "note": "Underground cable work requires special safety considerations.",
      "checklist": [
        "PPE complete (helmet, gloves, boots)",
        "Cable fault locator available",
        "Joint repair kit ready",
        "Megger 5kV available",
        "Work permit obtained"
      ],
      "actions": [
        {
          "label": "Yes, ready to proceed",
          "goto": "locate_fault",
          "style": "positive"
        }
      ]
    },
    
    "locate_fault": {
      "type": "interaction",
      "content": "Use cable locator to find fault point. Mark the location.",
      "note": "Typical depth is 0.5m to 1m. Use probe carefully.",
      "actions": [
        {
          "label": "Fault located and marked",
          "goto": "excavate",
          "style": "positive"
        }
      ]
    },
    
    "excavate": {
      "type": "interaction",
      "content": "Excavate carefully to expose the faulty cable section.",
      "note": "Check for other utilities before digging. Stop if you see gas/water pipes.",
      "actions": [
        {
          "label": "Cable exposed safely",
          "goto": "inspect_damage",
          "style": "positive"
        },
        {
          "label": "Hit other utility line!",
          "goto": "result_escalate",
          "style": "negative"
        }
      ]
    },
    
    "inspect_damage": {
      "type": "interaction",
      "content": "Inspect the cable damage. What type of fault do you see?",
      "actions": [
        {
          "label": "Joint failure/separation",
          "goto": "joint_repair",
          "style": "neutral"
        },
        {
          "label": "Cable insulation damaged",
          "goto": "cable_splice",
          "style": "neutral"
        },
        {
          "label": "Complete cable burnout",
          "goto": "result_replace_cable",
          "style": "negative"
        }
      ]
    },
    
    "joint_repair": {
      "type": "interaction",
      "content": "Repair or replace the faulty joint.",
      "note": "Clean cable ends thoroughly. Use heat shrink tubing properly.",
      "checklist": [
        "Cable ends cleaned and prepared",
        "Lugs crimped properly",
        "Heat shrink applied correctly",
        "Joint taped and sealed"
      ],
      "actions": [
        {
          "label": "Joint repaired",
          "goto": "megger_test",
          "style": "positive"
        }
      ]
    },
    
    "cable_splice": {
      "type": "interaction",
      "content": "Cut out damaged section and splice new cable piece.",
      "note": "Splice must be at least 30cm from existing joints.",
      "checklist": [
        "Damaged section cut out",
        "New cable section prepared",
        "Both ends jointed properly",
        "Joints waterproofed"
      ],
      "actions": [
        {
          "label": "Splice completed",
          "goto": "megger_test",
          "style": "positive"
        }
      ]
    },
    
    "megger_test": {
      "type": "interaction",
      "content": "Perform insulation resistance test with 5kV megger.",
      "note": "Acceptable IR value: > 100 MΩ for LT cable.",
      "actions": [
        {
          "label": "IR > 100 MΩ (Pass)",
          "goto": "backfill",
          "style": "positive"
        },
        {
          "label": "IR < 100 MΩ (Fail)",
          "goto": "result_repair_failed",
          "style": "negative"
        }
      ]
    },
    
    "backfill": {
      "type": "interaction",
      "content": "Backfill the excavation and compact properly.",
      "note": "Use sand bedding around cable. Compact in layers.",
      "actions": [
        {
          "label": "Backfilling complete",
          "goto": "energize",
          "style": "positive"
        }
      ]
    },
    
    "energize": {
      "type": "interaction",
      "content": "Re-energize the cable and verify supply restored.",
      "note": "Check voltage at far end before declaring complete.",
      "actions": [
        {
          "label": "Supply restored, voltage OK",
          "goto": "result_success",
          "style": "positive"
        },
        {
          "label": "No voltage at far end",
          "goto": "result_repair_failed",
          "style": "negative"
        }
      ]
    },
    
    "result_success": {
      "type": "result",
      "status": "success",
      "title": "✅ Cable Repair Successful!",
      "content": "Cable joint repaired and tested successfully. Supply restored to consumers.<br><strong>Next Actions:</strong><br>1. Document repair in logbook<br>2. Update cable route map<br>3. Submit work completion report"
    },
    
    "result_repair_failed": {
      "type": "result",
      "status": "fail",
      "title": "❌ Repair Failed - Further Investigation Needed",
      "content": "The repair did not pass testing. Possible issues:<br>• Moisture in joint<br>• Hidden damage in cable<br>• Poor crimping<br><strong>Action:</strong> Re-do the repair or replace cable section."
    },
    
    "result_replace_cable": {
      "type": "result",
      "status": "fail",
      "title": "❌ Cable Replacement Required",
      "content": "Cable damage is too severe for repair. Complete cable section must be replaced.<br><strong>Action:</strong> Order new cable and schedule replacement work."
    },
    
    "result_escalate": {
      "type": "result",
      "status": "fail",
      "title": "⚠️ Work Stopped - Utility Conflict",
      "content": "Other utility line encountered during excavation. Work must stop immediately.<br><strong>Action:</strong> Contact utility company and revise work plan."
    }
  }
}
```

**3. Register in sop.html:**

Open `sop.html`, find `sopCatalog` (line ~1240), add:

```javascript
{
  id: 'cable_joint_repair',
  title: 'Cable Joint Repair',
  subtitle: 'Underground Cable Fault Guide',
  summary: 'Complete procedure for locating, repairing, testing, and restoring underground cable joints.',
  json: 'cable_joint_repair_data.json',
  tags: ['Cable', 'Underground', 'Repair'],
  icon: '🔌'
}
```

**4. Save and test:**
- Save both files
- Refresh browser
- Find your new SOP card
- Click and test all paths
- View the flowchart!

### ✅ Success Criteria
- SOP appears on main screen
- All 4 result outcomes reachable
- Checklists work correctly
- Flowchart generates properly
- All paths tested

### 🎉 Congratulations!
You've created a complete, professional SOP from scratch!

### 💡 What You Learned
- Complete SOP structure
- Multiple decision points
- Various result outcomes
- Checklist integration
- Registration process
- End-to-end testing

---

## Challenge: Advanced SOP
**Goal:** Create a complex SOP with all features  
**Time:** 45+ minutes  
**Difficulty:** ⭐⭐⭐⭐ Expert

### Requirements
Create a "Transformer Oil Sampling & Analysis" SOP that includes:

1. **Safety checklist** (at start)
2. **Multi-select step** for visible issues
3. **Branching logic** based on test results
4. **Multiple result outcomes** (pass/fail/escalate)
5. **At least 8 steps** total
6. **Proper linking** throughout

### Structure Suggestion
```
start (safety checklist)
  ↓
visual_inspection (multi-select problems)
  ↓
oil_sampling (how to collect sample)
  ↓
lab_tests (what tests to perform)
  ↓
analyze_results (branch based on results)
  ├→ result_oil_good (success)
  ├→ result_oil_fair (action needed)
  └→ result_oil_bad (transformer failure)
```

### Hints
- Use the Cable Joint Repair SOP as a template
- Check dtr_data.json for multi-select examples
- Test each step as you build it
- Draw the flowchart on paper first

### Validation
- [ ] All 8+ steps created
- [ ] Safety checklist at start
- [ ] Multi-select step included
- [ ] 3 different results
- [ ] All paths tested
- [ ] Flowchart correct
- [ ] Registered in catalog

---

## 🎯 Practice Tips

### Start Small
- Modify existing text first
- Then add single steps
- Finally create full SOPs

### Test Frequently
- Save after every change
- Refresh browser immediately
- Test each modification

### Use Templates
- Copy existing SOPs as starting points
- Modify rather than writing from scratch
- Learn patterns from examples

### Common Mistakes to Avoid
❌ Forgetting comma after JSON objects  
❌ Misspelling "goto" target keys  
❌ Adding actions to result steps  
❌ Not registering in sopCatalog  
❌ Forgetting to save files

### Debug Checklist
When something doesn't work:
1. Check browser console (F12)
2. Validate JSON at jsonlint.com
3. Verify all "goto" links exist
4. Check file names match exactly
5. Refresh browser (hard refresh: Ctrl+F5)

---

## 📖 Next Steps

### After Completing Tutorials
1. Review the full USER_GUIDE.md
2. Study existing SOPs in depth
3. Create SOPs for your specific needs
4. Share with team for feedback
5. Iterate and improve

### Real-World Application
- Convert paper procedures to digital SOPs
- Gather feedback from field workers
- Update based on actual usage
- Add more helpful notes and checklists
- Expand with additional SOPs

---

## 🎓 Certification Quiz

Test your knowledge! Can you answer these?

1. What are the 3 button styles?
2. How do you make buttons wait for checklist completion?
3. What's the difference between "interaction" and "result"?
4. Where do you register new SOPs?
5. What does "goto" do?
6. Can result steps have actions?
7. How do you create multi-select steps?
8. What file extension for SOP data?

**Answers:**
1. positive, negative, neutral
2. Add "checklist" array to step
3. interaction = question with choices, result = terminal outcome
4. sopCatalog array in sop.html
5. Links to next step by key
6. No, results are terminal
7. Add multiSelect object with enabled: true
8. .json

---

**🎉 You've completed the hands-on tutorial!**

You now know how to:
- ✅ Modify existing SOPs
- ✅ Add new steps
- ✅ Create checklists
- ✅ Build multi-select steps
- ✅ Create complete SOPs from scratch

**Keep practicing and building great SOPs!** 🚀

---

*Need help? Refer to:*
- 📘 USER_GUIDE.md - Complete documentation
- 🚀 QUICK_REFERENCE.md - Fast lookup
- 📊 VISUAL_GUIDE.md - Diagrams and architecture
