import index from "./index.html";

const port = Number(Bun.env.PORT ?? "3000");

const server = Bun.serve({
  port,
  routes: {
    "/": index,
    "/result": index,
    "/result/:payload": index,
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`French amortization graph available at http://localhost:${server.port}`);
