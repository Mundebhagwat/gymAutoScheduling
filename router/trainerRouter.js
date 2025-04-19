const express = require('express');
const router = express.Router();
const { createTrainer } = require('../controllers/trainerController');  // Import the controller function

router.post('/', createTrainer);  // Use the controller function for the POST request

module.exports = router;  // Export the router
