# about_api

A personal resume API built with Fastify and TypeScript. Returns structured data about me, my projects, tools, experience, and interests.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | List all available routes |
| GET | `/resume` | Full resume in one response |
| GET | `/about` | Name, age, GitHub |
| GET | `/skills` | Tech skills array |
| GET | `/projects` | Projects with live status ping |
| GET | `/tools` | Tools and tech stack |
| GET | `/experience` | Work and education |
| GET | `/interests` | What I'm exploring |
| GET | `/health` | Health check |

## Run locally

```bash
npm install
npm run api
```

Server runs on `http://localhost:3000`.

## Stack

- [Fastify](https://fastify.dev/) — web framework
- [TypeScript](https://www.typescriptlang.org/) — language
- [@fastify/cors](https://github.com/fastify/fastify-cors) — CORS headers
- [@fastify/rate-limit](https://github.com/fastify/fastify-rate-limit) — 100 requests/minute per IP
