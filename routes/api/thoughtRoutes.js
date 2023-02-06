const router = require('express').Router();
const { getAllThoughts, createThought, getOneThought, updateThought, deleteThought, createReaction, deleteReaction} = require('../../controllers/thoughtControllers.js');

// /api/thoughts
router.route('/')
  // - GET to get all thoughts
  .get(getAllThoughts)
  // - POST new thought
  .post(createThought); 

router.route('/:thoughtId')
  // - GET to get a single thought by its _id
  .get(getOneThought)
  // - DELETE to remove a thought by its _id
  .delete(deleteThought)
  // - PUT to update a thought by its _id
  .put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  // - POST to create a reaction stored in a single thought's reactions array field
  .post(createReaction)
  
  router.route('/:thoughtId/reactions/:reactionId')
  // - DELETE to pull and remove a reaction by the reaction's reactionId value
  .delete(deleteReaction);
  
module.exports = router;