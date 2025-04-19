// const express = require('express');
// const { generateWeeklySchedule } = require('../controllers/scheduleController');
// const router = express.Router();


// router.get('/', generateWeeklySchedule());

// module.exports = router;

const express = require('express');
const { generateWeeklySchedule } = require('../controllers/scheduleController');
const router = express.Router();

router.get('/', generateWeeklySchedule);

module.exports = router;


// try {
//     // Fetch trainers and gyms from the database
//     const trainers = await Trainer.find();  // Get trainers
//     const gyms = await Gym.find();          // Get gyms

//     // Call the generateWeeklySchedule function with trainers and gyms
//     const schedules = await generateSchedule(trainers, gyms);

//     // Send the generated schedules back in the response
//     res.json({ schedule: schedules });
// } catch (error) {
//     console.error("Error in schedule generation:", error);
//     // Ensure that headers are not sent twice
//     if (!res.headersSent) {
//         res.status(500).json({ error: 'Error generating schedule' });
//     }
// }
