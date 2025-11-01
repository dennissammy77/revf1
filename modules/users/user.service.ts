import { UserRepository } from "./user.repository";
import { users } from "../../db/schema";
import { CreateUserInput } from "./user.validator";

export class UserService {
  private repo: UserRepository;

  constructor() {
    this.repo = new UserRepository();
  }

  async registerUser(data: CreateUserInput) {
    console.log("registerUserData",data);

    const existing = await this.repo.checkUserCredentialsExist(data.email,data.phone);
    if (existing?.length > 0) {
      throw new Error("User with this credentials already exists");
    }

    return await this.repo.createUser(data);
  }

  async getUserById(id: string) {
    const user = await this.repo.getUserById(id);
    if (!user?.length) throw new Error("User not found");
    return user[0];
  }

  async listUsers() {
    return await this.repo.listUsers();
  }

  async updateUser(id: string, data: Partial<typeof users.$inferInsert>) {
    return await this.repo.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return await this.repo.deleteUser(id);
  }
}
