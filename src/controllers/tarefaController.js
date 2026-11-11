import { tarefaService } from '../services/index.js';

const createTarefa = async (req, res) => {
  const novaTarefa = await tarefaService.createTarefa(req.body);
  return res.status(201).json(novaTarefa);
};

const getAllTarefas = async (req, res) => {
  const tarefas = await tarefaService.getAllTarefas();
  return res.status(200).json(tarefas);
};

const getTarefaById = async (req, res) => {
  const { objectId } = req.params;
  const tarefa = await tarefaService.getTarefaById(objectId);
  return res.status(200).json(tarefa);
};

const updateTarefa = async (req, res) => {
  const { objectId } = req.params;
  const tarefaAtualizada = await tarefaService.updateTarefa(objectId, req.body);
  return res.status(200).json(tarefaAtualizada);
};

const deleteTarefa = async (req, res) => {
  const { objectId } = req.params;
  await tarefaService.deleteTarefa(objectId);
  return res.status(204).send();
};

const tarefaController = {
  createTarefa,
  getAllTarefas,
  getTarefaById,
  updateTarefa,
  deleteTarefa,
};

export default tarefaController;
export {
  tarefaController,
  createTarefa,
  getAllTarefas,
  getTarefaById,
  updateTarefa,
  deleteTarefa,
};

