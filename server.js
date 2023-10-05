//1. require alldependecies
// import express from 'express';
const express = require('express');
// require mongoose connection
const db = require('./config/connection');
const routes = require('./routes');
// port set
const PORT = process.env.PORT || 3001;
// use express
const app = express();


// 2. create the middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// async function clearCollections() {
//   const collections = db.collections;

//   await Promise.all(
//     Object.values(collections).map(async (collection) => {
//       await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
//     })
//   );
// }

db.once('open', () => {
  // clearCollections();
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
});
