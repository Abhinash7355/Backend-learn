const mongoose = require('mongoose'); // Import the Mongoose library

// Define a schema for the User model
const userSchema = new mongoose.Schema({
    username: String, // Field for storing the username
    email: String,    // Field for storing the email
    password: String, // Field for storing the password
});

// Create a Mongoose model named 'User' using the defined schema
const userModel = mongoose.model('User', userSchema);

// Export the userModel so it can be used in other parts of the application
module.exports = userModel;
