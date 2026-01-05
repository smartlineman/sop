# 🔧 SOP App Modularization Guide

## Breaking Down `sop.html` for Easy Maintenance

**Current Problem:** Your `sop.html` is 2593 lines - everything in one file!  
**Solution:** Split into modular components for easier updates.

---

## 📊 Current Structure (Monolithic)

```
sop.html (2593 lines)
├── HTML structure
├── CSS styles (~800 lines)
├── JavaScript logic (~1500 lines)
│   ├── Configuration (sopCatalog, downloadRegistry)
│   ├── App initialization
│   ├── Rendering functions
│   ├── Interaction handlers
│   ├── Flowchart generation
│   └── Utility functions
└── External libraries (loaded via CDN)
```

---

## 🎯 Proposed Modular Structure

```
sop-main/
├── index.html                    # Main HTML (minimal)
├── css/
│   ├── styles.css               # All styles
│   └── themes.css               # Optional: color themes
├── js/
│   ├── config.js                # SOP catalog & downloads
│   ├── app.js                   # Core application logic
│   ├── ui-renderer.js           # UI rendering functions
│   ├── flowchart.js             # Flowchart generation
│   └── utils.js                 # Helper functions
├── data/                        # JSON data files
│   ├── general_sop_data.json
│   ├── dtr_data.json
│   └── ...
├── templates/                   # HTML templates
└── docs/                        # Documentation
```

---

## ✅ Benefits of Modularization

### 1. **Easier Maintenance**
- Find code quickly (know which file to edit)
- Smaller files are easier to understand
- Reduce merge conflicts in team environments

### 2. **Easier Updates**
- Add new SOPs: Just edit `config.js`
- Fix bugs: Know exactly which file to modify
- Update styles: Only touch CSS files

### 3. **Better Organization**
- Logical separation of concerns
- Reusable components
- Clear file structure

### 4. **Faster Development**
- Parallel work on different files
- Test individual modules
- Cache static files separately

---

## 🚀 Step-by-Step Refactoring

### Phase 1: Extract CSS (10 minutes)

**1. Create `css/styles.css`:**

Extract all CSS from `sop.html` (lines ~11-832) into this file.

**2. Update `sop.html`:**

Replace the `<style>` section with:
```html
<link rel="stylesheet" href="css/styles.css">
```

**3. Test:**
- Refresh browser
- Verify styles still work

---

### Phase 2: Extract Configuration (15 minutes)

**1. Create `js/config.js`:**

```javascript
// SOP Catalog Configuration
const sopCatalog = [
  {
    id: 'general_sop',
    title: 'General SOP',
    isHighlighted: true,
    subtitle: 'সার্বজনীন ইলেক্ট্রিক্যাল ওয়ার্ক গাইড',
    summary: 'PPE, PTW, Isolation, Discharge এবং Restoration-এর সার্বজনীন ধাপসমূহ।',
    json: 'data/general_sop_data.json',
    tags: ['General', 'Safety', 'PTW'],
    icon: '🛡️'
  },
  {
    id: 'dtr',
    title: 'ডিটিআর ব্রেকডাউন ও টিট-বিট রিপেয়ার',
    subtitle: 'লাইনম্যানের ডিজিটাল গাইড',
    summary: 'ট্রান্সফরমার ফল্ট ডায়াগনোসিস, মেগার টেস্ট এবং সাইটে টিট-বিট রিকভারি।',
    json: 'data/dtr_data.json',
    tags: ['DTR', 'Breakdown'],
    icon: '⚡'
  }
  // ... add all your SOPs here
];

// Download Registry Configuration
const downloadRegistry = {
  'general_sop': [
    {
      label: 'Generic PTW Template',
      file: 'templates/generic_ptw.html',
      type: 'PTW'
    }
  ],
  'dtr': [
    {
      label: 'DTR Repair Checklist',
      file: 'templates/dtr_repair_checklist.html',
      type: 'Checklist'
    }
  ]
  // ... add all downloads here
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sopCatalog, downloadRegistry };
}
```

**2. Move JSON files to `data/` folder:**
```bash
mkdir data
mv *.json data/
```

