const router = require('express').Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/roles');
const {
  createTask, getTasks, getTaskById, updateTask, deleteTask
} = require('../controllers/taskController');

router.post('/', auth, permit('Admin','Manager'), createTask);
router.get('/', auth, getTasks);
router.get('/:id', auth, getTaskById);
router.put('/:id', auth, permit('Admin','Manager'), updateTask);
router.delete('/:id', auth, permit('Admin','Manager'), deleteTask);

module.exports = router;
