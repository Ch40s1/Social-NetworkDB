const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const moment = require('moment');

// creates reaction schema
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
      get: function (timestamp) {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  }
);

// thought schema
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

// virtual for the reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// allows the json to use the virtual
thoughtSchema.set('toJSON', { virtuals: true });

const thoughtModel = model('thought', thoughtSchema);

module.exports = thoughtModel;
