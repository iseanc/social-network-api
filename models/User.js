// Define Mongoose
const mongoose = require('mongoose');

// Create instance of the Mongoose schema to define shape of each document
// User:
const userSchema = new mongoose.Schema({
  // username, String, Unique, Required, Trimmed
  username: { type: String, unique: true, required: true, trim: true },
  // email, String, Required, Unique, Must match a valid email address (look into Mongoose's matching validation)
  email: { type: String, unique: true, required: true, lowercase: true, match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ },
  // TODO: thoughts: Array of _id values referencing the Thought model
  thoughts: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'thought'
    },
  ],
  // TODO: friends: Array of _id values referencing the User model (self-reference)
  friends: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user'
    },
  ],
});

// TODO: Schema Settings:
  // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

// 'User' is the name of the model
// userSchema is the name of the schema we are using to create a new instance of the model
const User = mongoose.model('user', userSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => {
  console.error(err);
}

module.exports = User;