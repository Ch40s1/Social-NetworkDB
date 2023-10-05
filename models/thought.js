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
      typ: Number
    }
  },
);

const thought = model('thought', thoughtSchema);

module.exports = thought;
