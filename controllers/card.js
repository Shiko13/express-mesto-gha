const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.body);
  console.log(req);
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      }
      res.status(500).send({ message: err.message });
    });
};
