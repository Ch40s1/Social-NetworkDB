const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      minLength: 1,
      maxLength: 128,
    },
    username: {
      type: String
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'userModel',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

const thoughtModel = model('thought', thoughtSchema);

module.exports = thoughtModel;
