// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
// Thought:
const thoughtSchema = new mongoose.Schema(
  {
    // thoughtText, string, required, must be between 1 and 280 characters
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },

    // createdAt, 
    // - Date
    // - Set default value to the current timestamp
    createdAt: { type: Date, default: Date.now },
    
    
    // username (The user that created this thought)
    // - String
    // - Required
    username: { type: String, required: true },
    
    // reactions (These are like replies)
    // - Array of nested documents created with the reactionSchema
    // reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// - TODO: Use a getter method to format the timestamp on query
thoughtSchema.methods.formatDate = function () {
  
  const localeDateTime = `${this.createdAt.toLocaleDateString()} ${this.createdAt.toLocaleTimeString()}`;
  
  return localeDateTime;
  // console.log("ran thoughtSchema.formatDate");
  // return this.createdAt.toLocaleDateString();
};

thoughtSchema
  .virtual('createdAtFormatted')
  // .get(Date.now);
  .get(thoughtSchema.methods.formatDate);


// Using mongoose.model() to compile a model based on the schema
// 'Thought' is the name of the model
// thoughtSchema is the name of the schema we are using to create a new instance of the model
const Thought = mongoose.model('Thought', thoughtSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

// Uses model to create new instance including subdocument
// const thoughts = { name: 'Taylor', salary: 80000 };
// const employeeData = [
//   { name: 'Ann', salary: 40000 },
//   { name: 'Liu', salary: 50000 },
// ];

Thought.create(
  { thoughtText: 'I think therefore I thought.', 
    username: 'Sean', },
  (err, data) => {
    if (err) {
      console.error(err);
    }
    console.log(data);
  }
);


// Schema Settings:
// - Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

module.exports = Thought;