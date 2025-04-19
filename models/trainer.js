const mongoose = require('mongoose');
const { Schema } = mongoose;

const availabilitySchema = new Schema({
    monday: [String],
    tuesday: [String],
    wednesday: [String],
    thursday: [String],
    friday: [String],
    saturday: [String],
    sunday: [String]
});

const trainerSchema = new Schema({
    name: { type: String, required: true },
    skills: { type: [String], required: true },
    availability: { type: availabilitySchema, required: true },
    rest_period: { type: Number, required: true }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
