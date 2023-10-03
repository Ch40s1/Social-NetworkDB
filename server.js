//1. require alldependecies
const express = require('express');
// require mongoose connection
const db = require('./config/connection');
const { user } = require('./models');
// port set
const PORT = process.env.PORT || 3001;
// use express
const app = express();


// 2. create the middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
 try{ const data = await user.find({});
  res.status(200).json(data);
}catch (err){
res.status(500).send({ message: 'Internal Server error'})
}
});

//3 . start the app
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  })
})
