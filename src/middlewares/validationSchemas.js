import { z } from 'zod';

export const createTarefaSchema = z.object({
  body: z.object({
    descricao: z
      .string({ required_error: 'A descrição é obrigatória' })
      .trim()
      .min(1, 'A descrição é obrigatória'),
    concluida: z.boolean().optional().default(false),
  }),
});

export const updateTarefaSchema = z.object({
  params: z.object({
    objectId: z.string().uuid('ID inválido'),
  }),
  body: z
    .object({
      descricao: z.string().trim().min(1, 'A descrição não pode ser vazia').optional(),
      concluida: z.boolean().optional(),
    })
    .refine((data) => data.descricao !== undefined || data.concluida !== undefined, {
      message: 'Pelo menos um dos campos (descricao ou concluida) deve ser informado',
    }),
});

export const tarefaIdParamSchema = z.object({
  params: z.object({
    objectId: z.string().uuid('ID em formato inválido'),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    username: z.string().trim().min(1, 'O username é obrigatório'),
    email: z.string().trim().email('E-mail inválido').optional(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    userId: z.string().min(1, 'ID do usuário é obrigatório'),
  }),
  body: z.object({
    username: z.string().trim().min(1, 'O username não pode ser vazio').optional(),
    email: z.string().trim().email('E-mail inválido').optional(),
  }),
});

export const createMessageSchema = z.object({
  body: z.object({
    text: z.string().trim().min(1, 'O texto da mensagem é obrigatório'),
    userId: z.union([z.string(), z.number()]).optional(),
  }),
});

