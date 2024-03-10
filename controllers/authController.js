// Importing required libraries and models
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require("bcrypt")

/**
 * Get the list of followers for the current user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

// /register

// Async function to handle user registration
async function registerUser(req, res) {
  try {
    // Extracting user registration data from the request body
    const { username, password, bio, profilepic } = req.body;

    // validating username
    if (!username || username.length < 4) {
      res.status(400)
      return res.json({
        error: "Invalid input: username must be of atleast 4 characters"
      })
    }

    // validating password
    if (!password || password.length < 8) {
      res.status(400)
      return res.json({
        error: "Invalid input: password must be of atleast 8 characters"
      })
    }

    // Checking if the username is already taken
    const isUser = await User.exists({ username: { $eq: username } });
    if (isUser) {
      res.status(400)
      return res.json({ error: 'Invalid input: Username already taken' });
    }

    // hashing password
    let passwordhash = await bcrypt.hash(password, 10)
    // Creating a new user and saving it to the database
    const user = new User({
      username,
      bio: bio || "",
      profilePictureURL: profilepic || "",
      password: passwordhash
    });
    await user.save();

    // Sending a success response after user registration
    res.status(200)
    return res.json({ message: 'User registered successfully' });
  } catch (error) {
    // Handling errors and sending an error response if registration fails
    console.error(error);
    res.status(500)
    return res.json({ error: 'An error occured, Registration failed' });
  }
}

// /login

// Async function to handle user login
async function loginUser(req, res) {
  try {
    // Extracting the username from the request body
    const { username, password } = req.body;

    // Finding the user with the provided username
    const user = await User.findOne({ username: { $eq: username } });

    // Checking if the user exists for authentication
    if (!user) {
      res.status(400)
      return res.json({ error: 'Invalid input: User with this username not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generating a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });

    // Sending the generated token as a response for successful login
    res.status(200)
    return res.json({ token });
  } catch (error) {
    // Handling errors and sending an error response if login fails
    console.error(error);
    res.status(400)
    return res.json({ error: 'An error occured, Login failed' });
  }
}

// Exporting the functions for use in other modules
module.exports = {
  registerUser,
  loginUser,
};
