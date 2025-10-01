const router = require('express').Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/roles');
const { getUsers, getUserById } = require('../controllers/userController');

router.get('/', auth, permit('Admin', 'Manager'), getUsers);
router.get('/:id', auth, permit('Admin', 'Manager'), getUserById);

module.exports = router;
