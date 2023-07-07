const router = require('express').Router();
const {
  getAllCards, getCardById, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/card');
const { validateCreationCard, validateCardId } = require('../middlewares/validation');

router.get('/', getAllCards);
router.get('/:id', getCardById);
router.post('/', validateCreationCard, createCard);
router.put('/:id/likes', validateCardId, likeCard);
router.delete('/:id', validateCardId, deleteCardById);
router.delete('/:id/likes', validateCardId, dislikeCard);

module.exports = router;
