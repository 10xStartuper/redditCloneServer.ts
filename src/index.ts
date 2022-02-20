import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver, PostResolver, UserResolver } from "./resolvers/";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__ } from "./constants";
import { MyContext } from "./types";

const main = async (): Promise<void> => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const app = express();

  // const RedisStore = connectRedis(session);
  // const redisClient = redis.createClient();
  // app.use(
  //   session({
  //     name: "qid",
  //     store: new RedisStore({
  //       client: redisClient,
  //       disableTouch: true,
  //     }),
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  //       httpOnly: true,
  //       secure: __prod__,
  //       sameSite: "lax",
  //     },
  //     saveUninitialized: false,
  //     secret: "Somthing cool",
  //     resave: false,
  //   })
  // );

  console.log("\n\n------------ Apollo Start -----------------\n\n");

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });
  await apolloServer.start();
  await apolloServer.applyMiddleware({ app });
  app.listen(8080, () => console.log("Server listening on port 8080"));
};

main().catch((err) => {
  console.log(err);
});
