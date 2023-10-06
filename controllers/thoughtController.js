const { ObjectId } = require('mongoose').Types;
const {thoughtModel, userModel} = require('../models');

module.exports = {
  async getThoughts (req, res){
    try {
      const thoughts = await thoughtModel.find().select('-__v');
      res.json({thoughts});
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async createThoughts(req, res) {
    try {
      const thoughtData = await thoughtModel.create({
        ...req.body,
      });

      const userData = await userModel.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughtData._id } },
        { new: true }
      );

      const createdThought = await thoughtModel.findOneAndUpdate(
        { _id: thoughtData._id },
        { username: userData.username },
        { new: true }
      );
      const userIdData = await thoughtModel.findOneAndUpdate(
        { _id: thoughtData._id },
        { user_id: req.body.userId },
        { new: true }
      );
      res.json({createdThought, userIdData });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteThought(req, res) {
    try {
      // get the id of the thought to be deleted
      const thoughtId = req.params.thoughtId;

      // get the thought id
      const thoughtToDelete = await thoughtModel.findById(thoughtId);

      // if the thought to be deleted does not exist then respond with a 404
      if (!thoughtToDelete) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // console.log("USER ID FROM THOUGHT:", thoughtToDelete.user_id);

      const thisUser = await userModel.findById(thoughtToDelete.user_id);
      console.log("USER?", thisUser);

      // find the user and get the thoughts array. pull the thought where the it equals the id
      const userData = await userModel.findOneAndUpdate(
        { _id: new ObjectId(thoughtToDelete.user_id) },
        { $pull: { thoughts: thoughtId } },
        { new: true }
      );

      //delete the thought from all thoughts
      await thoughtModel.findByIdAndRemove(thoughtId);

      res.json({ message: 'Thought deleted', userData});
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getSingleThought (req, res) {
    try {
      const thoughtData = await thoughtModel.findOne({_id: req.params.thoughtId})

      if (!thoughtData){
        return res.status(404).json({message: 'No thought with that ID'});
      }
      res.json(thoughtData);
    } catch (error) {
      res.status(500).json(err);
    }
  },










  // async createreaction (req,res){
  //   try {
  //     const reactionData =
  //   } catch (error) {

  //   }
  // },
};
