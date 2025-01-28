const User = require('../models/User');

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const user = await User.create({ username, email, password, role });
  res.status(201).json(user);
};