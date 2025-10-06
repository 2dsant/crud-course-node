import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

type JWTPayload = {
    sub: string;
    role: 'student' | 'manager';
}

export async function checkRequestJWT(request: FastifyRequest, reply: FastifyReply) {
    const token = request.headers.authorization;

    if (!token) {
        return reply.status(401).send();
    }


    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET não está definido no arquivo .env');
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

        request.user = payload;

        console.log('aaaaa');
        
    } catch (err) {
        return reply.status(401).send();
    }
}