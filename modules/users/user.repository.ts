import { db } from "@/db";
import { users } from "../../db/schema/user.schema";
import { eq, or } from "drizzle-orm";
import { CreateUserInput } from "./user.validator";

export class UserRepository {
  private readonly model: typeof users
  
  constructor (){
    this.model = users
  }

  async createUser(data: CreateUserInput) {
    const [result] = await db.insert(this.model).values(data).returning();
    return result;
  }

  async getUserById(id: string) {
    return await db.select().from(this.model).where(eq(users.id, id)).limit(1);
  }

  async getUserByEmail(email: string) {
    return await db.select().from(this.model).where(eq(users.email, email)).limit(1);
  }

  async checkUserCredentialsExist(phone: string,email: string) {
    if (!phone && !email) {
      throw new Error("At least phone or email must be provided");
    }
    const usersResult = await db.select().from(this.model).where(or(eq(users.phone, phone),eq(users.email, email)));
    console.log("usersResult",usersResult)
    return usersResult ?? null
  };

  async listUsers() {
    return await db.select().from(this.model);
  }

  async updateUser(id: string, data: Partial<typeof users.$inferInsert>) {
    const [result] = await db
      .update(this.model)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return result;
  }

  async deleteUser(id: string) {
    await db.delete(this.model).where(eq(users.id, id));
    return { success: true };
  }
}
