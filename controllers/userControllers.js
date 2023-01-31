const {User} = require('../models')

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // (don't forget to push the created user's _id to the associated user's users array field)
  createUser(req, res){
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err)
      });
  },
  getOneUser(req, res){
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res){
    User.findOneAndUpdate(
      // Finds first document matching userId and
      { _id: req.params.userId },
      // Replaces name with value in URL param
      { 
        $set: {
          userText: req.body.userText},
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
  deleteUser(req, res){
    User.deleteOne({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {

  },
  deleteFriend(req, res) {

  },
}