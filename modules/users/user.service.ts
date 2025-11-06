import { UserRepository } from "./user.repository";
import { users } from "../../db/schema/user.schema";
import { CreateUserInput } from "./user.validator";
import { AuthService } from "../auth/auth.service";

export class UserService {
  private repo: UserRepository;
  private readonly authService: AuthService;

  constructor() {
    this.repo = new UserRepository();
    this.authService = new AuthService()
  }

  async registerUser(data: CreateUserInput) {
    const existing = await this.repo.checkUserCredentialsExist(data.phone,data.email);
    if (existing?.length > 0) {
      throw new Error("User with this credentials already exists");
    }
    const hashedPassword = await this.authService.encryptString(data.password);
    const user = await this.repo.createUser({ ...data, name: data.name ?? "", password: hashedPassword });
    const token = await this.authService.generateJwtToken(user)
    return {user, token}
  }

  async registerStaffUser(data: CreateUserInput) {
    const existing = await this.repo.checkUserCredentialsExist(data.phone,data.email);
    if (existing?.length > 0) {
      throw new Error("User with this credentials already exists");
    }
    const hashedPassword = await this.authService.encryptString(data.password);
    const user = await this.repo.createUser({ ...(data as any), name: data.name ?? "", role: 'staff', password: hashedPassword } as any);
    const token = await this.authService.generateJwtToken(user)
    return {user, token}
  }

  async loginUser(email: string, password: string) {
    const users = await this.repo.getUserByEmail(email);
    const user = users?.[0];
    if (!user) throw new Error("No account with details exists");

    const isMatch = await this.authService.compareStrings(user.password,password)
    if (!isMatch) throw new Error("Invalid credentials");

    const token = await this.authService.generateJwtToken(user)
    return { user, token };
  }

  async getUserById(id: string) {
    const user = await this.repo.getUserById(id);
    if (!user?.length) throw new Error("User not found");
    return user[0];
  }

  async listUsers() {
    return await this.repo.listUsers();
  }

  async listUsersByRole(role: string, query?: string) {
    if (query && query.trim().length > 0) {
      return await this.repo.searchUsersByRole(role, query.trim());
    }
    return await this.repo.listUsersByRole(role);
  }

  async updateUser(id: string, data: Partial<typeof users.$inferInsert>) {
    return await this.repo.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return await this.repo.deleteUser(id);
  }
}
