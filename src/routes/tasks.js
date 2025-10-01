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



// const Comment = require('../models/Comment');
// const Task = require('../models/Task');

// exports.addComment = async (req, res, next) => {
//   try {
//     const comment = await Comment.create({
//       task: req.params.id,
//       text: req.body.text,
//       author: req.user._id // <-- get user from auth middleware
//     });

//     // Emit Socket.IO notification
//     if (req.app.locals.sockets.has(req.body.assignedTo)) {
//       const socketId = req.app.locals.sockets.get(req.body.assignedTo);
//       req.app.locals.io.to(socketId).emit('newComment', { task: req.params.id, comment });
//     }

//     res.status(201).json({ message: "Comment added", comment });
//   } catch (err) {
//     next(err);
//   }
// };



// const router = require('express').Router();
// const auth = require('../middlewares/auth');
// const permit = require('../middlewares/roles');
// const {
//   createTask, getTasks, getTaskById, updateTask, deleteTask
// } = require('../controllers/taskController');

// router.post('/', auth, permit('Admin','Manager'), createTask);
// router.get('/', auth, getTasks);
// router.get('/:id', auth, getTaskById);
// router.put('/:id', auth, permit('Admin','Manager'), updateTask);
// router.delete('/:id', auth, permit('Admin','Manager'), deleteTask);

// module.exports = router;
