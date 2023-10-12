const {thoughModel, userModel} = require('../models');

module.exports = {

  async getUsers(req, res) {
    try {
      // wait for the user model then find all
      const users = await userModel
        .find()
        .select('-__v')

      // respond with all users in json
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async createUser(req, res) {
    try {
      // wait for the user data from the model and create a user with the request body
      const dbUserData = await userModel.create(req.body);
      res.json(dbUserData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getSingleUser(req, res) {
    try {
      // find one user that matches the search parameters
      const userData = await userModel.findOne({ _id: req.params.userId })

      // if the user does not exist exit with a 404
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
      /// find the user with the search parameters and update the user with the new request
      const dbUserData = await userModel.findOneAndUpdate({_id: req.params.userId}, req.body, { new: true });
      res.json(dbUserData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteUser (req, res){
    try {
      // delete a user where the request parameters match an existing user from the model
      const userData = await userModel.findOneAndRemove({_id: req.params.userId});
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async addFriend (req,res){
    try {
      // gets the main user model and the user (friend) that the main user is adding
      const mainUser = await userModel.findById({_id: req.params.userId});
      const friend = await userModel.findById({_id: req.params.friendId});

      // push the friend into the array
      mainUser.friends.push(friend);

      // save the main user
      await mainUser.save();

      res.json(mainUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteFriend(req, res) {
    try {
      // gets both the main user and its friend
      const mainUser = await userModel.findById(req.params.userId);
      const friendId = req.params.friendId; // Get the friend's _id

      // if friend is not in the array then repond with a 404
      const friendIndex = mainUser.friends.indexOf(friendId);
      if (friendIndex === -1) {
        return res.status(404).json({ message: 'Friend not found' });
      }

      // Remove the friend's _id from the mainUser's friends array
      mainUser.friends.splice(friendIndex, 1);

      // Save the mainUser to update the friends array
      await mainUser.save();

      res.json(mainUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

};
