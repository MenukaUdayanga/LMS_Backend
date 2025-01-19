// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/databases');
const userRoutes = require('./routes/userRoutes');
const appointmentRoute = require('./routes/appointmentRoute');

dotenv.config(); 
connectDB(); 

const app = express();

// Middleware
app.use(express.json()); 

// Routes
app.use('/api/user', userRoutes);
app.use('/api/appointment', appointmentRoute);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
