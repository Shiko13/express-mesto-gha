const router = require('express').Router();
const {
  getAllUsers, getUserById, createUser, updateUser, updateAvatar, deleteUserById,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.delete('/:id', deleteUserById);

module.exports = router;
