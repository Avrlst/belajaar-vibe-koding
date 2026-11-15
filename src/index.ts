import { Elysia } from "elysia";
import { userRoutes } from "./routes/users";

const port = Number(process.env.PORT) || 3000;

export const app = new Elysia()
  // Health check / root endpoint
  .get("/", () => ({
    status: "ok",
    message: "Server is running with Elysia + Drizzle + Bun",
    timestamp: new Date().toISOString(),
  }))
  // Modular routes
  .use(userRoutes)
  .listen(port);

console.log(
  `🦊 Elysia server is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
