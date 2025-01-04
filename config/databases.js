const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://Menuka:Me12nu34@slceylon.4phpx.mongodb.net/ceylonwayDb?retryWrites=true&w=majority&appName=slceylon'
        );
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
