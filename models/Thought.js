// Define Mongoose
const mongoose = require('mongoose');
const { Schema, Types } = require('mongoose');

// Reaction
// Schema Settings:
// - This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const reactionSchema = new mongoose.Schema(
  { 
    // reactionId, ObjectId data type, Default value is set to a new ObjectId
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // reactionBody, String, Required, 280 character maximum
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // username, String, Required
    username: {
      type: String,
      required: true,
    },
    // createdAt, Date, default value to tcurrent timestamp
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
  )
  
  // Use a getter method to format the timestamp on query
  reactionSchema.methods.formatDate = function () {
    
    const localeDateTime = `${this.createdAt.toLocaleDateString()} ${this.createdAt.toLocaleTimeString()}`;
  
  return localeDateTime;
};

reactionSchema
  .virtual('reactionCreatedAtLoc')
  .get(reactionSchema.methods.formatDate);


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
    // createdAt, Date, Set default value to the current timestamp
    createdAt: { type: Date, default: Date.now },
    // reactions (These are like replies)
    // - Array of nested documents created with the reactionSchema
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Use a getter method to format the timestamp on query
thoughtSchema.methods.formatDate = function () {
  
  const localeDateTime = `${this.createdAt.toLocaleDateString()} ${this.createdAt.toLocaleTimeString()}`;
  
  return localeDateTime;
};

thoughtSchema
  .virtual('thoughtCreatedAtLoc')
  .get(thoughtSchema.methods.formatDate);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = mongoose.model('Thought', thoughtSchema);

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
