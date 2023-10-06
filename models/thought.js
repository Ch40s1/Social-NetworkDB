const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatTimestamp(timestamp),
    },
  }
);

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
    reactions: [reactionSchema],
  },
);

const thoughtModel = model('thought', thoughtSchema);

module.exports = thoughtModel;
