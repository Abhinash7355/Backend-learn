const express = require('express'); // Import the Express framework
const morgan = require('morgan'); // Import Morgan, a logging middleware

const app = express(); // Create an instance of an Express application
const userModel = require('./models/user'); // Import the user model
const dbConnection = require('./config/db'); // Import the database connection configuration

app.use(morgan('dev')); // Use Morgan middleware for logging HTTP requests in 'dev' format

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(express.static("public")); // Serve static files from the "public" directory for css

app.set("view engine", 'ejs'); // Set EJS as the templating engine

// Define a route for the root URL
app.get('/', (req, res) => {
    res.render('index'); // Render the 'index' view
});

// Define a route for the '/about' URL
app.get('/about', (req, res) => {
    res.send('Hello i am abhinash'); // Send a plain text response
});

// Define a route for the '/profile' URL
app.get('/profile', (req, res) => {
    res.send('profile page'); // Send a plain text response
});

// Define a route for the '/register' URL
app.get('/register', (req, res) => {
    res.render('register'); // Render the 'register' view
});

// Handle POST requests to '/register'
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Destructure the request body
    const newUser = await userModel.create({
        username: username,
        email: email,
        password: password
    }); // Create a new user in the database
    res.send(newUser); // Send the newly created user as a response
});

// Define a route to get a user with username "a"
app.get('/get-users', (req, res) => {
    userModel.findOne({
        username: "a"
    }).then((user) => {
        res.send(user); // Send the found user as a response
    });
});

// Define a route to update a user's email
app.get('/update-user', async (req, res) => {
    await userModel.findOneAndUpdate({
        username: "a"
    }, {
        email: "c@gyg.com"
    });
    res.send("user update"); // Send a confirmation response
});

// Define a route to delete a user with username "a"
app.get('/delete-user', async (req, res) => {
    await userModel.findOneAndDelete({
        username: "a"
    });
    res.send("user deleted"); // Send a confirmation response
});

// Handle POST requests to '/get-form-data'
app.post('/get-form-data', (req, res) => {
    console.log(req.body); // Log the request body to the console
    res.send('data received'); // Send a confirmation response
});

app.listen(3000); // Start the server on port 3000
