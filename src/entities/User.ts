import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "text" })
  name!: string;

  @Field(() => String)
  @Property({ type: "date" })
  dateCreated = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
