import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'; import { courses } from '../database/schema.ts';
import { db } from '../database/client.ts';
import z from 'zod';
import { checkUserRole } from './hooks/check-user-role.ts';
import { checkRequestJWT } from './hooks/checkRequestJWT.ts';

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
    server.post('/courses', {
        preHandler: [
            checkRequestJWT,
            checkUserRole('manager')
        ],
        schema: {
            tags: ['courses'],
            summary: 'Create a course',
            description: 'Essa rota recebe um titulo e cria um curso no banco de dados',
            body: z.object({
                title: z.string().min(5, 'Titulo precisa de no mínimo 5 caracteres')
            }),
            response: {
                201: z.object({ courseId: z.uuid() }).describe('Curso criado com sucesso')
            }
        }
    }, async (request, reply) => {
        const courseTitle = request.body.title

        const result = await db
            .insert(courses)
            .values({ title: courseTitle })
            .returning();

        return reply.status(201).send({ courseId: result[0].id })
    })
}