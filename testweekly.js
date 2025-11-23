// testWeekly.js
require('dotenv').config();
const mongoose = require('mongoose');
const WeeklyChallenge = require('./src/models/WeeklyChallenge.model');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/psycho_virtuel_dev');

    console.log('✅ Connected');

    const count = await WeeklyChallenge.countDocuments({});
    console.log('Count weeklychallenges =', count);

    const docs = await WeeklyChallenge.find({}).lean();
    console.log('Docs:', docs);

    await mongoose.disconnect();
    console.log('✅ Done');
  } catch (e) {
    console.error('❌ ERROR in testWeekly:', e);
    process.exit(1);
  }
})();
