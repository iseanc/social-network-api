// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({
  // Add individual properties and their types
  // Setting required to true will disallow null values
  item: { type: String, required: true },
  stockCount: Number,
  price: Number,
  inStock: Boolean,
  // Use built in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
});

// Using mongoose.model() to compile a model based on the schema
// 'User' is the name of the model
// userSchema is the name of the schema we are using to create a new instance of the model
const User = mongoose.model('User', userSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

// User:

// username
  // String
  // Unique
  // Required
  // Trimmed

// email
  // String
  // Required
  // Unique
  // Must match a valid email address (look into Mongoose's matching validation)

// thoughts
  // Array of _id values referencing the Thought model
  
// friends
  // Array of _id values referencing the User model (self-reference)

// Schema Settings:
  // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

  module.exports = User;