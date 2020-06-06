import { Application } from "https://deno.land/x/oak/mod.ts";

import router from "./routes/index.ts";

const app = new Application();

const port = 8998;

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on port 8998");

await app.listen({ port });
