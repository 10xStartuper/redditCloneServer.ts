import { EntityManager, Connection, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";
import { Session } from "express-session";
type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session?: Session & { userId?: number } };
  res: Response;
};
export { MyContext };
