const {thought, user} = require('../models');

module.exports = {
  async getThoughts (req, res){
    try {
      const thoughts = await thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async createThoughts (req, res){
    try {
      const thoughts = await thought.create(req.body);
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
