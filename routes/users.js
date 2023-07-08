const router = require('express').Router();
const {
  getAllUsers, getUserById, getUserInfo, updateUser, updateAvatar,
} = require('../controllers/users');
const { validateUserId, validateUpdateUser, validateUpdateAvatar } = require('../middlewares/validation');

router.get('/', getAllUsers);
router.get('/me', getUserInfo);
router.get('/:id', validateUserId, getUserById);
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
