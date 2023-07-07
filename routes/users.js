const router = require('express').Router();
const {
  getAllUsers, getUserById, getUserInfo, updateUser, updateAvatar, deleteUserById,
} = require('../controllers/users');
const { validateUserId } = require('../middlewares/validation');

router.get('/', getAllUsers);
router.get('/me', getUserInfo);
router.get('/:id', validateUserId, getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.delete('/:id', deleteUserById);

module.exports = router;
