const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const CastError = require('../errors/CastError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.getCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Не удаётся считать id'));
      } else {
        next(err);
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Запрашиваемая карточка не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('У вас недостаточно прав для удаления данной карточки');
      }
      card.deleteOne()
        .then(() => res.send({ card }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Не удаётся считать id'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Не удаётся считать id'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Не удаётся считать id'));
      } else {
        next(err);
      }
    });
};
