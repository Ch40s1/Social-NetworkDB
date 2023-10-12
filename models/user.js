const { Schema, model } = require('mongoose');

// creates user schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'thoughtModel'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'userModel'
    }
  ],

});

// virtual for friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// allows for the schema to use virtuals
userSchema.set('toJSON', { virtuals: true });


const userModel = model('user', userSchema);

module.exports = userModel;
