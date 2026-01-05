# 📊 SOP App Visual Architecture Guide

## 🏗️ How Everything Connects

```
┌─────────────────────────────────────────────────────────────┐
│                        sop.html                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  sopCatalog Array (Line ~1240)                     │     │
│  │  ┌──────────────────────────────────────────┐     │     │
│  │  │ {                                         │     │     │
│  │  │   id: 'dtr',                             │     │     │
│  │  │   title: 'DTR Troubleshooting',         │     │     │
│  │  │   json: 'dtr_data.json',  ───────────┐  │     │     │
│  │  │   tags: ['DTR', 'Breakdown']          │  │     │     │
│  │  │ }                                      │  │     │     │
│  │  └──────────────────────────────────────┼──┘     │     │
│  └───────────────────────────────────────────┼────────┘     │
└────────────────────────────────────────────┼──────────────┘
                                              │
                                              │ Loads
                                              ▼
                          ┌────────────────────────────────┐
                          │    dtr_data.json               │
                          │                                │
                          │  {                             │
                          │    "meta": {                   │
                          │      "appTitle": "...",        │
                          │      "startNode": "start"      │
                          │    },                          │
                          │    "steps": {                  │
                          │      "start": {...},           │
                          │      "check_fuses": {...}      │
                          │    }                           │
                          │  }                             │
                          └────────────────────────────────┘
```

---

## 🔄 Step Flow Example

```
                    START
                      │
                      ▼
        ┌─────────────────────────┐
        │  "start"                │
        │  Type: interaction      │
        │  Question: "PPE ready?" │
        └─────────────────────────┘
                      │
         ┌────────────┴──────────────┐
         │                           │
    YES  ▼                      NO   ▼
┌─────────────────┐        ┌─────────────────┐
│ "check_visual"  │        │ "result_stop"   │
│ Type: interact  │        │ Type: result    │
│ Question: ...   │        │ Status: fail    │
└─────────────────┘        └─────────────────┘
         │                          │
         ▼                          │
┌─────────────────┐                │
│ "megger_test"   │                │
└─────────────────┘                │
         │                          │
         ▼                          ▼
┌─────────────────┐          [END - FAIL]
│ "result_ok"     │
│ Type: result    │
│ Status: success │
└─────────────────┘
         │
         ▼
   [END - SUCCESS]
```

---

## 📦 Step Anatomy

```
┌────────────────────────────────────────────────┐
│  Step Key: "check_voltage"                     │
├────────────────────────────────────────────────┤
│  {                                             │
│    "type": "interaction", ◄────── Step type    │
│    "content": "Check voltage?" ◄── Question    │
│    "note": "Use multimeter", ◄─── Helper       │
│    "checklist": [ ◄──────────────── Optional   │
│      "Tool ready",                             │
│      "Safety gear on"                          │
│    ],                                          │
│    "actions": [ ◄────────────────── Buttons    │
│      {                                         │
│        "label": "230V OK", ◄───── Button text  │
│        "goto": "next_step", ◄──── Links to key │
│        "style": "positive" ◄───── Color        │
│      },                                        │
│      {                                         │
│        "label": "No voltage",                  │
│        "goto": "diagnose",                     │
│        "style": "negative"                     │
│      }                                         │
│    ]                                           │
│  }                                             │
└────────────────────────────────────────────────┘
```

---

## 🎯 Action Styles Visual

```
┌─────────────────────────────────────────┐
│  "style": "positive"                    │
│  ┌───────────────────────────────────┐  │
│  │  ✅ Proceed  (Green Button)       │  │
│  └───────────────────────────────────┘  │
│  Use for: Success, safe, continue      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  "style": "negative"                    │
│  ┌───────────────────────────────────┐  │
│  │  ❌ Danger  (Red Button)          │  │
│  └───────────────────────────────────┘  │
│  Use for: Errors, failures, danger     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  "style": "neutral"                     │
│  ┌───────────────────────────────────┐  │
│  │  🔶 Continue  (Orange Button)     │  │
│  └───────────────────────────────────┘  │
│  Use for: Normal actions, choices      │
└─────────────────────────────────────────┘
```

---

## 🔀 Multi-Select Flow

