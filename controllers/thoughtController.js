const {thought, user} = require('../models');

module.exports = {
  async getThoughts (req, res){
    try {
      const thoughts = await thought.find().select('-__v');
      res.json({thoughts});
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async createThoughts(req, res) {
    try {
      const thoughtData = await thought.create({
        ...req.body,
      });

      const userData = await user.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughtData._id } },
        { new: true }
      );

      const createdThought = await thought.findOneAndUpdate(
        { _id: thoughtData._id },
        { username: userData.username },
        { new: true }
      );
      const userIdData = await thought.findOneAndUpdate(
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
      const thoughtToDelete = await thought.findById(thoughtId);

      // if the thought to be deleted does not exist then respond with a 404
      if (!thoughtToDelete) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // find the user and get the thoughts array. pull the thought where the it equals the id
      const userData = await user.findOneAndUpdate(
        { _id: thoughtToDelete.user_Id },
        { $pull: { thoughts: thoughtId } },
        { new: true }
      );

      //delete the thought from all thoughts
      await thought.findByIdAndRemove(thoughtId);

      res.json({ message: 'Thought deleted', userData});
    } catch (error) {
      res.status(500).json(error);
    }
  },

};
