const router = require('express').Router();

const {
  getThoughts,
  createThoughts,
  deleteThought,
  getSingleThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).post(createReaction);

// /api/thoughts/:thoughtId/:reactionId
router.route('/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;
