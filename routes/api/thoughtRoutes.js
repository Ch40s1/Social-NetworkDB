const router = require('express').Router();

const {
  getThoughts,
  createThoughts,
  deleteThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);
router.route('/:thoughtId').delete(deleteThought);

module.exports = router;
