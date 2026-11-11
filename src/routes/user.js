import { Router } from 'express';
import { userController } from '../controllers/index.js';
import { validate, createUserSchema, updateUserSchema } from '../middlewares/index.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', validate(createUserSchema), userController.createUser);
router.put('/:userId', validate(updateUserSchema), userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;
export { router as userRoutes };

