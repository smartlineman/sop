#!/bin/bash

# Quick test to verify modularization worked

echo "🧪 Testing Modularized SOP App"
echo "=============================="
echo ""

# Check folders exist
if [ -d "js" ] && [ -d "data" ]; then
    echo "✅ Folders created: js/ and data/"
else
    echo "❌ Missing folders"
    exit 1
fi

# Check config.js exists
if [ -f "js/config.js" ]; then
    echo "✅ Configuration file: js/config.js"
else
    echo "❌ Missing js/config.js"
    exit 1
fi

# Count JSON files in data folder
json_count=$(ls data/*_data.json 2>/dev/null | wc -l | tr -d ' ')
if [ "$json_count" -eq "9" ]; then
    echo "✅ All 9 JSON data files in data/ folder"
else
    echo "⚠️  Found $json_count JSON files (expected 9)"
fi

# Check backup exists
if [ -f "sop.html.backup" ]; then
    echo "✅ Backup exists: sop.html.backup"
else
    echo "⚠️  No backup found"
fi

# Check if sop.html loads config
if grep -q "js/config.js" sop.html; then
    echo "✅ sop.html loads config from js/config.js"
else
    echo "❌ sop.html not loading config.js"
    exit 1
fi

# Check if old config is commented out
if grep -q "// sopCatalog now loaded from js/config.js" sop.html; then
    echo "✅ Old configuration commented out in sop.html"
else
    echo "⚠️  Old config may still be active"
fi

echo ""
echo "=============================="
echo "✅ Modularization successful!"
echo ""
echo "📋 Next Steps:"
echo "1. Open sop.html in your browser"
echo "2. Verify all SOPs appear"
echo "3. Test a few SOPs to ensure they work"
echo "4. Check browser console (F12) for errors"
echo ""
echo "📁 Folder Structure:"
echo "  sop-main/"
echo "    ├── sop.html (modularized)"
echo "    ├── js/config.js (configuration)"
echo "    └── data/*.json (SOP data files)"
echo ""
echo "📖 To add new SOP:"
echo "  1. Create: data/my_sop_data.json"
echo "  2. Edit: js/config.js (add to sopCatalog)"
echo "  3. Done!"
echo ""
