const router = require('express').Router();
const {
  getAllCards, getCardById, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/', getAllCards);
router.get('/:id', getCardById);
router.post('/', createCard);
router.delete('/:id', deleteCardById);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);

module.exports = router;
