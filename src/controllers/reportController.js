const Task = require('../models/Task');

exports.getReport = async (req, res, next) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completed = await Task.countDocuments({ status: 'done' });
    const inProgress = await Task.countDocuments({ status: 'in-progress' });
    const todo = await Task.countDocuments({ status: 'todo' });

    res.json({ totalTasks, completed, inProgress, todo });
  } catch (err) { next(err); }
};
