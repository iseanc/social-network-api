// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const reactionSchema = new mongoose.Schema({
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
// 'Reaction' is the name of the model
// reactionSchema is the name of the schema we are using to create a new instance of the model
const Reaction = mongoose.model('reaction', reactionSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

// Reaction (SCHEMA ONLY)

// reactionId
// - Use Mongoose's ObjectId data type
// - Default value is set to a new ObjectId

// reactionBody
// - String
// - Required
// - 280 character maximum

// username
// - String
// - Required

// createdAt
// - Date
// - Set default value to the current timestamp
// - Use a getter method to format the timestamp on query

// Schema Settings:
// - This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

module.exports = Reaction;