import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
import { getCourseByIdRoute } from "../src/routes/get-course-by-id.ts";
import { createCourseRoute } from "../src/routes/create-course.ts";
import scalarApiReference from '@scalar/fastify-api-reference';
import { getCoursesRoute } from "../src/routes/get-courses.ts";
import fastifySwagger from "@fastify/swagger";
import fastify from "fastify";

const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === 'development') {
    server.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'Desafio Node.js',
                version: '1.0.0'
            }
        },
        transform: jsonSchemaTransform
    });

    server.register(scalarApiReference, {
        routePrefix: '/docs'
    });
}

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(createCourseRoute);
server.register(getCoursesRoute);
server.register(getCourseByIdRoute);

export { server }