**3. Update paths in config.js:**
Change `json: 'dtr_data.json'` to `json: 'data/dtr_data.json'`

**4. Load in HTML:**
```html
<script src="js/config.js"></script>
```

---

### Phase 3: Extract Core Logic (20 minutes)

**1. Create `js/app.js`:**

Move main application functions:
```javascript
// Global state
let steps = {};
let currentStepKey = null;
let activeSop = null;
let stepHistory = [];
// ... all state variables

// Initialization
function initApp() {
  // ... init code
}

// SOP loading
async function loadJsonSop(id) {
  // ... loading logic
}

// Step navigation
function goToStep(key, userResponse = '') {
  // ... navigation logic
}

function handleAction(targetKey, responseLabel) {
  // ... action handling
}

// Call init when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
```

**2. Create `js/ui-renderer.js`:**

Move UI rendering functions:
```javascript
// Render SOP selection screen
function renderSopSelection() {
  // ... rendering logic
}

// Render interaction steps
function renderInteractionStep(data, key) {
  // ... rendering logic
}

// Render result steps
function renderResultStep(data) {
  // ... rendering logic
}

// Render multi-select steps
function renderMultiSelectStep(data, key) {
  // ... rendering logic
}

// Progress tracking
function updateProgressIndicator() {
  // ... progress logic
}
```

**3. Create `js/flowchart.js`:**

Move flowchart functions:
```javascript
// Flowchart generation
function generateMermaidGraph(stepsData) {
  // ... mermaid graph logic
}

// Show flowchart modal
function showFlowchart() {
  // ... modal logic
}

// Close flowchart
function closeFlowchart() {
  // ... close logic
}

// Download flowchart PDF
function downloadFlowchartPDF() {
  // ... PDF generation logic
}
```

**4. Create `js/utils.js`:**

Move utility functions:
```javascript
// Text utilities
function stripHtml(text) {
  return String(text).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncateText(text, limit = 80) {
  if (!text) return '';
  const normalized = String(text);
  return normalized.length > limit ? normalized.substring(0, limit).trim() + '…' : normalized;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[char] || char);
}

function escapeAttribute(text) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(text).replace(/[&<>"']/g, char => entities[char] || char);
}
```

**5. Load all scripts in order:**
```html
<!-- External libraries -->
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<!-- Your modules (order matters!) -->
<script src="js/config.js"></script>
<script src="js/utils.js"></script>
<script src="js/flowchart.js"></script>
<script src="js/ui-renderer.js"></script>
<script src="js/app.js"></script>
```

---

## 📝 File-by-File Breakdown

### `index.html` (~200 lines)
**Contains:**
- HTML structure only
- External library links
- Module script tags

**Does NOT contain:**
- CSS (moved to styles.css)
- JavaScript logic (moved to .js files)

---

### `css/styles.css` (~800 lines)
**Contains:**
- All CSS rules
- Animations
- Responsive styles
- Theme variables

**Sections:**
```css
/* Variables */
:root { ... }

/* Layout */
body, .container, .header { ... }

/* Components */
.sop-card, .options-grid, .checklist { ... }

/* Modals */
.modal, .flowchart-modal { ... }

/* Utilities */
.fade-in, .hidden { ... }
```

---

### `js/config.js` (~150 lines)
**Contains:**
- `sopCatalog` array
- `downloadRegistry` object
- Tags and categories
- File paths

**To add new SOP:**
```javascript
sopCatalog.push({
  id: 'new_sop',
  title: 'New SOP Title',
  json: 'data/new_sop_data.json',
  tags: ['Tag1', 'Tag2'],
  icon: '🔧'
});
```

---

### `js/app.js` (~500 lines)
**Contains:**
- Application state
- Initialization
- SOP loading
- Step navigation
- Event handlers

**Main functions:**
- `initApp()`
- `loadJsonSop(id)`
- `goToStep(key)`
- `handleAction(targetKey, responseLabel)`

---

### `js/ui-renderer.js` (~400 lines)
**Contains:**
- All rendering functions
- DOM manipulation
- UI updates
- Progress tracking

