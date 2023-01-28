const router = require('express').Router();
const {
  getAllThoughts,
} = require('../../controllers/thoughtController.js');

// //---------------------
// /api/thoughts
router.route('/')
  // - GET to get all thoughts
  .get(getAllThoughts)
  // - POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  .post(createThought)
  // // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
  
  router.route('/:id')
  // - GET to get a single thought by its _id
  .get(getOneThought)
  // - DELETE to remove a thought by its _id
  .delete(deleteThought);
  // - PUT to update a thought by its _id
  .put(updateThought)

//router.route('/:userId').get(getSingleUser);

module.exports = router;

// //---------------------
// /api/thoughts
// - GET to get all thoughts
// - GET to get a single thought by its _id
// - POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
//     // example data
//     {
//       "thoughtText": "Here's a cool thought...",
//       "username": "lernantino",
//       "userId": "5edff358a0fcb779aa7b118b"
//     }
// - PUT to update a thought by its _id
// - DELETE to remove a thought by its _id

// //----------------------
// /api/thoughts/:thoughtId/reactions
// - POST to create a reaction stored in a single thought's reactions array field
// - DELETE to pull and remove a reaction by the reaction's reactionId value