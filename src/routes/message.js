import { Router } from 'express';
import { messageController } from '../controllers/index.js';
import { validate, createMessageSchema } from '../middlewares/index.js';

const router = Router();

router.get('/', messageController.getAllMessages);
router.get('/:messageId', messageController.getMessageById);
router.post('/', validate(createMessageSchema), messageController.createMessage);
router.delete('/:messageId', messageController.deleteMessage);

export default router;
export { router as messageRoutes };

