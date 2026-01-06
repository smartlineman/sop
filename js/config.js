// Central catalogs for the SOP experience. Keep entries in sync with the JSON data files.
(function attachSopConfig(global) {
    const sopCatalog = [
        {
            id: 'general_sop',
            title: 'General SOP',
            isHighlighted: true,
            subtitle: 'সার্বজনীন ইলেক্ট্রিক্যাল ওয়ার্ক গাইড',
            summary: 'PPE, PTW, Isolation, Discharge এবং Restoration-এর সার্বজনীন ধাপসমূহ।',
            json: 'general_sop_data.json',
            tags: ['General', 'Safety', 'PTW'],
            icon: '🛡️'
        },
        {
            id: 'dtr',
            title: 'ডিটিআর ব্রেকডাউন ও টিট-বিট রিপেয়ার',
            subtitle: 'লাইনম্যানের ডিজিটাল গাইড',
            summary: 'ট্রান্সফরমার ফল্ট ডায়াগনোসিস, মেগার টেস্ট এবং সাইটে টিট-বিট রিকভারি।',
            json: 'dtr_data.json',
            tags: ['DTR', 'Breakdown'],
            icon: '⚡'
        },
        {
            id: 'ht_line',
            title: '১১কেভি লাইন রিস্টোরেশন',
            subtitle: 'ফিডার ব্রেকডাউন SOP',
            summary: 'PTW, প্যাট্রোলিং, জাম্পার/গাছ জটিলতা এবং রি-চার্জিং সিকোয়েন্স।',
            json: 'ht_line_data.json',
            tags: ['11kV', 'Patrolling'],
            icon: '🌳'
        },
        {
            id: 'lt_service',
            title: 'এলটি ফিডার ও সার্ভিস ফল্ট',
            subtitle: 'লো-টেনশন ফিল্ড গাইড',
            summary: 'পিলার বক্স, আউটগোয়িং কেবল, লোড ব্যালেন্সিং ও স্ল্যাব জব চেক।',
            json: 'lt_service_data.json',
            tags: ['LT', 'No Supply'],
            icon: '🔌'
        },
        {
            id: 'dtr_pm',
            title: 'ডিটিআর প্রিভেন্টিভ মেইনটেনেন্স',
            subtitle: 'সূচিবদ্ধ মেইনটেনেন্স SOP',
            summary: 'আইসোলেশন, টর্কিং, অয়েল অ্যানালাইসিস এবং রেকর্ড আপডেট চেকলিস্ট।',
            json: 'dtr_pm_data.json',
            tags: ['Maintenance', 'Checklist'],
            icon: '🧰'
        },
        {
            id: 'ptr_buchholz',
            title: 'PTR Buchholz Alarm',
            subtitle: 'বড় ট্রান্সফরমার প্রটেকশন',
            summary: 'বুচহলজ অ্যালার্ম/ট্রিপ হলে অন-ডিউটি অপারেটরের করণীয় ধাপে ধাপে নির্দেশনা।',
            json: 'ptr_buchholz_data.json',
            tags: ['PTR', 'Protection'],
            icon: '🛡️'
        },
        {
            id: 'domestic_meter',
            title: 'ডোমেস্টিক মিটার ইনস্টল',
            subtitle: 'নতুন সংযোগ SOP',
            summary: 'ওয়ার্ক-অর্ডার যাচাই থেকে সিলিং ও অ্যাপ লগ আপডেট পর্যন্ত সম্পূর্ণ ধাপ।',
            json: 'new_meter_install_data.json',
            tags: ['Meter', 'New Connection'],
            icon: '🏠'
        },
        {
            id: 'pin_insulator',
            title: '১১কেভি পিন ইনসুলেটর',
            subtitle: 'ব্রেকডাউন রিপ্লেসমেন্ট',
            summary: 'প্যাট্রোলিংয়ে চিপ করা ইনসুলেটর বদলানোর পারমিট, PPE ও চার্জিং ধাপসমূহ।',
            json: 'pin_insulator_replacement_data.json',
            tags: ['11kV', 'Maintenance'],
            icon: '🪜'
        },
        {
            id: 'ug_cable_fault',
            title: 'আন্ডারগ্রাউন্ড কেবল ফল্ট',
            subtitle: 'ফল্ট লোকেলাইজেশন গাইড',
            summary: 'থাম্পার, TDR, VLF টেস্ট দিয়ে ক্যাবল ফল্ট খুঁজে বের করো এবং রিপেয়ার করো।',
            json: 'underground_cable_fault_data.json',
            tags: ['UG Cable', '11kV', 'Fault'],
            icon: '🔍'
        }
    ];

    const downloadCatalog = {
        general_sop: [
            { label: 'General PTW Form', type: 'PTW', href: 'generic_ptw.html' },
            { label: 'Safety Checklist', type: 'Checklist', href: 'risk_assessment_form.html' }
        ],
        dtr: [
            { label: '11kV PTW Template', type: 'PTW', href: 'ptw_11kv_template.html' },
            { label: 'DTR Repair Checklist', type: 'Checklist', href: 'dtr_repair_checklist.html' }
        ],
        ht_line: [
            { label: 'Feeder Isolation Permit', type: 'Permit Form', href: 'feeder_isolation_permit.html' },
            { label: 'HT Line Patrol Log', type: 'Checklist', href: 'ht_patrol_log.html' }
        ],
        lt_service: [
            { label: 'LT Service Checklist', type: 'Checklist', href: 'lt_service_checklist.html' }
        ],
        dtr_pm: [
            { label: 'Preventive Maintenance Sheet', type: 'Checklist', href: 'dtr_pm_sheet.html' },
            { label: 'Oil Sampling Form', type: 'Form', href: 'oil_sampling_form.html' }
        ],
        ptr_buchholz: [
            { label: 'PTR PTW Template', type: 'PTW', href: 'ptr_ptw_template.html' },
            { label: 'Buchholz Incident Log', type: 'Form', href: 'buchholz_incident_log.html' }
        ],
        domestic_meter: [
            { label: 'New Connection Checklist', type: 'Checklist', href: 'new_connection_checklist.html' },
            { label: 'Meter Installation Permit', type: 'Permit Form', href: 'meter_install_permit.html' }
        ],
        pin_insulator: [
            { label: '11kV Isolation PTW', type: 'PTW', href: 'pin_insulator_ptw.html' }
        ],
        ug_cable_fault: [
            { label: 'Cable Fault Localization PTW', type: 'PTW', href: 'cable_fault_ptw.html' },
            { label: 'Cable Fault Test Report', type: 'Form', href: 'cable_fault_test_report.html' }
        ]
    };

    const defaultDownloads = [
        { label: 'Generic PTW Template', type: 'PTW', href: 'generic_ptw.html' },
        { label: 'Site Risk Assessment Form', type: 'Checklist', href: 'risk_assessment_form.html' }
    ];

    // Frozen blueprint that authors can clone when drafting a new SOP JSON.
    const sopBlueprint = Object.freeze({
        meta: {
            schemaVersion: '2026.01',
            sopId: 'sample_sop',
            appTitle: 'Sample SOP Title',
            appSubtitle: 'High-level helper text for crew',
            startNode: 'STEP_010_PPE_GATE',
            locale: 'bn',
            owner: 'Distribution Field Ops'
        },
        steps: {
            STEP_010_PPE_GATE: {
                type: 'interaction',
                title: 'PPE Readiness',
                phase: 'Safety Gate',
                content: 'Checklist for PPE and risk briefing before touching the network.',
                note: 'Insulated mats are mandatory only inside control rooms/indoor panels; field crews may skip if footing is already insulated.',
                actions: [
                    { label: 'PPE cleared', goto: 'STEP_020_PTW_GATE', style: 'positive' }
                ]
            },
            STEP_020_PTW_GATE: {
                type: 'interaction',
                phase: 'Permit Control',
                content: 'Confirm PTW, communication channel, and job scope before shutdown.',
                actions: [
                    { label: 'PTW signed', goto: 'STEP_030_SD_REQUEST', style: 'positive' },
                    { label: 'PTW missing - stop', goto: 'STEP_025_PTW_BLOCK', style: 'negative', bypassChecklist: true }
                ]
            },
            STEP_025_PTW_BLOCK: {
                type: 'result',
                status: 'fail',
                title: 'PTW unavailable',
                content: 'Abort the job or obtain a valid permit before proceeding.'
            },
            STEP_030_SD_REQUEST: {
                type: 'interaction',
                phase: 'Shutdown',
                content: 'Request shutdown from the control room.',
                actions: [
                    { label: 'Await confirmation', goto: 'STEP_040_SD_CONFIRM' }
                ]
            },
            STEP_040_SD_CONFIRM: {
                type: 'interaction',
                phase: 'Shutdown',
                content: 'Control room confirms feeder is de-energized.',
                actions: [
                    { label: 'Proceed to isolation', goto: 'STEP_050_ISOLATION_BOUNDARY' }
                ]
            },
            STEP_050_ISOLATION_BOUNDARY: {
                type: 'interaction',
                phase: 'Isolation',
                content: 'Define work-zone boundaries and open DO/link/VCB as required.',
                actions: [
                    { label: 'Boundary isolated', goto: 'STEP_060_SD_WITHDRAW_TAGGING' }
                ]
            },
            STEP_060_SD_WITHDRAW_TAGGING: {
                type: 'interaction',
                phase: 'Isolation',
                content: 'Apply LOTO, danger tags, and update SD withdrawal log.',
                actions: [
                    { label: 'Tagging done', goto: 'STEP_070_DISCHARGE' }
                ]
            },
            STEP_070_DISCHARGE: {
                type: 'interaction',
                phase: 'Earthing',
                content: 'Discharge with rod and verify absence of voltage.',
                actions: [
                    { label: 'Voltage zero', goto: 'STEP_080_TEMP_EARTH' }
                ]
            },
            STEP_080_TEMP_EARTH: {
                type: 'interaction',
                phase: 'Earthing',
                content: 'Apply temporary earths on both ends of work zone.',
                actions: [
                    { label: 'Earthing done', goto: 'STEP_090_WORK_BRIEF' }
                ]
            },
            STEP_090_WORK_BRIEF: {
                type: 'interaction',
                phase: 'Pre-Work',
                content: 'Brief crew on roles, hazards, and emergency signals.',
                actions: [
                    { label: 'Crew briefed', goto: 'STEP_100_WORK_WINDOW' }
                ]
            },
            STEP_100_WORK_WINDOW: {
                type: 'interaction',
                phase: 'Work',
                content: 'Execute the job-specific tasks for this SOP segment.',
                note: 'Authors can branch custom flows from STEP_100 and return here before post-work gates.',
                actions: [
                    { label: 'Job complete', goto: 'STEP_110_TOOLS_SWEEP', style: 'positive' }
                ]
            },
            STEP_110_TOOLS_SWEEP: {
                type: 'interaction',
                phase: 'Post-Work',
                content: 'Remove tools, scrap, and verify no foreign material remains.',
                actions: [
                    { label: 'Area clear', goto: 'STEP_120_CREW_CONFIRM' }
                ]
            },
            STEP_120_CREW_CONFIRM: {
                type: 'interaction',
                phase: 'Post-Work',
                content: 'Confirm all crew are out of the danger zone.',
                actions: [
                    { label: 'Crew clear', goto: 'STEP_130_REMOVE_TEMP_EARTH' }
                ]
            },
            STEP_130_REMOVE_TEMP_EARTH: {
                type: 'interaction',
                phase: 'Restore Prep',
                content: 'Remove temporary earths and update registers.',
                actions: [
                    { label: 'Earths removed', goto: 'STEP_140_RECONNECT_ZONE' }
                ]
            },
            STEP_140_RECONNECT_ZONE: {
                type: 'interaction',
                phase: 'Restore Prep',
                content: 'Reconnect conductors/equipment and perform visual inspection.',
                actions: [
                    { label: 'Ready for charging', goto: 'STEP_150_SD_WITHDRAW_REQUEST' }
                ]
            },
            STEP_150_SD_WITHDRAW_REQUEST: {
                type: 'interaction',
                phase: 'Shutdown Release',
                content: 'Inform control room to withdraw shutdown.',
                actions: [
                    { label: 'Requested', goto: 'STEP_160_SD_WITHDRAW_CONFIRM' }
                ]
            },
            STEP_160_SD_WITHDRAW_CONFIRM: {
                type: 'interaction',
                phase: 'Shutdown Release',
                content: 'Control room confirms restoration, log signatures.',
                actions: [
                    { label: 'Approved', goto: 'STEP_170_RESTORATION' }
                ]
            },
            STEP_170_RESTORATION: {
                type: 'interaction',
                phase: 'Energization',
                content: 'Perform controlled energization and monitoring.',
                actions: [
                    { label: 'Restoration complete', goto: 'STEP_900_SUCCESS', style: 'positive' }
                ]
            },
            STEP_900_SUCCESS: {
                type: 'result',
                status: 'success',
                title: 'Job closed',
                content: 'All mandatory gates cleared; proceed with documentation.'
            }
        }
    });

    global.sopCatalog = sopCatalog;
    global.downloadCatalog = downloadCatalog;
    global.defaultDownloads = defaultDownloads;
    global.sopBlueprint = sopBlueprint;
    global.cloneSopBlueprint = function cloneSopBlueprint() {
        return JSON.parse(JSON.stringify(sopBlueprint));
    };
})(window);
