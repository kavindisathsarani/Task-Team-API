const Team = require('../models/Team');

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
