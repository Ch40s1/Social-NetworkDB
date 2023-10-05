const user = require('../models/user')

module.exports = {
  async getUsers(req, res){
    try {
      const users = await user.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(err);
    }
  }
};
