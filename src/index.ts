import Fastify from 'fastify'
import infoRoutes from "./routes/about.js"

const fastify = Fastify({
  logger: true
})

fastify.register(infoRoutes) // Register imported routes

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}