import { ZodError } from 'zod';
import { AppError } from '../utils/index.js';

const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';

  if (err instanceof ZodError) {
    const errors = err.errors.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return res.status(400).json({
      status: 'fail',
      message: errors[0]?.message || 'Erro de validação nos dados enviados.',
      errors,
      ...(isDev && { stack: err.stack }),
    });
  }

  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors?.map((e) => e.message) || [err.message];
    return res.status(400).json({
      status: 'fail',
      message: 'Erro de validação no banco de dados.',
      errors,
      ...(isDev && { stack: err.stack }),
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors?.map((e) => e.message) || [err.message];
    return res.status(409).json({
      status: 'fail',
      message: 'Conflito: registro duplicado.',
      errors,
      ...(isDev && { stack: err.stack }),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status || 'fail',
      message: err.message,
      ...(err.errors && { errors: err.errors }),
      ...(isDev && { stack: err.stack }),
    });
  }

  console.error('Erro não tratado:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor.',
    ...(isDev && { stack: err.stack }),
  });
};

export default errorHandler;
export { errorHandler };

