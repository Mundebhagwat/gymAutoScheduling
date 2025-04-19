const mongoose = require('mongoose');
const { Schema } = mongoose;

const classScheduleSchema = new Schema({
    monday: [String],
    tuesday: [String],
    wednesday: [String],
    thursday: [String],
    friday: [String],
    saturday: [String],
    sunday: [String]
});

const requirementsSchema = new Schema({
    Zumba: { type: classScheduleSchema, required: true },
    BollywoodDance: { type: classScheduleSchema, required: true },
    StrengthTraining: { type: classScheduleSchema, required: true }
});

const gymSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    requirements: { type: requirementsSchema, required: true }
});

const Gym = mongoose.model('Gym', gymSchema);

module.exports = Gym;




