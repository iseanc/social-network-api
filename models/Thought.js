// Define Mongoose
const mongoose = require('mongoose');

// Mongoose schema instance defines shape of Thought documents
const thoughtSchema = new mongoose.Schema(
  {
    // thoughtText, string, required, between 1 and 280 characters
    thoughtText: { 
      type: String, 
      required: true, 
      minLength: 1, 
      maxLength: 280 
    },

    // username (that created this thought), String, Required
    username: { 
      type: String, 
      required: true,
    },
    // createdAt, 
    // - Date
    // - Set default value to the current timestamp
    createdAt: { type: Date, default: Date.now },
    // reactions (These are like replies)
    // - Array of nested documents created with the reactionSchema
    // reactions: [Reaction],
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
};

thoughtSchema
  .virtual('createdAtFormatted')
  .get(thoughtSchema.methods.formatDate);

const Thought = mongoose.model('thought', thoughtSchema);

const handleError = (err) => console.error(err);

// Uses model to create new instance including subdocument
// const thoughts = { name: 'Taylor', salary: 80000 };
// const employeeData = [
//   { name: 'Ann', salary: 40000 },
//   { name: 'Liu', salary: 50000 },
// ];

// Thought.create(
//   { thoughtText: 'I think therefore I thought.', 
//     username: 'Sean', },
//   (err, data) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log(data);
//   }
// );

// Schema Settings:
// - Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

module.exports = Thought;
