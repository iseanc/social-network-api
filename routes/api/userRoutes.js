const router = require('express').Router();
const { getAllUsers, createUser, getOneUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userControllers.js');
// //--------------------
// /api/users
router.route('/')
  // - GET all users
  .get(getAllUsers)
  // - POST a new user:
  .post(createUser);

router.route('/:userId')
  // - GET a single user by its _id and populated user and friend data
  .get(getOneUser)
  // - PUT to update a user by its _id
  .put(updateUser)
  // - DELETE to remove a user by its _id
  .delete(deleteUser);
  // - BONUS: Remove a user's associated users when deleted.

  
  // // example data
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }
    
//---------------------
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  // - POST to add a new friend to a user's friend list
  .post(addFriend)
  // - DELETE to remove a friend from a user's friend list
  .delete(deleteFriend);
  
module.exports = router;