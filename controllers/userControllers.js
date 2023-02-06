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
  // push the created user's _id to the associated user's users array field
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
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res){
    console.log('ran updateUser')
    User.findByIdAndUpdate(
      // Finds first document matching userId and
      { _id: req.params.userId },
      // Replaces name with value in URL param
      { 
        $addToSet: {
          username: req.body.username,
          email: req.body.email,
        },
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
    console.log('ran addFriend')
    User.findOneAndUpdate(
      // Finds first document matching username/email
      { username: req.body.username, email: req.body.email },
      // updates user with same infor, or creates new if not exists
      { $set: { username: req.body.username, email: req.body.email }},
      // return updated doc
      { new: true, upsert: true},
      // (err, result) => {
      //   if (result) {
      //     res.status(200).json(result);
      //     console.log(`Updated: ${result}`);
      //   } else {
      //     console.log(err);
      //     res.status(500).json({ message: 'something went wrong' });
      //   }
      // }
    )
    .then((user) => {
      console.log(user._id)
      return User.findOneAndUpdate(
        // { _id: req.body.userId },
        { username: req.params.userId},
        { $addToSet: { thoughts: user._id } },
        { new: true }
      );
    })
    .then((user) => { console.log(User.find({_id: req.params.userId})); res.json('')});
  },
  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { new: true },  //runValidators: true,
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
  },
}