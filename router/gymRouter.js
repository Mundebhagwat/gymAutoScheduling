const express = require('express');
const router = express.Router();
const { createGym } = require('../controllers/gymController');  // Import the gym controller

// POST request to create a gym
router.post('/', createGym);  // Use the controller function for the POST request

module.exports = router;  // Export the router
