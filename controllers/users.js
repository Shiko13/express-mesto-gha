const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const DuplicateError = require('../errors/DuplicateError');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// module.exports.getUserById = (req, res) => {
//   User.findById(req.params.id)
//     .orFail(new Error('NotValidId'))
//     .then((user) => res.status(200).send(user))
//     .catch((err) => {
//       if (err.message === 'NotValidId') {
//         res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
//       } else if (err.name === 'CastError') {
//         res.status(400).send({ message: 'Не удаётся считать id' });
//       } else {
//         res.status(500).send({ message: err.message });
//       }
//     });
// };

module.exports.getUserInfo = (req, res, next) => {
  console.log(req.user._id);
  console.log('tasfsdafasdfext');
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        next(new ValidationError('Ошибка валидации'));
      } else if (err.code === 11000) {
        next(new DuplicateError('Эта почта уже была зарегистрирована'));
      } else {
        next(err);
      }
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
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
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
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.deleteUserById = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Не удаётся считать id' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user);
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};
