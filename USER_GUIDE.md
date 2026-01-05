# 📘 SOP App User Guide
**Complete Guide to Managing Your Standard Operating Procedures**

---

## 📑 Table of Contents
1. [App Overview](#app-overview)
2. [Understanding the Architecture](#understanding-the-architecture)
3. [How to Modify Existing SOPs](#how-to-modify-existing-sops)
4. [How to Add/Modify Steps](#how-to-addmodify-steps)
5. [How to Add a New SOP](#how-to-add-a-new-sop)
6. [Step Types Explained](#step-types-explained)
7. [Quick Reference Examples](#quick-reference-examples)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 App Overview

Your SOP app is a **web-based interactive guide system** that helps electrical workers follow Standard Operating Procedures (SOPs) through a step-by-step flowchart interface.

**Key Features:**
- ✅ Interactive step-by-step guidance
- ✅ Checklists for safety compliance
- ✅ Multiple selection for complex scenarios
- ✅ Visual flowchart generation
- ✅ Progress tracking
- ✅ PDF downloads

**Files Structure:**
```
sop-main/
├── sop.html                          # Main app (UI & Logic)
├── general_sop_data.json             # General SOP data
├── dtr_data.json                     # DTR troubleshooting data
├── ht_line_data.json                 # HT line restoration data
├── lt_service_data.json              # LT service fault data
├── dtr_pm_data.json                  # DTR maintenance data
├── ptr_buchholz_data.json           # PTR Buchholz alarm data
├── [other data files...]
└── [template HTML files...]
```

---

## 🏗️ Understanding the Architecture

### 1. Main App (`sop.html`)
- Contains all UI/UX logic
- Loads JSON data files
- Renders interactive steps
- Handles user interactions

### 2. JSON Data Files
Each SOP has a separate JSON file with this structure:

```json
{
  "meta": {
    "appTitle": "Your SOP Title",
    "appSubtitle": "Short description",
    "startNode": "start"
  },
  "steps": {
    "step_key": { /* step definition */ }
  }
}
```

### 3. SOP Catalog (in `sop.html`)
Located around **line 1240-1300** in `sop.html`, this array defines all available SOPs:

```javascript
const sopCatalog = [
  {
    id: 'unique_id',
    title: 'Display Title',
    subtitle: 'Short subtitle',
    summary: 'Description',
    json: 'data_file.json',
    tags: ['Tag1', 'Tag2'],
    icon: '🔧'
  },
  // ... more SOPs
];
```

---

## ✏️ How to Modify Existing SOPs

### Step 1: Locate the Correct JSON File
Find the SOP you want to modify by checking the `sopCatalog` in `sop.html`:
- DTR troubleshooting → `dtr_data.json`
- HT Line → `ht_line_data.json`
- General SOP → `general_sop_data.json`

### Step 2: Edit the JSON File
Open the file and find the step you want to modify in the `"steps"` section.

**Example: Change question text**
```json
"start": {
  "type": "interaction",
  "content": "OLD TEXT HERE",  // ← Change this
  "note": "Helper text",
  "actions": [...]
}
```

**Change to:**
```json
"start": {
  "type": "interaction",
  "content": "NEW TEXT HERE",  // ← Updated
  "note": "Helper text",
  "actions": [...]
}
```

### Step 3: Test Your Changes
1. Save the JSON file
2. Refresh `sop.html` in your browser
3. Navigate to the modified step
4. Verify the changes appear correctly

---

## 🔧 How to Add/Modify Steps

### Adding a New Step

**1. Define the step in your JSON file:**

```json
"new_step_key": {
  "type": "interaction",
  "content": "What is the next action?",
  "note": "Helper information here",
  "checklist": [
    "First thing to verify",
    "Second thing to check"
  ],
  "actions": [
    {
      "label": "Option 1",
      "goto": "next_step_key",
      "style": "positive"
    },
    {
      "label": "Option 2", 
      "goto": "another_step",
      "style": "neutral"
    }
  ]
}
```

**2. Link to this step from another step:**

```json
"existing_step": {
  "type": "interaction",
  "content": "Previous question",
  "actions": [
    {
      "label": "Go to new step",
      "goto": "new_step_key",  // ← Points to your new step
      "style": "positive"
    }
  ]
}
```

### Modifying an Existing Step

**Change the question:**
```json
"step_key": {
  "content": "New question text here?"
}
```

**Add a checklist:**
```json
"step_key": {
  "type": "interaction",
  "content": "Question text",
  "checklist": [
    "Item 1 to verify",
    "Item 2 to verify",
    "Item 3 to verify"
  ],
  "actions": [...]
}
```

**Change action buttons:**
```json
"actions": [
  {
    "label": "New button text",
    "goto": "destination_step",
    "style": "positive"  // positive, negative, or neutral
  }
]
```

**Add helper notes:**
```json
"step_key": {
  "type": "interaction",
  "content": "Question",
  "note": "This will appear in a yellow box with helper text",
  "actions": [...]
}
```

---

## ➕ How to Add a New SOP

### Step 1: Create a New JSON Data File

Create a file like `my_new_sop_data.json`:

```json
{
  "meta": {
    "appTitle": "My New SOP Title",
    "appSubtitle": "Subtitle in Bangla or English",
    "startNode": "start"
  },
  "steps": {
    "start": {
      "type": "interaction",
      "content": "First question to ask user?",
      "note": "Optional helper information",
      "checklist": [
        "Safety item 1",
        "Safety item 2"
      ],
      "actions": [
        {
          "label": "Yes, ready",
          "goto": "next_step",
          "style": "positive"
        }
      ]
    },
    "next_step": {
      "type": "interaction",
      "content": "What is the issue?",
      "actions": [
        {
          "label": "Issue Type A",
          "goto": "result_success",
          "style": "positive"
        },
        {
          "label": "Issue Type B",
          "goto": "result_failure",
          "style": "negative"
        }
      ]
    },
    "result_success": {
      "type": "result",
      "status": "success",
      "title": "✅ Success!",
      "content": "Problem solved successfully."
    },
    "result_failure": {
      "type": "result",
      "status": "fail",
      "title": "❌ Failed",
      "content": "Could not resolve. Escalate to supervisor."
    }
  }
}
```

### Step 2: Register the New SOP in `sop.html`

Open `sop.html` and find the `sopCatalog` array (around **line 1240**).

Add your new SOP:

```javascript
const sopCatalog = [
  // ... existing SOPs ...
  {
    id: 'my_new_sop',                    // Unique ID
    title: 'My New SOP',                 // Display title
    isHighlighted: false,                 // Set to true to highlight
    subtitle: 'Short description',        // Subtitle
    summary: 'Detailed description of what this SOP covers.',
    json: 'my_new_sop_data.json',        // Your JSON file name
    tags: ['Custom', 'New'],             // Filter tags
    icon: '🔧'                            // Emoji icon
  }
];
```

### Step 3: (Optional) Add Download Files

If your SOP has associated PDF/HTML templates, add them to the downloads section:

Find the `downloadRegistry` object in `sop.html` (around **line 1370**) and add:

```javascript
const downloadRegistry = {
  // ... existing entries ...
  'my_new_sop': [
    {
      label: 'My Checklist Template',
      file: 'my_checklist.html',
      type: 'Checklist'
    },
    {
      label: 'My Report Form',
      file: 'my_report.html',
      type: 'Form'
    }
  ]
};
```

### Step 4: Test Your New SOP

1. Save both files (`sop.html` and `my_new_sop_data.json`)
2. Open `sop.html` in your browser
3. Look for your new SOP card on the main screen
4. Click it and test all the steps
5. Verify the flowchart generates correctly

---

## 📚 Step Types Explained

### 1. Interaction Step (Standard)
For asking questions with multiple choice answers.

```json
{
  "type": "interaction",
  "content": "What do you see? <br>Second line if needed",
  "note": "Optional yellow helper box",
  "actions": [
    {
      "label": "Option A",
      "goto": "next_step_a",
      "style": "positive"
    },
    {
      "label": "Option B",
      "goto": "next_step_b",
      "style": "negative"
    }
  ]
}
```

**Button Styles:**
- `"positive"` → Green button (good outcome)
- `"negative"` → Red button (problem/failure)
- `"neutral"` → Orange button (standard action)

### 2. Checklist Step
Forces user to check all items before proceeding.

```json
{
  "type": "interaction",
  "content": "Safety check required",
  "checklist": [
    "Helmet on",
    "Gloves on",
    "Tools ready"
  ],
  "actions": [
    {
      "label": "All checked, proceed",
      "goto": "next_step",
      "style": "positive"
    }
  ]
}
```

> **Note:** Buttons are disabled until ALL checkboxes are checked.

### 3. Multi-Select Step
Allows selecting multiple issues/problems to create a repair plan.

```json
{
  "type": "interaction",
  "content": "What problems do you see? (Select all that apply)",
  "multiSelect": {
    "enabled": true,
    "ctaLabel": "Fix Selected Problems",
    "planTitle": "Repair Plan",
    "planSubtitle": "Complete all selected repairs",
    "emptyState": "No problems selected"
  },
  "actions": [
    {
      "label": "Problem Type 1",
      "goto": "fix_problem_1",
      "style": "neutral"
    },
    {
      "label": "Problem Type 2",
      "goto": "fix_problem_2",
      "style": "neutral"
    },
    {
      "label": "No issues found",
      "goto": "charging",
      "style": "positive"
    }
  ]
}
```

### 4. Result Step (Terminal)
Final outcome - success or failure.

```json
{
  "type": "result",
  "status": "success",  // or "fail"
  "title": "✅ Task Completed Successfully!",
  "content": "Detailed explanation of the result.<br><strong>Next Action:</strong> Document the work."
}
```

**Status Values:**
- `"success"` → Green background
- `"fail"` → Red background

---

## 📖 Quick Reference Examples

### Example 1: Simple Two-Step SOP

```json
{
  "meta": {
    "appTitle": "Quick Safety Check",
    "appSubtitle": "Basic PPE verification",
    "startNode": "start"
  },
  "steps": {
    "start": {
      "type": "interaction",
      "content": "Do you have all required PPE?",
      "checklist": [
        "Helmet",
        "Gloves",
        "Safety shoes"
      ],
      "actions": [
        {
          "label": "Yes, all PPE worn",
          "goto": "result_safe",
          "style": "positive"
        }
      ]
    },
    "result_safe": {
      "type": "result",
      "status": "success",
      "title": "✅ Safe to Proceed",
      "content": "You may begin work."
    }
  }
}
```

### Example 2: Branching Decision Tree

```json
{
  "meta": {
    "appTitle": "Fault Diagnosis",
    "startNode": "start"
  },
  "steps": {
    "start": {
      "type": "interaction",
      "content": "What type of fault?",
      "actions": [
        {"label": "No voltage", "goto": "check_fuses", "style": "neutral"},
        {"label": "Low voltage", "goto": "check_connections", "style": "neutral"}
      ]
    },
    "check_fuses": {
      "type": "interaction",
      "content": "Are fuses blown?",
      "actions": [
        {"label": "Yes", "goto": "replace_fuses", "style": "negative"},
        {"label": "No", "goto": "escalate", "style": "neutral"}
      ]
    },
    "replace_fuses": {
      "type": "result",
      "status": "success",
      "title": "✅ Fixed",
      "content": "Replace blown fuses."
    },
    "check_connections": {
      "type": "result",
      "status": "success",
      "title": "Tighten Connections",
      "content": "Check and tighten all loose connections."
    },
    "escalate": {
      "type": "result",
      "status": "fail",
      "title": "❌ Escalate",
      "content": "Call senior technician."
    }
  }
}
```

### Example 3: Multi-Select Repair Plan

```json
{
  "steps": {
    "diagnose": {
      "type": "interaction",
      "content": "What repairs are needed?",
      "multiSelect": {
        "enabled": true,
        "ctaLabel": "Create Repair Plan",
        "planTitle": "Scheduled Repairs",
        "planSubtitle": "Complete all items"
      },
      "actions": [
        {"label": "Replace bushing", "goto": "repair_bushing", "style": "neutral"},
        {"label": "Fix oil leak", "goto": "repair_leak", "style": "neutral"},
        {"label": "Clean terminals", "goto": "clean_terminals", "style": "neutral"}
      ]
    },
    "repair_bushing": {
      "type": "interaction",
      "content": "Remove old bushing and install new one.",
      "actions": [
        {"label": "Done", "goto": "final_test", "style": "positive"}
      ]
    },
    "repair_leak": {
      "type": "interaction",
      "content": "Apply sealant to stop leak.",
      "actions": [
        {"label": "Done", "goto": "final_test", "style": "positive"}
      ]
    },
    "clean_terminals": {
      "type": "interaction",
      "content": "Clean and tighten all terminals.",
      "actions": [
        {"label": "Done", "goto": "final_test", "style": "positive"}
      ]
    },
    "final_test": {
      "type": "result",
      "status": "success",
      "title": "✅ All Repairs Complete",
      "content": "Equipment ready for service."
    }
  }
}
```

---

## 🐛 Troubleshooting

### Issue: SOP doesn't appear on main screen

**Solution:**
1. Check that you added it to `sopCatalog` in `sop.html`
2. Verify the `json` field points to the correct filename
3. Make sure the JSON file is in the same folder as `sop.html`

### Issue: "Step not found" error

**Solution:**
1. Check that all `"goto"` values match actual step keys
2. Verify step keys are spelled correctly (case-sensitive)
3. Make sure `"startNode"` in meta matches your first step key

### Issue: Buttons stay disabled

**Solution:**
- If using checklist, all items must be checked
- Verify `"checklist"` array is properly formatted
- Check browser console (F12) for JavaScript errors

### Issue: Flowchart doesn't generate

**Solution:**
1. Verify all steps have valid `"goto"` targets
2. Check for circular references
3. Make sure result steps don't have `"actions"` arrays
4. Refresh page and try again

### Issue: JSON file won't load

**Solution:**
1. Validate JSON syntax at [jsonlint.com](https://jsonlint.com)
2. Check for missing commas, brackets, or quotes
3. Ensure file encoding is UTF-8
4. Check browser console for specific error messages

### Issue: Unicode/Bangla text not displaying

**Solution:**
1. Save JSON file with UTF-8 encoding
2. Verify `<meta charset="UTF-8">` is in `sop.html`
3. Don't escape Unicode characters in JSON

---

## 🎓 Best Practices

### 1. Step Naming Convention
Use descriptive, consistent keys:
```
✅ Good: "check_voltage", "replace_fuse", "result_success"
❌ Bad: "step1", "s2", "thing"
```

### 2. Always Test Thoroughly
- Test all possible paths through your SOP
- Verify checklists work correctly
- Generate flowchart to visualize logic
- Test on mobile devices

### 3. Keep Steps Simple
- One question per step
- Clear, concise language
- Limit to 3-5 actions per step
- Use notes for additional context

### 4. Use Consistent Language
- Stick to Bangla OR English (or mix consistently)
- Use same terminology throughout
- Match field language and jargon

### 5. Version Control
- Keep backup copies before making changes
- Document what you changed
- Test before deploying to field workers

---

## 📞 Quick Help

**Want to:**
- **Change text?** → Edit `"content"` in JSON
- **Add a step?** → Add new key in `"steps"`, link with `"goto"`
- **Add checklist?** → Add `"checklist"` array to step
- **Change button color?** → Modify `"style"` in action
- **Add new SOP?** → Create JSON file + add to `sopCatalog`
- **Fix broken link?** → Check `"goto"` matches step key

---

## 📄 File Locations Summary

| What | Where | Purpose |
|------|-------|---------|
| Main app | `sop.html` | All UI and logic |
| SOP catalog | `sop.html` line ~1240 | List of all SOPs |
| Download registry | `sop.html` line ~1370 | Associated files |
| SOP data | `*.json` files | Step-by-step content |
| Templates | `*_template.html` | PTW/form templates |

---

## ✅ Checklist for Adding New SOP

- [ ] Create JSON data file with `.json` extension
- [ ] Define `meta` section with title and startNode
- [ ] Create all steps with unique keys
- [ ] Link steps with correct `goto` values
- [ ] Add terminal result steps
- [ ] Register in `sopCatalog` in sop.html
- [ ] Choose appropriate icon and tags
- [ ] (Optional) Add download files to registry
- [ ] Test all paths through the SOP
- [ ] Verify flowchart generates correctly
- [ ] Test on mobile and desktop
- [ ] Deploy and train users

---

**🎉 You're now ready to manage your SOP app!**

For additional help, refer to existing JSON files as templates and examples.

---

*Last Updated: January 2026*
*Version: 1.0*
