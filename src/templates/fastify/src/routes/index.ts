import { FastifyPluginAsync, FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

const routes: FastifyPluginAsync = async (fastify: FastifyInstance, opts: {}) => {
  fastify.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' }
  })
}

export default routes