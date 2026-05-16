import Fastify from 'fastify'
import infoRoutes from "./routes/about.js"
import rateLimit from "@fastify/rate-limit"
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: true
})
await fastify.register(cors, {
  origin: "*",
  methods: ["GET"]
})

await fastify.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute"
})

fastify.get('/', async function handler(request, reply) {
  return reply.status(200).send({
    routes: [
      "GET /about",
      "GET /skills",
      "GET /projects",
      "GET /tools",
      "GET /experience",
      "GET /interests",
      "GET /health"
    ]
  })
})

await fastify.register(infoRoutes)
fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    statusCode: 404,
    error: "Not Found",
    message: `Route ${request.method} ${request.url} not found. You can find the available routes in the README on github or via GET /.`
  })
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}