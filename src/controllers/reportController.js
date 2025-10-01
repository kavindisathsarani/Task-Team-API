const Task = require('../models/Task');
const Team = require('../models/Team');

exports.getReport = async (req, res, next) => {
  try {
    // 1️ Basic task counts
    const totalTasks = await Task.countDocuments();
    const completed = await Task.countDocuments({ status: 'done' });
    const inProgress = await Task.countDocuments({ status: 'in-progress' });
    const todo = await Task.countDocuments({ status: 'todo' });

    // 2️ Tasks per team (aggregation)
    const tasksPerTeamRaw = await Task.aggregate([
      { $group: { _id: "$teamId", count: { $sum: 1 } } }
    ]);

    const tasksPerTeam = await Promise.all(
      tasksPerTeamRaw.map(async t => {
        const team = await Team.findById(t._id);
        return { team: team ? team.name : 'Unknown', count: t.count };
      })
    );

    // 3️ Tasks per status (aggregation)
    const tasksPerStatusRaw = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const tasksPerStatus = tasksPerStatusRaw.map(s => ({
      status: s._id,
      count: s.count
    }));

    // 4️ Overdue tasks
    const overdueTasks = await Task.countDocuments({ 
      dueDate: { $lt: new Date() },
      status: { $ne: 'done' }
    });

    // 5️ Send combined response
    res.json({
      totalTasks,
      completed,
      inProgress,
      todo,
      tasksPerTeam,
      tasksPerStatus,
      overdueTasks
    });

  } catch (err) {
    next(err);
  }
};
