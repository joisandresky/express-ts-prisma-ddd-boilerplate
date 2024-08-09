import { Redis } from "ioredis";

// will use default value with localhost:6379
// or use can use this one to set it up
//
// export const redis_client = new Redis({
//   port: 6379, // Redis port
//   host: "127.0.0.1", // Redis host
//   username: "default", // needs Redis >= 6
//   password: "my-top-secret",
//   db: 0, // Defaults to 0
// });

export const redis_client = new Redis();
