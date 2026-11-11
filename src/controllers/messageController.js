import { Message } from '../models/index.js';
import { AppError } from '../utils/index.js';

const getAllMessages = async (req, res) => {
  const messages = await Message.findAll();
  return res.status(200).json(messages);
};

const getMessageById = async (req, res) => {
  const message = await Message.findByPk(req.params.messageId);
  if (!message) {
    throw new AppError('Mensagem não encontrada.', 404);
  }
  return res.status(200).json(message);
};

const createMessage = async (req, res) => {
  const message = await Message.create({
    text: req.body.text,
    userId: req.body.userId || req.context?.me?.id,
  });
  return res.status(201).json(message);
};

const deleteMessage = async (req, res) => {
  const message = await Message.findByPk(req.params.messageId);
  if (!message) {
    throw new AppError('Mensagem não encontrada.', 404);
  }
  await message.destroy();
  return res.status(204).send();
};

const messageController = {
  getAllMessages,
  getMessageById,
  createMessage,
  deleteMessage,
};

export default messageController;
export { messageController };

