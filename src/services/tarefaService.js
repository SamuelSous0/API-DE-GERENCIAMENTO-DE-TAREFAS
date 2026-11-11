import { Tarefa } from '../models/index.js';
import { AppError } from '../utils/index.js';

const createTarefa = async ({ descricao, concluida = false }) => {
  const novaTarefa = await Tarefa.create({
    descricao,
    concluida,
  });
  return novaTarefa;
};

const getAllTarefas = async () => {
  const tarefas = await Tarefa.findAll({
    order: [['createdAt', 'ASC']],
  });
  return tarefas;
};

const getTarefaById = async (objectId) => {
  const tarefa = await Tarefa.findByPk(objectId);
  if (!tarefa) {
    throw new AppError('Tarefa não encontrada.', 404);
  }
  return tarefa;
};

const updateTarefa = async (objectId, dadosAtualizacao) => {
  const tarefa = await getTarefaById(objectId);

  if (dadosAtualizacao.descricao !== undefined) {
    tarefa.descricao = dadosAtualizacao.descricao;
  }
  if (dadosAtualizacao.concluida !== undefined) {
    tarefa.concluida = dadosAtualizacao.concluida;
  }

  await tarefa.save();
  return tarefa;
};

const deleteTarefa = async (objectId) => {
  const tarefa = await getTarefaById(objectId);
  await tarefa.destroy();
  return true;
};

const tarefaService = {
  createTarefa,
  getAllTarefas,
  getTarefaById,
  updateTarefa,
  deleteTarefa,
};

export default tarefaService;
export {
  tarefaService,
  createTarefa,
  getAllTarefas,
  getTarefaById,
  updateTarefa,
  deleteTarefa,
};

