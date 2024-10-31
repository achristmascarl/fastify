import { FastifyInstance, FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get("/", async (request, reply) => {
    const response = {
      message: "Welcome to Fastify Hello World API on Railway",
      timestamp: new Date().toISOString(),
    };

    return response;
  });

  fastify.get("/wekday", async (request, reply) => {
    const dateQuery: string | undefined = (request.query as any).date;
    if (!dateQuery) {
      return reply
        .code(400)
        .send({ error: "Date query parameter is required" });
    }
    const date = new Date(dateQuery);
    if (date.toString() === "Invalid Date") {
      return reply.code(400).send({ error: "Invalid date format" });
    }
    console.log(date);
    const weekdayIndex = date.getDay();
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = weekdays[weekdayIndex];
    return reply.code(200).send({ weekday });
  });
};

export default root;

