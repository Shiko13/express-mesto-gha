const router = require('express').Router();
const {
  getAllCards, getCardById, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/card');
const { validateCreationCard } = require('../middlewares/validation');

router.get('/', getAllCards);
router.get('/:id', getCardById);
router.post('/', validateCreationCard, createCard);
router.put('/:id/likes', likeCard);
router.delete('/:id', deleteCardById);
router.delete('/:id/likes', dislikeCard);

module.exports = router;
