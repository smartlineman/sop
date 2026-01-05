#!/bin/bash

# SOP App Modularization Script
# This script helps you quickly modularize your sop.html file

echo "=================================="
echo "SOP App Modularization Helper"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "sop.html" ]; then
    echo "❌ Error: sop.html not found in current directory"
    echo "Please run this script from the sop-main folder"
    exit 1
fi

echo "✅ Found sop.html"
echo ""

# Ask user what to do
echo "What would you like to do?"
echo ""
echo "1) Quick modularization (Extract config only - 15 min)"
echo "2) Full modularization (All modules - 1-2 hours)"
echo "3) Just create folder structure"
echo "4) Cancel"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "Starting QUICK modularization..."
        echo ""
        
        # Create js folder
        echo "📁 Creating js/ folder..."
        mkdir -p js
        
        # Create data folder
        echo "📁 Creating data/ folder..."
        mkdir -p data
        
        # Move JSON files
        echo "📦 Moving JSON data files to data/..."
        mv *_data.json data/ 2>/dev/null
        echo "   ✅ JSON files moved"
        
        # Create config.js placeholder
        echo "📝 Creating js/config.js..."
        cat > js/config.js << 'EOF'
// SOP Configuration File
// Add your SOPs here

const sopCatalog = [
  // Copy your SOP entries from sop.html (line ~1240)
  // Example:
  // {
  //   id: 'general_sop',
  //   title: 'General SOP',
  //   json: 'data/general_sop_data.json',
  //   tags: ['General', 'Safety'],
  //   icon: '🛡️'
  // }
];

const downloadRegistry = {
  // Copy your download entries from sop.html (line ~1370)
  // Example:
  // 'general_sop': [
  //   {
  //     label: 'Generic PTW',
  //     file: 'templates/generic_ptw.html',
  //     type: 'PTW'
  //   }
  // ]
};

// Export for browser use
if (typeof window !== 'undefined') {
  window.sopCatalog = sopCatalog;
  window.downloadRegistry = downloadRegistry;
}
EOF
        echo "   ✅ js/config.js created"
        
        # Create backup
        echo "💾 Creating backup of sop.html..."
        cp sop.html sop.html.backup
        echo "   ✅ Backup created: sop.html.backup"
        
        echo ""
        echo "✅ QUICK modularization structure created!"
        echo ""
        echo "📋 NEXT STEPS:"
        echo "1. Open sop.html and find the sopCatalog array (line ~1240)"
        echo "2. Copy it to js/config.js"
        echo "3. Find downloadRegistry object (line ~1370) and copy it"
        echo "4. Update JSON paths: 'file.json' → 'data/file.json'"
        echo "5. In sop.html, add: <script src=\"js/config.js\"></script>"
        echo "6. Remove sopCatalog and downloadRegistry from sop.html"
        echo "7. Test in browser"
        echo ""
        echo "See MODULARIZATION_GUIDE.md for detailed instructions"
        ;;
        
    2)
        echo ""
        echo "Starting FULL modularization..."
        echo ""
        
        # Create folder structure
        echo "📁 Creating folder structure..."
        mkdir -p js
        mkdir -p css
        mkdir -p data
        mkdir -p templates
        mkdir -p docs
        
        # Move files
        echo "📦 Moving files to appropriate folders..."
        mv *_data.json data/ 2>/dev/null
        mv *.html templates/ 2>/dev/null
        mv templates/sop.html . 2>/dev/null  # Move sop.html back
        mv *.md docs/ 2>/dev/null
        mv docs/README.md . 2>/dev/null  # Move README back
        
        # Create JS module placeholders
        echo "📝 Creating JS module files..."
        
        cat > js/config.js << 'EOF'
// Configuration Module
// Contains SOP catalog and download registry

const sopCatalog = [
  // Add your SOPs here
];

const downloadRegistry = {
  // Add downloads here
};

if (typeof window !== 'undefined') {
  window.sopCatalog = sopCatalog;
  window.downloadRegistry = downloadRegistry;
}
EOF

        cat > js/utils.js << 'EOF'
// Utility Functions Module
// Helper functions used throughout the app

