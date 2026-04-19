/// <reference types="node" />
import fastify from 'fastify'

const app = fastify({ logger: true })

app.register((await import('./routes/index')).default)

const start = async () => {
  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()