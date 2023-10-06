const {thoughModel, userModel} = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await userModel
        .find()
        // .select('username email -_id');

      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async createUser(req, res) {
    try {
      const dbUserData = await userModel.create(req.body);
      res.json(dbUserData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getSingleUser(req, res) {
    try {
      const userData = await userModel.findOne({ _id: req.params.userId })


      if (!userData) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser (req, res){
    try {
      const dbUserData = await userModel.findOneAndUpdate({_id: req.params.userId}, req.body, { new: true });
      res.json(dbUserData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteUser (req, res){
    try {
      const userData = await userModel.findOneAndRemove({_id: req.params.userId});
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
