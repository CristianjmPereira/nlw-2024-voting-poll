import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function createPoll(app: FastifyInstance) {
  app.post("/polls", async (request, response) => {
    const { body } = request;

    const createPollBody = z.object({
      title: z.string(),
      options: z.array(z.string()),
    });

    const { title, options } = createPollBody.parse(body);

    const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            skipDuplicates: true,
            data: options.map((option) => ({
              title: option,
            })),
          },
        },
      },
    });

    console.log(title, options);

    response.status(201).send({ pollId: poll.id });
  });
}
