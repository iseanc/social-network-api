// Define Mongoose
const mongoose = require('mongoose');

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
module.exports = Reaction;