const router = require('express').Router();
const {
  getAllUsers, getUserById, getUserInfo, updateUser, updateAvatar, deleteUserById,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/me', getUserInfo);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.delete('/:id', deleteUserById);

module.exports = router;