```
         User sees multiple problems
                   │
                   ▼
    ┌──────────────────────────────┐
    │ Multi-Select Step            │
    │ Select 1 or more problems:   │
    │ ☑ Problem A                  │
    │ ☑ Problem B                  │
    │ ☐ Problem C                  │
    └──────────────────────────────┘
                   │
                   │ Click "Fix Selected"
                   ▼
    ┌──────────────────────────────┐
    │ Repair Plan Created:         │
    │ 1. Fix Problem A ────┐       │
    │ 2. Fix Problem B ────┤       │
    └──────────────────────┴───────┘
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
    ┌─────────┐      ┌─────────┐
    │ Fix A   │      │ Fix B   │
    │ Step    │      │ Step    │
    └─────────┘      └─────────┘
          │                 │
          └────────┬────────┘
                   │
                   ▼
          ┌────────────────┐
          │ Final Result   │
          └────────────────┘
```

---

## 📋 Checklist Step Behavior

```
┌────────────────────────────────────┐
│ Safety Check                       │
├────────────────────────────────────┤
│ ☐ Helmet on                        │
│ ☐ Gloves on                        │
│ ☐ Tools ready                      │
├────────────────────────────────────┤
│ [Continue] (DISABLED - gray)       │ ◄── Button disabled
└────────────────────────────────────┘

        User checks all boxes ✓
                │
                ▼

┌────────────────────────────────────┐
│ Safety Check                       │
├────────────────────────────────────┤
│ ☑ Helmet on                        │
│ ☑ Gloves on                        │
│ ☑ Tools ready                      │
├────────────────────────────────────┤
│ [Continue] (ENABLED - green)       │ ◄── Button enabled
└────────────────────────────────────┘
```

---

## 🎨 Result Step Visual

```
┌────────────────────────────────────────┐
│           SUCCESS RESULT               │
│  ┌──────────────────────────────────┐  │
│  │ Status: "success"                │  │
│  │ Background: 🟢 Light Green       │  │
│  │                                  │  │
│  │ ✅ Task Completed!               │  │
│  │                                  │  │
│  │ Work finished successfully.      │  │
│  │ Document your actions.           │  │
│  │                                  │  │
│  │ [Return to Hub]                  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│            FAIL RESULT                 │
│  ┌──────────────────────────────────┐  │
│  │ Status: "fail"                   │  │
│  │ Background: 🔴 Light Red         │  │
│  │                                  │  │
│  │ ❌ Equipment Defective           │  │
│  │                                  │  │
│  │ Cannot be repaired on site.      │  │
│  │ Call supervisor for replacement. │  │
│  │                                  │  │
│  │ [Return to Hub]                  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

---

## 🗂️ Complete SOP Structure

```
{
  "meta": {  ◄──────────────────────── Metadata section
    "appTitle": "...",  ◄────────── Title displayed in app
    "appSubtitle": "...",  ◄──────── Subtitle
    "startNode": "start"  ◄──────── First step key
  },
  
  "steps": {  ◄─────────────────────── All steps
  
    "start": {  ◄───────────────────── Step key (unique ID)
      "type": "interaction",
      "content": "Question?",
      "note": "Helper text",
      "checklist": [...],  ◄──────── Optional
      "actions": [  ◄───────────────── Buttons
        {
          "label": "Option",
          "goto": "next_key",  ◄──── Links to another step
          "style": "positive"
        }
      ]
    },
    
    "next_key": {  ◄────────────────── Another step
      "type": "interaction",
      "content": "...",
      "actions": [...]
    },
    
    "result_success": {  ◄──────────── Terminal step
      "type": "result",
      "status": "success",
      "title": "Success!",
      "content": "Description"
    }
  }
}
```

---

## 🔗 Step Linking Map

```
Valid Links:
✅ interaction → interaction
✅ interaction → result
❌ result → anything (results are terminal)

Example Valid Flow:
"step_a" ──→ "step_b" ──→ "step_c" ──→ "result_ok"
              └──→ "step_d" ──→ "result_fail"
```

---

## 📝 Adding New SOP Flowchart

```
1. CREATE JSON FILE
   my_sop_data.json
        │
        ▼
2. DEFINE STRUCTURE
   {
     "meta": {...},
     "steps": {...}
   }
        │
        ▼
3. ADD TO CATALOG
   Edit sop.html
   Find sopCatalog (~line 1240)
   Add new entry
        │
        ▼
4. TEST
   Open sop.html
   Click SOP card
   Test all paths
        │
        ▼
