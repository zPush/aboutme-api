import Fastify from 'fastify'
import infoRoutes from "./routes/about.js"
import rateLimit from "@fastify/rate-limit"

const fastify = Fastify({
  logger: true
})

await fastify.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute"
})

await fastify.register(infoRoutes)

// Run the server!
try {
  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      statusCode: 404,
      error: "Not Found",
      message: `Route ${request.method} ${request.url} not found. Available routes: GET /about, GET /skills, GET /projects, GET /tools, GET /experience, GET /interests, GET /health or read the README of the github repo for more info.`
    })
  })
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}