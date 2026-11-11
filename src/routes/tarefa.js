import { Router } from 'express';
import { tarefaController } from '../controllers/index.js';
import {
  validate,
  createTarefaSchema,
  updateTarefaSchema,
  tarefaIdParamSchema,
} from '../middlewares/index.js';

const router = Router();

router.post('/', validate(createTarefaSchema), tarefaController.createTarefa);
router.get('/', tarefaController.getAllTarefas);
router.get('/:objectId', validate(tarefaIdParamSchema), tarefaController.getTarefaById);
router.put('/:objectId', validate(updateTarefaSchema), tarefaController.updateTarefa);
router.delete('/:objectId', validate(tarefaIdParamSchema), tarefaController.deleteTarefa);

export default router;
export { router as tarefaRoutes };

