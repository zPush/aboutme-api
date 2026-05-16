import type { FastifyInstance } from "fastify"

const aboutMe = {
    name: "Jonas Schmeißer",
    age: Math.floor((Date.now() - new Date("2005-01-08").getTime()) / (1000 * 60 * 60 * 24 * 365.25)),
    githubUsername: "zPush",
    githubProfileUrl: "https://github.com/zPush",
    skills: ["TypeScript", "React", "React Native", "Fastify", "PostgreSQL", "Docker", "NextJS", "Visual Studio Code", "Git"]
}

const toolsAndTechStack = {
    items: [
        {
            name: "TypeScript",
            description: "Fell in love with Typescript for its syntax and type safety, which helps catch errors early and improves code quality.",
            url: "https://www.typescriptlang.org/",
        },
        {
            name: "Claude Code",
            description: "After trying multiple AI coding assistants, I found Claude Code to be the most intelligent and helpful. Other agents just dont feel the way Claude does, and it has become an indispensable part of my workflow for coding and problem-solving.",
            url: "https://claude.ai/"
        },
        {
            name: "Yaak",
            description: "Quickly became my go-to tool for building APIs and web applications, thanks to its simplicity and powerful features like creating spaces for each project or importing OpenAPI specifications.",
            url: "https://yaak.app/"
        },
        {
            name: "Visual Studio Code",
            description: "Tried the AI-enhanced forks (Cursor, Antigravity) and IntelliJ — ended up back where they all started: VSCode just has the ecosystem and reliability none of them fully replicate.",
            url: "https://code.visualstudio.com/"
        },
        {
            name: "Git / GitHub",
            description: "Obviously an essential, i don't think i need to explain why.",
            url: ["https://git-scm.com/", "https://github.com/"]
        },
        {
            name: "Docker",
            description: "Makes it so easy to spin up an instance of a service i need, so also a must have.",
            url: "https://www.docker.com/"
        },
        {
            name: "Termius",
            description: "My go-to SSH client for managing servers and remote connections.",
            url: "https://termius.com/"
        },
        {
            name: "HTTP Toolkit and Proxyman",
            description: "My favorite tools for intercepting and debugging HTTP traffic, making it easier to troubleshoot. Also loving the possibility to analyze Mobile app traffic.",
            url: ["https://httptoolkit.tech/", "https://proxyman.io/"]
        },
    ],
    "others": "I also have experience with Java, but not as much as with TypeScript."
}

const projects = {
    items: [
        {
            name: "API Resume",
            description: "An API that serves my resume and personal information, built with Fastify and TypeScript, and deployed on a self-hosted server. It provides endpoints for about me, skills, projects, tools, experience, interests and health check.",
            url: "https://github.com/zPush/aboutme-api",
        },
        {
            name: "Personal Website",
            description: "My company website to showcase what i have to offer and how i work.",
            url: "https://tordalk.net",
        },
        {
            name: "Newsent",
            description: "A mobile news app built with React Native, PostgreSQL and DragonflyDB — using AI to personalize and rank content per user.",
            url: "https://newsent.app"
        },
        {
            name: "Undisclosed Client Project",
            description: "Projects for clients that i can't disclose, but they involve building web applications with Next.js and self hosted CMS.",
            url: "https://tordalk.net/projekte"
        }
    ],
}

const experience = {
    items: [
        {
            company: "Tordalk",
            role: "Founder & Full Stack Developer",
            duration: "2025 - Present",
            description: "Founded Tordalk, a company focused on delivering high-quality web solutions. As an aspiring full stack developer, I handle everything from frontend design to backend development and deployment on a server."
        },
        {
            company: "Student",
            role: "Business Informatics Student",
            duration: "Late 2024 - 2028",
            description: "Currently pursuing a degree in Business Informatics, where I am gaining a strong foundation in both business and technology. This education is helping me to better understand how to create solutions that meet the needs of businesses while leveraging the latest technologies."
        }
    ]
}

const interests = {
    items: [
        {
            name: "Beyond Frontend",
            description: "Building lightweight applications is what I enjoy most right now — frontend and APIs have become my main focus, but I have no intention of staying there forever. I want to go deeper into backend engineering, explore Go as my next language, and eventually get into fields like automation and machine learning."
        },
        {
            name: "Cyber Security",
            description: "I have a growing interest in security — particularly API and web pentesting, understanding attack surfaces, and how encryption works under the hood. Tools like HTTP Toolkit and Proxyman already play into this curiosity, and I want to explore it further."
        }
    ]
}

export default async function aboutRoutes(fastify: FastifyInstance) {

    fastify.get("/about", async (_request, reply) => {
        return reply.status(200).send(aboutMe)
    })

    fastify.get("/skills", async (_request, reply) => {
        return reply.status(200).send({ skills: aboutMe.skills })
    })

    fastify.get("/projects", async (_request, reply) => {
        const items = await Promise.all(
        projects.items.map(async (p) => ({
            ...p,
            status: await pingSite(p.url)
        }))
    )
        return reply.status(200).send({ items })
    })

    fastify.get("/tools", async (_request, reply) => {
        return reply.status(200).send(toolsAndTechStack)
    })

    fastify.get("/experience", async (_request, reply) => {
        return reply.status(200).send(experience)
    })

    fastify.get("/interests", async (_request, reply) => {
        return reply.status(200).send(interests)
    })

    fastify.get("/health", async (_request, reply) => {
        return reply.status(200).send({ status: "ok" })
    })

    fastify.get("/resume", async (_request, reply) => {
        const projectItems = await Promise.all(
            projects.items.map(async (p) => ({
                ...p,
                status: await pingSite(p.url)
            }))
        )
        return reply.status(200).send({
            ...aboutMe,
            experience: experience.items,
            projects: projectItems,
            tools: toolsAndTechStack.items,
            interests: interests.items
        })
    })
}


// Helper functions
async function pingSite(url: string): Promise<number> {
    try {
        const response = await fetch(url)
        return response.status
    } catch (error) {
        console.error(`Error pinging ${url}:`, error + ". Site may be down or unreachable.")
        return 500
    }
}