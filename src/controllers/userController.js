const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').populate('teams', 'name');
    res.json(users);
  } catch (err) { next(err); }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('teams', 'name');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};
