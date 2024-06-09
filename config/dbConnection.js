const mongoose = require('mongoose');

function dbConnection() {
    try {
        mongoose.connect(`mongodb+srv://muchhalsagar:Mura_123@cluster0.odcwctq.mongodb.net/Demo?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = { dbConnection };