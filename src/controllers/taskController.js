const Task = require('../models/Task');
const Comment = require('../models/Comment'); // make sure Comment model exists
const User = require('../models/User');

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);

    // Notify assigned user via Socket.IO
    if (req.body.assignedTo && req.app.locals.sockets.has(req.body.assignedTo)) {
      const socketId = req.app.locals.sockets.get(req.body.assignedTo);
      console.log("Socket event emitted: taskAssigned for user", req.body.assignedTo);
      req.app.locals.io.to(socketId).emit('taskAssigned', task);
    }

    res.status(201).json(task);
  } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find()
      .populate('assignedTo', 'name email')
      .populate('teamId', 'name');
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('teamId', 'name');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) { next(err); }
};


exports.updateTask = async (req, res, next) => {
  try {
    // console.log('Update task called for user:', req.user);

    const task = await Task.findById(req.params.id);
    // console.log('Fetched task:', task);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    const user = req.user;

    if (user.role === 'Employee') {
    //   console.log('Employee role detected');

      if (!task.assignedTo) {
        // console.log('Task has no assigned user');
        return res.status(400).json({ message: 'This task has no assigned user' });
      }

      const assignedToId = task.assignedTo.toString();
    //   console.log('assignedToId:', assignedToId, 'user.id:', user.id.toString());

      if (assignedToId !== user.id.toString()) {
        return res.status(403).json({ message: 'Not allowed to update this task' });
      }

      if (!req.body.status) {
        return res.status(400).json({ message: 'Employees can only update status' });
      }

      task.status = req.body.status;
    } else {
    //   console.log('Admin/Manager role detected, updating all fields');
      Object.assign(task, req.body);
    }

    await task.save();

    // Socket notification
    if (req.body.status && task.assignedTo && req.app.locals.sockets.has(task.assignedTo.toString())) {
      const socketId = req.app.locals.sockets.get(task.assignedTo.toString());
      req.app.locals.io.to(socketId).emit('taskStatusUpdated', task);
      console.log('Socket event emitted: taskStatusUpdated for user', task.assignedTo.toString());
    }

    console.log('Task updated successfully');
    res.json(task);
  } catch (err) {
    console.error('Error in updateTask:', err);
    next(err);
  }
};


exports.addComment = async (req, res, next) => {
  try {
    const { taskId, text, createdBy } = req.body;

    const comment = await Comment.create({ taskId, text, createdBy });

    // Notify assigned user of the task
    const task = await Task.findById(taskId);
    if (task.assignedTo && req.app.locals.sockets.has(task.assignedTo.toString())) {
      const socketId = req.app.locals.sockets.get(task.assignedTo.toString());
      req.app.locals.io.to(socketId).emit('newComment', { task, comment });
      console.log('Socket event emitted: newComment for user', task.assignedTo);
    }

    res.status(201).json(comment);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Notify assigned user
    if (task.assignedTo && req.app.locals.sockets.has(task.assignedTo.toString())) {
      const socketId = req.app.locals.sockets.get(task.assignedTo.toString());
      req.app.locals.io.to(socketId).emit('taskDeleted', task);
      console.log('Socket event emitted: taskDeleted for user', task.assignedTo);
    }

    res.json({ message: 'Task deleted' });
  } catch (err) { next(err); }
};



