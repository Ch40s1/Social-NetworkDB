//1. require alldependecies
const express = require('express');
 // require mongoose connection
const db = require('./config/connection');
// port set
const PORT = process.env.PORT || 3001;
// use express
const app = express();


// 2. create the middleware
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

//3 . start the app
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  })
})
