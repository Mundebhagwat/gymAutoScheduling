const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const scheduleRoutes = require('./router/scheduleRoutes');
const gymRouter = require('./router/gymRouter')
const trainerRouter = require('./router/trainerRouter')



app.use(express.json());
const port = 3500;
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;


// Connect to MongoDB
mongoose.connect(mongoURI, {
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON request bodies

// Register the schedule routes
app.use('/api/schedule', scheduleRoutes);
app.use('/api/trainers', trainerRouter);
app.use('/api/gyms', gymRouter);



app.get('/', (req, res) => {
  res.send("hello");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});