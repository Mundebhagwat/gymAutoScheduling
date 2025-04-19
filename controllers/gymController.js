const Gym = require('../models/gym');

// Create a new gym
const createGym = async (req, res) => {
    try {
        const gym = new Gym(req.body);  // Create new gym from request body
        await gym.save();  // Save the gym to the database
        res.status(201).send(gym);  // Send back the created gym with a 201 status code
    } catch (error) {
        res.status(400).send(error);  // If there's an error, send back a 400 status code with the error message
    }
};

module.exports = { createGym };  // Export the function
