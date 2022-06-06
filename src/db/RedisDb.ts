import Redis from "ioredis";

const PORT = Number(process.env.REDIS_PORT);
const HOST = process.env.REDIS_HOST;
const client = new Redis(PORT, HOST);
const subscriber = new Redis(PORT, HOST);

const opts = {
  createClient(type: string) {
    switch (type) {
      case "client":
        return client;
      case "subscriber":
        return subscriber;
      default:
        return new Redis(PORT, HOST);
    }
  },
};

export default opts;
