const router = require('express').Router();

const {
  getUsers,
  createUser,
  updateUser,
  getSingleUser,
  deleteUser,
  addFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend);
module.exports = router;