**Main functions:**
- `renderSopSelection()`
- `renderInteractionStep()`
- `renderResultStep()`
- `renderMultiSelectStep()`

---

### `js/flowchart.js` (~300 lines)
**Contains:**
- Mermaid graph generation
- Flowchart modal
- PDF export
- Graph styling

**Main functions:**
- `generateMermaidGraph()`
- `showFlowchart()`
- `downloadFlowchartPDF()`

---

### `js/utils.js` (~100 lines)
**Contains:**
- Text processing
- HTML escaping
- Validation helpers
- Common utilities

**Main functions:**
- `stripHtml()`
- `truncateText()`
- `escapeHtml()`
- `escapeAttribute()`

---

## 🎯 Quick Wins - Simplified Updates

### Adding a New SOP (2-Minute Process)

**Before (Monolithic):**
1. Open 2593-line sop.html
2. Find sopCatalog (line ~1240)
3. Navigate through huge file
4. Edit and save

**After (Modular):**
1. Open `js/config.js` (150 lines)
2. Add to sopCatalog at bottom
3. Save
4. Done! ✅

---

### Fixing a UI Bug

**Before:**
- Search through 2593 lines
- Find rendering code mixed with logic
- Careful not to break other parts

**After:**
- Open `js/ui-renderer.js`
- Find specific rendering function
- Fix and test independently

---

### Updating Styles

**Before:**
- Find CSS section in huge file
- Styles mixed with HTML and JS
- Hard to find specific rules

**After:**
- Open `css/styles.css`
- Search for class/component
- Update styles only

---

## 🔄 Migration Strategy

### Option 1: All at Once (1-2 hours)
**Best for:** Complete refactoring, team projects

1. Create folder structure
2. Extract CSS → test
3. Extract config → test
4. Extract JS modules → test
5. Update paths → test
6. Final verification

---

### Option 2: Gradual Migration (1 week)
**Best for:** Production apps, risk-averse

**Week 1 - Day 1:**
- Extract CSS only
- Test thoroughly
- Deploy if working

**Week 1 - Day 3:**
- Extract config.js
- Update paths
- Test thoroughly

**Week 1 - Day 5:**
- Extract one JS module
- Test integration
- Verify everything works

**Week 2:**
- Extract remaining modules
- Final testing
- Complete migration

---

## ⚡ Quick Start - Minimal Modularization

**If you want quick improvement with minimal effort:**

### Step 1: Just Extract Config (15 min)

Create `js/config.js`:
```javascript
const sopCatalog = [ /* your SOPs */ ];
const downloadRegistry = { /* your downloads */ };
```

Update `sop.html`:
```html
<script src="js/config.js"></script>
<script>
  // Rest of your code stays the same
</script>
```

**Benefit:** Adding SOPs is now MUCH easier!

---

### Step 2: Move JSON Files (5 min)

```bash
mkdir data
mv *_data.json data/
```

Update paths in config:
```javascript
json: 'data/dtr_data.json'  // instead of 'dtr_data.json'
```

**Benefit:** Cleaner root folder!

---

## 📂 Recommended Folder Structure

```
sop-main/
│
├── index.html                    # Main entry point
│
├── css/
│   ├── styles.css               # All application styles
│   └── print.css                # Optional: Print styles
│
├── js/
│   ├── config.js                # SOP catalog & registry
│   ├── app.js                   # Core application
│   ├── ui-renderer.js           # UI rendering
│   ├── flowchart.js             # Flowchart features
│   └── utils.js                 # Utilities
│
├── data/
│   ├── general_sop_data.json
│   ├── dtr_data.json
│   ├── ht_line_data.json
│   └── ...
│
├── templates/
│   ├── generic_ptw.html
│   ├── cable_fault_ptw.html
│   └── ...
│
├── docs/
│   ├── USER_GUIDE.md
│   ├── QUICK_REFERENCE.md
│   └── ...
│
└── README.md
```

---

## 🎨 Advanced: Component System

For future enhancement, you could create a component system:

