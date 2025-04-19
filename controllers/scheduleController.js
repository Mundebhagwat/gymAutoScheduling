const Trainer = require('../models/trainer');
const Gym = require('../models/gym');

const generateSchedule = async (trainers, gyms) => {
    const schedule = {};

    const trainerAssignments = {};

    trainers.forEach(trainer => {
        trainerAssignments[trainer.name] = 0;
    });

    gyms.forEach(gym => {
        const gymSchedule = {};

        Object.keys(gym.requirements).forEach(activity => {
            const timeSlots = gym.requirements[activity];
            gymSchedule[activity] = {};

            Object.keys(timeSlots).forEach(day => {
                gymSchedule[activity][day] = [];
                const slots = timeSlots[day];

                slots.forEach(slot => {
                    const [startSlot, endSlot] = parseTimeSlot(slot);

                    const availableTrainer = trainers
                        .filter(trainer => {
                            return (
                                trainer.skills.includes(activity) &&
                                trainer.availability[day]?.includes(slot) &&
                                canTakeSession(trainer, startSlot, endSlot, day, trainerAssignments, trainer.rest_period)
                            );
                        })
                        .sort((a, b) => trainerAssignments[a.name] - trainerAssignments[b.name])
                        .shift();

                    if (availableTrainer) {
                        gymSchedule[activity][day].push({
                            slot,
                            trainer: availableTrainer.name
                        });
                        trainerAssignments[availableTrainer.name]++;
                    } else {
                        gymSchedule[activity][day].push({
                            slot,
                            trainer: "No Trainer Available"
                        });
                    }
                });
            });
        });

        schedule[gym.name] = gymSchedule;
    });

    return schedule;
}

function parseTimeSlot(slot) {
    const [start, end] = slot.split("-").map(time => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    });
    return [start, end];
}


function canTakeSession(trainer, startSlot, endSlot, day, trainerLastSessions, restPeriod) {
    const lastEndTime = trainerLastSessions[trainer.name][day];

    if (lastEndTime == null) {
        return true;
    }
    return startSlot - lastEndTime >= restPeriod * 60;
}

const generateWeeklySchedule = async (req, res) => {
    try {
        // Fetch 
        const trainers = await Trainer.find({}, { _id: 0, __v: 0 }).lean();

        // Remove _id
        const sanitizedTrainers = trainers.map(trainer => {
            if (trainer.availability && trainer.availability._id) {
                delete trainer.availability._id;
            }
            return trainer;
        });

        const gyms = await Gym.find({}, { _id: 0, __v: 0 }).lean();

        // Remove _id
        const sanitizedGyms = gyms.map(gym => {
            if (gym.requirements && gym.requirements._id) {
                delete gym.requirements._id;
            }
            if (gym.requirements && gym.requirements.Zumba._id) {
                delete gym.requirements.Zumba._id;
            }
            if (gym.requirements && gym.requirements.BollywoodDance._id) {
                delete gym.requirements.BollywoodDance._id;
            }
            if (gym.requirements && gym.requirements.StrengthTraining._id) {
                delete gym.requirements.StrengthTraining._id;
            }
            return gym;
        });

        const schedules = await generateSchedule(sanitizedTrainers, sanitizedGyms);

        res.json({ schedule: schedules });
    } catch (error) {
        console.error('Error in schedule generation:', error);

        if (!res.headersSent) {
            res.status(500).json({ error: 'Error generating schedule' });
        }
    }
};

module.exports = { generateWeeklySchedule };
