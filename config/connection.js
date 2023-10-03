//1. require mongoose
const mongoose = require('mongoose');
//2. create a connection
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB')
//3. export the connection
module.exports = mongoose.connection;