```javascript
// js/components/SopCard.js
class SopCard {
  constructor(sopData) {
    this.data = sopData;
  }
  
  render() {
    return `
      <div class="sop-card" onclick="loadSop('${this.data.id}')">
        <h3>${this.data.icon} ${this.data.title}</h3>
        <p>${this.data.subtitle}</p>
        <div class="sop-tags">
          ${this.data.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </div>
    `;
  }
}
```

---

## ✅ Testing Checklist After Modularization

- [ ] All SOPs load correctly
- [ ] Step navigation works
- [ ] Checklists function properly
- [ ] Multi-select steps work
- [ ] Flowchart generates
- [ ] PDF download works
- [ ] Progress tracking active
- [ ] Styles render correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] All paths tested

---

## 🐛 Common Issues & Solutions

### Issue: "sopCatalog is not defined"
**Cause:** Scripts loaded in wrong order  
**Fix:** Load config.js before app.js

### Issue: JSON files not loading
**Cause:** Wrong path after moving to data/  
**Fix:** Update all paths in config.js

### Issue: Styles not applying
**Cause:** CSS file not found  
**Fix:** Check path in link tag

### Issue: Functions not found
**Cause:** Function in wrong module  
**Fix:** Move function to correct file or make global

---

## 💡 Best Practices

### Module Organization
✅ One module = one responsibility  
✅ Clear naming conventions  
✅ Minimal dependencies  
✅ Document exports  

### File Naming
✅ Lowercase with hyphens: `ui-renderer.js`  
✅ Descriptive names: `flowchart.js` not `fc.js`  
✅ Consistent extensions: `.js` not `.JS`  

### Loading Order
✅ External libraries first  
✅ Config before app  
✅ Utils before consumers  
✅ App.js last (initialization)  

### Documentation
✅ Comment module purpose at top  
✅ Document exported functions  
✅ Update guides after changes  

---

## 🚀 Next Level: Build System

For production apps, consider:

### Using a Build Tool (Webpack/Rollup)
```bash
npm install webpack webpack-cli --save-dev
```

**Benefits:**
- Bundle all JS into one file
- Minify for production
- Tree shaking (remove unused code)
- Module imports (ES6)

### Using ES6 Modules
```javascript
// config.js
export const sopCatalog = [...];

// app.js
import { sopCatalog } from './config.js';
```

### Using TypeScript
- Type safety
- Better IDE support
- Catch errors early

---

## 📊 Comparison: Before vs After

| Aspect | Before (Monolithic) | After (Modular) |
|--------|---------------------|-----------------|
| **File size** | 2593 lines | ~200 lines HTML + modules |
| **Find code** | Search huge file | Know exact file |
| **Add SOP** | Navigate 2593 lines | Edit 150-line config |
| **Fix bug** | Risk breaking others | Isolated changes |
| **Team work** | Merge conflicts | Parallel development |
| **Load time** | Load everything | Cache modules |
| **Maintenance** | Difficult | Easy |
| **Testing** | Test everything | Test module |

---

## 🎯 Recommendation

### For Your App:
**Start with Phase 1 & 2** (25 minutes total)

1. **Extract CSS** to `css/styles.css`
2. **Extract config** to `js/config.js`
3. **Move data** to `data/` folder

**Benefits:**
- 80% of maintainability improvement
- 20% of effort
- Low risk
- Immediate value

**Then consider Phase 3** if:
- You have multiple developers
- App is growing significantly
- You need better organization

---

## 📝 Summary

**Yes, you can and should modularize `sop.html`!**

**Minimum recommendation:**
- Extract configuration to `js/config.js`
- Move JSON files to `data/` folder

**Full recommendation:**
- Create folder structure
- Separate CSS, JS modules
- Organize by responsibility
- Test incrementally

**Result:**
- ✅ Much easier to add new SOPs
- ✅ Clearer code organization
- ✅ Faster maintenance
- ✅ Better team collaboration
- ✅ Reduced errors

---

**Ready to start?** Follow Phase 1 & 2, test thoroughly, and you'll have a much more maintainable app in under 30 minutes! 🚀

