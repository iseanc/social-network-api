const router = require('express').Router();
const { getAllThoughts, createThought, getOneThought, updateThought, deleteThought, postReaction, deleteReaction} = require('../../controllers/thoughtControllers.js');

// URL PATH: /api/thoughts
// - GET to get all thoughts
// - POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  
  // // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:thoughtId')
  // - GET to get a single thought by its _id
  .get(getOneThought)
  // - DELETE to remove a thought by its _id
  .delete(deleteThought)
  // - PUT to update a thought by its _id
  .put(updateThought);

// //----------------------
// /api/thoughts/:thoughtId/reactions
router.route('/api/thoughts/:thoughtId/reactions')
  // - POST to create a reaction stored in a single thought's reactions array field
  .post(postReaction)
  // - DELETE to pull and remove a reaction by the reaction's reactionId value
  .delete(deleteReaction);

module.exports = router;