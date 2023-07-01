const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(200).send(user)
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
        }
        res.status(500).send({ message: err.message });
      }));
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(200).send(user)
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
        }
        res.status(500).send({ message: err.message });
      }));
};

module.exports.deleteUserById = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
};
