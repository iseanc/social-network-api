const {Thought} = require('../models')

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
      .then((thought) => res.json(thought))
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
}