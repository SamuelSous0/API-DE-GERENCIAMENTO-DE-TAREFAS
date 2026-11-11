import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(4001),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória'),
  ALLOWED_ORIGINS: z.string().min(1, 'ALLOWED_ORIGINS é obrigatória'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET é obrigatória'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Erro de validação nas variáveis de ambiente:', parsedEnv.error.format());
  process.exit(1);
}

const env = parsedEnv.data;

export default env;
export { env };

