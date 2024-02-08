import { config } from "dotenv";
config();

import fastify from "fastify";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import fastifyCookie from "@fastify/cookie";
import { env } from "node:process";
import websocket from "@fastify/websocket";
import { pollResults } from "./webSockets/poll-results";

const app = fastify();

console.log(env.COOKIE_SECRET);
app.register(fastifyCookie, {
  secret: env.COOKIE_SECRET,
  hook: "onRequest",
});

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen({ port: 3333 }).then(() => {
  console.log("Server listening on port 3000");
});
