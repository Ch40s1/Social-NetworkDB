const { ObjectId } = require("mongoose").Types;
const { thoughtModel, userModel } = require("../models");

module.exports = {

  // gets all thoughts
  async getThoughts(req, res) {
    try {
      // wait for the thoughtmodel then find all
      const thoughts = await thoughtModel.find().select("-__v");
      //respond with a json of all the thoughts
      res.json({ thoughts });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // creates thoughts
  async createThoughts(req, res) {
    try {
      // wait for the thought model and create a thought using the request body
      const thoughtData = await thoughtModel.create({
        ...req.body,
      });

      // wait for the user model then find one and update the array using the new thought created
      const userData = await userModel.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughtData._id } },
        { new: true }
      );

      // this is so that the username displays when we add the thought to show which user it is
      const createdThought = await thoughtModel.findOneAndUpdate(
        { _id: thoughtData._id },
        { username: userData.username },
        { new: true }
      );
      // this shows the user id
      const userIdData = await thoughtModel.findOneAndUpdate(
        { _id: thoughtData._id },
        { user_id: req.body.userId },
        { new: true }
      );

      // respond with the thought created and user data with all the things that we want
      res.json({ createdThought, userIdData });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // delete thought
  async deleteThought(req, res) {
    try {
      // get the id of the thought to be deleted
      const thoughtId = req.params.thoughtId;

      // get the thought id
      const thoughtToDelete = await thoughtModel.findById(thoughtId);

      // if the thought to be deleted does not exist then respond with a 404
      if (!thoughtToDelete) {
        return res.status(404).json({ message: "Thought not found" });
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

      res.json({ message: "Thought deleted", userData });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // gets single thought
  async getSingleThought(req, res) {
    try {
      // waits for the model and finds one where the id in the search parameters matches the one we are looking for
      const thoughtData = await thoughtModel.findOne({
        _id: req.params.thoughtId,
      });

      // if the thought we are looking for doesnt exist, exit with a 404
      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      // otherwise respond with the thought data as a json
      res.json(thoughtData);
    } catch (error) {
      res.status(500).json(err);
    }
  },

  // create a reaction
  async createReaction(req, res) {
    try {
      // get the thought ID from the request parameters
      const thoughtId = req.params.thoughtId;

      // find the thought by its ID
      const thought = await thoughtModel.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      //create a new reaction based on the request body
      const newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };

      // push the new reaction into the reactions array of the thought
      thought.reactions.push(newReaction);

      //save the thought with the new reaction
      await thought.save();

      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // delete reaction
  async deleteReaction(req, res) {
    try {
      // get both the reaction id and thought id from the search parameters
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      // wait for the model and find by the id
      const thought = await thoughtModel.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      // navigate to the array reactions in the thought we specified and pull the reaction that matches the id
      thought.reactions.pull(reactionId);

      // save the thought
      await thought.save();

      // resond with a json
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