5. VERIFY FLOWCHART
   Click "Show Flowchart"
   Check all connections
        │
        ▼
   ✅ DONE!
```

---

## 🎯 Common Pattern Templates

### Linear Flow (A→B→C)
```json
{
  "steps": {
    "step_1": {
      "actions": [{"goto": "step_2"}]
    },
    "step_2": {
      "actions": [{"goto": "step_3"}]
    },
    "step_3": {
      "actions": [{"goto": "result"}]
    },
    "result": {
      "type": "result"
    }
  }
}
```

### Branching (A→B or C)
```json
{
  "steps": {
    "check": {
      "actions": [
        {"label": "Yes", "goto": "path_b"},
        {"label": "No", "goto": "path_c"}
      ]
    },
    "path_b": {...},
    "path_c": {...}
  }
}
```

### Loop Back Pattern
```json
{
  "steps": {
    "test": {
      "actions": [
        {"label": "Pass", "goto": "result_ok"},
        {"label": "Fail, retry", "goto": "prepare"}
      ]
    },
    "prepare": {
      "actions": [{"goto": "test"}]  ◄── Loops back
    }
  }
}
```

---

## 🎨 User Interface Elements

```
┌─────────────────────────────────────────────────┐
│ 🔝 HEADER                                       │
│ Distribution Field SOP Hub                      │
│ [All SOPs] [Show Flowchart] [Alerts: Off]      │
├─────────────────────────────────────────────────┤
│ 📊 FILTER & DOWNLOADS                           │
│ ▾ Filter & Downloads ──────────────────── ⌄    │
├─────────────────────────────────────────────────┤
│ 📍 PROGRESS INDICATOR                           │
│ ━━━━━━━━━━━━ 65% ━━━━━━━━━━━━━               │
│ Step 3 of 5                                     │
├─────────────────────────────────────────────────┤
│ 📄 CONTENT AREA                                 │
│                                                 │
│   What is the issue?                           │
│                                                 │
│   ⚠️ Helper note box                           │
│                                                 │
│   [Option A ✅]                                 │
│   [Option B ❌]                                 │
│   [Option C 🔶]                                 │
│                                                 │
└─────────────────────────────────────────────────┘
                                        [Trail ◀] ◄── Side panel
```

---

## 💾 File Organization

```
sop-main/
│
├── 📄 sop.html ──────────────────► Main application
│   ├── Line ~1240: sopCatalog ──► Register SOPs here
│   ├── Line ~1370: downloads ───► Register templates
│   └── All UI/UX logic
│
├── 📊 Data Files (JSON)
│   ├── general_sop_data.json ───► General electrical
│   ├── dtr_data.json ───────────► DTR troubleshooting
│   ├── ht_line_data.json ───────► HT line restoration
│   ├── lt_service_data.json ────► LT service faults
│   └── [your_new_sop].json ─────► Your custom SOPs
│
├── 📋 Templates (HTML)
│   ├── generic_ptw.html
│   ├── cable_fault_ptw.html
│   └── [other templates]
│
└── 📖 Documentation
    ├── USER_GUIDE.md ───────────► Full guide (you are here)
    ├── QUICK_REFERENCE.md ──────► Quick lookup
    └── VISUAL_GUIDE.md ─────────► This file
```

---

## 🔍 Debugging Flowchart

```
Problem: Step not appearing in flowchart

Check:
1. Is step key in "steps" object? ────┐
                                      │
2. Does another step link to it? ─────┤
   (has "goto": "this_step")          │
                                      │
3. Is it reachable from "startNode"? ─┤
                                      │
4. Check browser console (F12) ───────┘
   for errors
```

---

## ✅ Validation Checklist

```
Before deploying:

SOP Structure:
☐ Valid JSON syntax
☐ "meta" section present
☐ "startNode" matches actual step
☐ All steps have unique keys

Step Integrity:
☐ All "goto" links valid
☐ No orphaned steps
☐ Result steps don't have actions
☐ All actions have "goto"

User Experience:
☐ Clear question text
☐ Appropriate button styles
☐ Helper notes where needed
☐ Checklists work correctly

Testing:
☐ All paths tested
☐ Flowchart generates
☐ Mobile responsive
☐ Progress tracking works
```

---

📖 **For detailed examples, see USER_GUIDE.md**

🚀 **For quick tasks, see QUICK_REFERENCE.md**
