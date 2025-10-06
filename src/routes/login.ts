import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'; 
import { users } from '../database/schema.ts';
import { db } from '../database/client.ts';
import { eq } from 'drizzle-orm';
import { verify } from 'argon2';
import jwt from 'jsonwebtoken';
import z from 'zod';

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
    server.post('/sessions', {
        schema: {
            tags: ['auth'],
            summary: 'Login',
            description: 'Essa rota recebe um email e senha e cria uma sessão no banco de dados',
            body: z.object({
                email: z.email(),
                password: z.string()
            }),
            response: {
                200: z.object({ token: z.string() }).describe('Login realizado com sucesso'),
                400: z.object({ message: z.string() }).describe('Email ou senha inválidos'),
            }
        }
    }, async (request, reply) => {
        const { email, password } = request.body

        const result = await db
            .select().from(users).where(eq(users.email, email));

        if (!result.length) {
            return reply.status(400).send({ message: 'Email ou senha inválidos' })
        }

        const user = result[0];

        const doesPasswordMatch = await verify(user.password, password);

        if (!doesPasswordMatch) {
            return reply.status(400).send({ message: 'Email ou senha inválidos' })
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não está definido no arquivo .env');
        }

        const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET);

        return reply.status(200).send({ token })
    })
}