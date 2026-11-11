import { User } from '../models/index.js';
import { AppError } from '../utils/index.js';

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    throw new AppError('Usuário não encontrado.', 404);
  }
  return res.status(200).json(user);
};

const createUser = async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
  });
  return res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    throw new AppError('Usuário não encontrado.', 404);
  }

  if (req.body.username !== undefined) user.username = req.body.username;
  if (req.body.email !== undefined) user.email = req.body.email;

  await user.save();
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    throw new AppError('Usuário não encontrado.', 404);
  }
  await user.destroy();
  return res.status(204).send();
};

const userController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userController;
export { userController };

