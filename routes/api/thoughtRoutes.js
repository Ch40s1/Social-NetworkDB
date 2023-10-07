const router = require('express').Router();

const {
  getThoughts,
  createThoughts,
  deleteThought,
  getSingleThought,
  createReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).post(createReaction);

module.exports = router;
