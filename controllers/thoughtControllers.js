const {Thought, User, Reaction} = require('../models')

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought(req, res){
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          // { _id: req.body.userId },
          { username: req.body.username},
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the post 🎉')
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err)
      });
  },
  getOneThought(req, res){
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res){
    // Thought.updateOne({ _id: req.params.thoughtId })
    // .then((thought) =>
    //   !thought
    //     ? res.status(404).json({ message: 'No thought with that ID' })
    //     : res.json(thought)
    // )
    // .catch((err) => {
    //   console.log(err);
    //   res.status(500).json(err)
    // });
    Thought.findOneAndUpdate(
      // Finds first document matching thoughId
      { _id: req.params.thoughtId },
      // Replaces name with value in URL param
      { 
        $set: {
          thoughtText: req.body.thoughtText
        },
        $currentDate: {
          createdAt: true
        }
      },
      // Sets to true so updated document is returned; Otherwise original document will be returned
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Updated: ${result}`);
        } else {
          console.log(err);
          res.status(500).json({ message: 'something went wrong' });
        }
      }
    );
  },
  deleteThought(req, res){
    Thought.deleteOne({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res){
    Thought.findByIdAndUpdate(
      // Finds first document matching thoughId
      { _id: req.params.thoughtId },
      // Replaces name with value in URL param
      { $addToSet: { reactions: 
          {
            reactionBody: req.body.reactionBody,
            username: req.body.username
          }
        }
      },
      // return updated doc
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Updated: ${result}`);
        } else {
          console.log(err);
          res.status(500).json({ message: 'something went wrong' });
        }
      }
    )
    // .then((thought) => {
    //   return User.findOneAndUpdate(
    //     // { _id: req.body.userId },
    //     { username: req.body.username},
    //     { $addToSet: { thoughts: thought._id } },
    //     { new: true }
    //   );
    // })
    ;
  },
  deleteReaction(req, res){
    // res.json('ran deleteReaction')
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }  //runValidators: true,
    )
    .then((thought) => res.json(thought))
    // .then((thought) =>
    //     !thought
    //       ? res
    //           .status(404)
    //           .json({ message: 'No thought found with that ID :(' })
    //       : res.json(thought)
    //   )
    //   .catch((err) => res.status(500).json(err));
  },
}