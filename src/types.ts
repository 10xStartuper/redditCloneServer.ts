import { EntityManager, Connection, IDatabaseDriver } from "@mikro-orm/core";
type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
};
export { MyContext };
