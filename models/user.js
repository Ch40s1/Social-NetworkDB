const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, trim: true, required: true},
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  }

})

const user = mongoose.model('user', userSchema);

const handleError = (err) => console.log(err);

user.create({
username: "Ch40s1",
email: "test@test.com"
})
.then(result => console.log('created new user', result))
.catch(err => handleError(err));

module.exports = user;
