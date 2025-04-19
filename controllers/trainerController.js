const Trainer = require('../models/trainer'); // Assuming your Trainer model is here

// Create a new trainer
const createTrainer = async (req, res) => {
    try {
        const trainer = new Trainer(req.body);  // Create new trainer from request body
        await trainer.save();  // Save the trainer to the database
        res.status(201).send(trainer);  // Send back the created trainer with a 201 status code
    } catch (error) {
        res.status(400).send(error);  // If there's an error, send back a 400 status code with the error message
    }
};

module.exports = { createTrainer };  // Export the function
