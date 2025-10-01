const Team = require('../models/Team');
const User = require('../models/User');

exports.createTeam = async (req, res, next) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (err) { next(err); }
};

exports.getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().populate('members', 'name email');
    res.json(teams);
  } catch (err) { next(err); }
};

// Assign a user to a team
exports.assignUser = async (req, res, next) => {
  try {
    const { id } = req.params; // team ID
    const { userId } = req.body; // user ID to assign

    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Add user to team.members if not already there
    if (!team.members.includes(userId)) team.members.push(userId);
    await team.save();

    // Add team to user.teams if not already there
    if (!user.teams.includes(id)) user.teams.push(id);
    await user.save();

    res.json({
      message: 'User assigned to team successfully',
      team
    });
  } catch (err) {
    next(err);
  }
};
