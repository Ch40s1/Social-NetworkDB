const router = require('express').Router();

const {
  getUsers,
  createUser,
  updateUser,
  getSingleUser
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser);

module.exports = router;
