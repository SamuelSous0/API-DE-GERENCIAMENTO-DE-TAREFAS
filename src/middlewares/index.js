import corsMiddleware, { corsOptions } from './cors.js';
import rateLimiter from './rateLimiter.js';
import validate from './validate.js';
import errorHandler from './error.js';
import {
  createTarefaSchema,
  updateTarefaSchema,
  tarefaIdParamSchema,
  createUserSchema,
  updateUserSchema,
  createMessageSchema,
} from './validationSchemas.js';

export {
  corsMiddleware,
  corsOptions,
  rateLimiter,
  validate,
  errorHandler,
  createTarefaSchema,
  updateTarefaSchema,
  tarefaIdParamSchema,
  createUserSchema,
  updateUserSchema,
  createMessageSchema,
};

