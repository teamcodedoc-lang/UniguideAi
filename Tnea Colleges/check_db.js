const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './server/config.env' }); // try default path
// Fallback if that fails, might be just .env or hardcoded for test
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tnea_db';

const checkDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Validating MongoDB Connection...');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        if (!collections.find(c => c.name === 'colleges')) {
            console.error('ERROR: "colleges" collection not found!');
            process.exit(1);
        }

        const count = await mongoose.connection.db.collection('colleges').countDocuments();
        console.log(`Total Colleges in DB: ${count}`);

        if (count === 0) {
            console.error('ERROR: Database is empty!');
        } else {
            const sample = await mongoose.connection.db.collection('colleges').findOne();
            console.log('Sample Document Structure:', JSON.stringify(sample, null, 2));
        }

        process.exit(0);
    } catch (err) {
        console.error('DB Connection Failed:', err);
        process.exit(1);
    }
};

checkDB();
