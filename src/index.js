import express from 'express';
import helmet from 'helmet';
import { env, AppError } from './utils/index.js';
import models, { sequelize } from './models/index.js';
import { corsMiddleware, rateLimiter, errorHandler } from './middlewares/index.js';
import { tarefaRoutes, userRoutes, messageRoutes } from './routes/index.js';

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let dbInitialized = false;
let dbInitPromise = null;

const ensureDbInitialized = async () => {
  if (dbInitialized) return;
  if (!dbInitPromise) {
    dbInitPromise = sequelize.sync().then(() => {
      dbInitialized = true;
    }).catch((err) => {
      dbInitPromise = null;
      throw err;
    });
  }
  await dbInitPromise;
};

app.use(async (req, res, next) => {
  await ensureDbInitialized();
  req.context = {
    models,
  };
  next();
});

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'API de Gerenciamento de Tarefas ativa.',
  });
});

app.use('/tarefas', tarefaRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

app.use((req, res, next) => {
  next(new AppError(`Rota ${req.originalUrl} não encontrada.`, 404));
});

app.use(errorHandler);

if (!process.env.VERCEL) {
  ensureDbInitialized()
    .then(() => {
      app.listen(env.PORT, () => {
        console.log(`Servidor rodando na porta ${env.PORT} [${env.NODE_ENV}]`);
      });
    })
    .catch((err) => {
      console.error('Falha ao conectar ao banco de dados:', err);
      process.exit(1);
    });
}

export default app;

