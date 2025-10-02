import { ProjectType } from "@lib/types";

export const projects: ProjectType[] = [
  {
    id: "1",
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce solution built with Spring Boot and React",
    githubURL: "https://github.com/yourusername/ecommerce",
    previewURL: "https://ecommerce-demo.com",
    tools: ["Java", "Spring Boot", "React", "PostgreSQL"],
    pinned: true,
    coverImage: "/projects/ecommerce.png",
  },
  {
    id: "2",
    name: "Microservices API",
    description: "RESTful API with microservices architecture",
    githubURL: "https://github.com/yourusername/api",
    previewURL: "https://api-demo.com",
    tools: ["Java", "Spring Cloud", "Docker", "Kubernetes"],
    pinned: true,
    coverImage: "/projects/api.png",
  },
  // Add more projects here
];