function stripHtml(text = '') {
  return String(text).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncateText(text = '', limit = 80) {
  if (!text) return '';
  const normalized = String(text);
  return normalized.length > limit ? normalized.substring(0, limit).trim() + '…' : normalized;
}

function escapeHtml(text = '') {
  return String(text).replace(/[&<>]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[char] || char);
}

function escapeAttribute(text = '') {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(text).replace(/[&<>"']/g, char => entities[char] || char);
}
EOF

        cat > js/app.js << 'EOF'
// Main Application Module
// Core application logic and initialization

// Global state
let steps = {};
let currentStepKey = null;
let activeSop = null;
let stepHistory = [];

// Initialize application
function initApp() {
  console.log('SOP App initialized');
  // Add your init code here
}

// Load SOP data
async function loadJsonSop(id) {
  // Add your loading logic here
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initApp);
EOF

        cat > js/ui-renderer.js << 'EOF'
// UI Renderer Module
// All UI rendering functions

function renderSopSelection() {
  // Add rendering logic here
}

function renderInteractionStep(data, key) {
  // Add rendering logic here
}

function renderResultStep(data) {
  // Add rendering logic here
}

function updateProgressIndicator() {
  // Add progress logic here
}
EOF

        cat > js/flowchart.js << 'EOF'
// Flowchart Module
// Flowchart generation and display

function generateMermaidGraph(stepsData) {
  // Add mermaid graph generation here
}

function showFlowchart() {
  // Add modal display logic here
}

function closeFlowchart() {
  // Add close logic here
}

function downloadFlowchartPDF() {
  // Add PDF generation here
}
EOF

        cat > css/styles.css << 'EOF'
/* SOP App Styles */

:root {
  --primary-color: #2c3e50;
  --accent-color: #e67e22;
  --success-color: #27ae60;
  --danger-color: #c0392b;
  --light-bg: #ecf0f1;
  --card-bg: #ffffff;
}

/* Copy your styles from sop.html here */
EOF

        # Create new index.html template
        cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SOP Distribution Field Hub</title>
    
    <!-- External Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    
    <!-- Styles -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- Copy your HTML structure from sop.html here -->
    
    <div class="container">
        <div class="header">
            <h1>Distribution Field SOP Hub</h1>
            <p>Select SOP to begin</p>
        </div>
        
        <div class="content-area" id="game-interface">
            <!-- Content injected by JavaScript -->
        </div>
    </div>
    
    <!-- Application Modules (load in order) -->
    <script src="js/config.js"></script>
    <script src="js/utils.js"></script>
    <script src="js/flowchart.js"></script>
    <script src="js/ui-renderer.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
EOF

        # Backup original
        echo "💾 Creating backup..."
        cp sop.html sop.html.backup
        
        echo ""
        echo "✅ FULL modularization structure created!"
        echo ""
        echo "📋 Folder Structure:"
        echo "   js/         - JavaScript modules"
        echo "   css/        - Stylesheets"
        echo "   data/       - JSON data files"
        echo "   templates/  - HTML templates"
        echo "   docs/       - Documentation"
        echo ""
        echo "📋 NEXT STEPS:"
        echo "1. Copy content from sop.html to appropriate module files"
        echo "2. Update index.html with your HTML structure"
        echo "3. Copy CSS to css/styles.css"
        echo "4. Test each module as you migrate"
        echo "5. Keep sop.html.backup as reference"
        echo ""
        echo "See MODULARIZATION_GUIDE.md for detailed step-by-step instructions"
        ;;
        
    3)
        echo ""
        echo "Creating folder structure only..."
        echo ""
        
        mkdir -p js
        mkdir -p css
        mkdir -p data
        mkdir -p templates
        mkdir -p docs
        
        echo "✅ Folders created:"
        echo "   📁 js/"
        echo "   📁 css/"
        echo "   📁 data/"
        echo "   📁 templates/"
        echo "   📁 docs/"
        echo ""
        echo "You can now manually organize your files"
        ;;
        
    4)
        echo ""
        echo "Operation cancelled"
        exit 0
        ;;
        
    *)
        echo ""
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "=================================="
echo "✨ Done!"
echo "=================================="
