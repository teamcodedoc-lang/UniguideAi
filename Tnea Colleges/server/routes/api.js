const express = require('express');
const router = express.Router();
const College = require('../models/College');

// Get Filters (Districts, Branches, Categories)
router.get('/filters', async (req, res) => {
    try {
        const districts = await College.distinct('district');
        const branches = await College.distinct('branch');
        const categories = await College.distinct('category');

        // Sort them
        districts.sort();
        branches.sort();
        categories.sort();

        res.json({ districts, branches, categories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Get Colleges (General Search/Explore)
router.get('/colleges', async (req, res) => {
    try {
        const { district, tier, limit } = req.query;
        const query = {};

        if (district) query.district = district;
        if (tier) query.tier = tier;

        const colleges = await College.find(query)
            .sort({ tier: 1, cutoff: -1 }) // Best Tiers first, then high cutoffs
            .limit(parseInt(limit) || 12);

        res.json(colleges);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Get Single College Details
router.get('/college/:code', async (req, res) => {
    try {
        const college = await College.findOne({ code: req.params.code });
        if (!college) return res.status(404).json({ msg: 'College not found' });
        res.json(college);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Predict Colleges
router.post('/predict', async (req, res) => {
    console.log("[API] /predict called with body:", req.body);
    // 1. Normalize parameters (Frontend sends 'district', we use 'preferredDistrict')
    let { cutoff, category, preferredBranch, preferredDistrict, district } = req.body;

    // Fallback: if preferredDistrict is empty but district is sent
    if (!preferredDistrict && district) {
        preferredDistrict = district;
    }

    if (!cutoff || !category) {
        console.warn("[API] Missing cutoff or category");
        return res.status(400).json({ msg: 'Cutoff and Category are required' });
    }

    try {
        const query = {
            category: category,
            cutoff: { $lte: parseFloat(cutoff) } // Ensure cutoff is a number
        };
        console.log("[API] Base Query:", JSON.stringify(query));

        // 2. Branch Mapping (Short Code -> Full DB Names)
        const branchMap = {
            'CSE': [
                'COMPUTER SCIENCE AND ENGINEERING',
                'COMPUTER SCIENCE AND ENGINEERING (SS)',
                'COMPUTER SCIENCE AND ENGINEERING (TAMIL)',
                'COMPUTER SCIENCE AND BUSSINESS SYSTEM',
                'Computer Science and Business System (SS)',
                'COMPUTER SCIENCE AND DESIGN'
            ],
            'IT': [
                'INFORMATION TECHNOLOGY',
                'INFORMATION TECHNOLOGY (SS)',
                'Information Technology'
            ],
            'ECE': [
                'ELECTRONICS AND COMMUNICATION ENGINEERING',
                'ELECTRONICS AND COMMUNICATION ENGINEERING (SS)',
                'Electronics and Communication (Advanced Communication Technology)'
            ],
            'EEE': [
                'ELECTRICAL AND ELECTRONICS ENGINEERING',
                'ELECTRICAL AND ELECTRONICS ENGINEERING (SS)',
                'ELECTRICAL AND ELECTRONICS (SANDWICH) (SS)'
            ],
            'MECH': [
                'MECHANICAL ENGINEERING',
                'MECHANICAL ENGINEERING (SS)',
                'MECHANICAL ENGINEERING (SANDWICH) (SS)',
                'MECHANICAL ENGINEERING (TAMIL MEDIUM)',
                'MECHANICAL AND AUTOMATION ENGINEERING'
            ],
            'CIVIL': [
                'CIVIL ENGINEERING',
                'CIVIL ENGINEERING (SS)',
                'CIVIL ENGINEERING (TAMIL MEDIUM)',
                'CIVIL AND STRUCTUTURAL ENGINEERING'
            ],
            'AI&DS': [
                'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE (SS)',
                'Artificial Intelligence and Data Science',
                'Artificial Intelligence and Machine Learning',
                'COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)',
                'COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)'
            ],
            'CYBER': [
                'Cyber Security',
                'Computer Science and Engineering (Cyber Security)',
                'Computer Science and Engineering (Internet of Things and Cyber Security including Block Chain Technology)'
            ],
            'BIOTECH': [
                'BIO TECHNOLOGY',
                'BIO TECHNOLOGY (SS)',
                'INDUSTRIAL BIO TECHNOLOGY',
                'INDUSTRIAL BIO TECHNOLOGY (SS)'
            ],
            'BME': [
                'BIO MEDICAL ENGINEERING',
                'BIO MEDICAL ENGINEERING (SS)',
                'MEDICAL ELECTRONICS'
            ]
        };

        if (preferredBranch) {
            // Check if it's an array, if not treat as single string
            const branches = Array.isArray(preferredBranch) ? preferredBranch : [preferredBranch];

            // If "All Branches" is selected, we skip the branch filter entirely
            if (!branches.includes('All Branches')) {
                let dbBranches = [];
                branches.forEach(b => {
                    if (branchMap[b]) {
                        dbBranches.push(...branchMap[b]);
                    } else {
                        // If no map found, likely specific full name
                        dbBranches.push(b);
                    }
                });

                if (dbBranches.length > 0) {
                    query.branch = { $in: dbBranches };
                }
            }
        }

        if (preferredDistrict) {
            const districts = Array.isArray(preferredDistrict) ? preferredDistrict : [preferredDistrict];
            if (districts.length > 0 && districts[0] !== 'All Districts') {
                query.district = { $in: districts };
            }
        }

        // Fetch colleges
        console.log("[API] Executing MongoDB Query...");
        const startTime = Date.now();
        let colleges = await College.find(query)
            .sort({ cutoff: -1 }) // Best match first
            .limit(200)
            .lean();
        console.log(`[API] Query completed in ${Date.now() - startTime}ms. Found ${colleges.length} records.`);

        // Post-process logic for Tier Scoring and Chance
        const tierWeight = { '1': 100, '2': 50, '3': 0 };
        const subTierWeight = { 'A': 4, 'B': 3, 'C': 2, 'D': 1 };
        const getScore = (c) => (tierWeight[c.tier] || 0) + (subTierWeight[c.subTier] || 0);

        const results = colleges.map(c => {
            const diff = parseFloat(cutoff) - c.cutoff;
            let chance = 'Low';
            if (diff >= 5) chance = 'High';
            else if (diff >= 2) chance = 'Medium';

            return { ...c, diff, chance };
        });

        results.sort((a, b) => {
            const scoreA = getScore(a);
            const scoreB = getScore(b);
            if (scoreA !== scoreB) return scoreB - scoreA;
            return b.cutoff - a.cutoff;
        });

        res.json(results);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Prediction Error' });
    }
});

module.exports = router;
