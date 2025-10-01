const Comment = require('../models/Comment');
const Task = require('../models/Task');

exports.addComment = async (req, res, next) => {
    // console.log("req.user:", req.user);
  try {
    const taskId = req.params.id;
    const { text } = req.body;

    // Optional: check if task exists
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const comment = await Comment.create({
      task: taskId,
      text,
      author: req.user.id // get user from JWT
    });

    // Emit Socket.IO notification to assigned user (if any)
    if (task.assignedTo && req.app.locals.sockets.has(task.assignedTo.toString())) {
      const socketId = req.app.locals.sockets.get(task.assignedTo.toString());
      req.app.locals.io.to(socketId).emit('newComment', { task, comment });
       console.log(`Socket event emitted: newComment for user ${task.assignedTo}`);
    }

    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    next(err);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const comments = await Comment.find({ task: taskId }).populate('author', 'name email');
    res.json(comments);
  } catch (err) {
    next(err);
  }
};