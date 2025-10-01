const router = require('express').Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/roles');
const {
  createTask, getTasks, getTaskById, updateTask, deleteTask
} = require('../controllers/taskController');

const { addComment, getComments } = require('../controllers/commentController');

// Task routes
router.post('/', auth, permit('Admin','Manager'), createTask);
router.get('/', auth, getTasks);
router.get('/:id', auth, getTaskById);
// router.put('/:id', auth, permit('Admin','Manager'), updateTask);
router.put('/:id', auth, updateTask); // all logged-in users
router.delete('/:id', auth, permit('Admin','Manager'), deleteTask);

// Comment routes (nested under tasks)
router.post('/:id/comments', auth, addComment);
router.get('/:id/comments', auth, getComments);

module.exports = router;

