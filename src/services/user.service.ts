import argon2 from "argon2";
import { userModel } from "../models";
import { LoginProps, RegisterProps } from "../types/user.type";
import { ApiError } from "../utils";

class UserService {
  private userModel = userModel;

  private sanitize(user: any): any {
    const { password, __v, createdAt, updatedAt, ...sanitizedUser } =
      user?.toJSON();
    return sanitizedUser;
  }

  private async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  private async VerifyPassword(
    hashedPass: string,
    password: string
  ): Promise<boolean> {
    return await argon2.verify(hashedPass, password);
  }

  private async isEmailUnique(email: string): Promise<boolean> {
    const isUser = await this.userModel.findOne({ email });
    if (isUser) {
      throw new ApiError({
        type: "ConflictError",
        code: 409,
        message: "Email already exists",
      });
    }
    return !isUser;
  }

  public async register(user: RegisterProps): Promise<any> {
    await this.isEmailUnique(user.email);

    user.password = await this.hashPassword(user.password);
    const newUser = await this.userModel.create(user);
    return this.sanitize(newUser);
  }

  public async login(user: LoginProps): Promise<any> {
    const currentUser = await this.userModel.findOne({ email: user.email });

    if (
      !currentUser ||
      !(await this.VerifyPassword(
        currentUser.password as string,
        user.password
      ))
    ) {
      throw new ApiError({
        type: "NotFoundError",
        code: 404,
        message: "Invalid credentials",
      });
    }

    return this.sanitize(currentUser);
  }

  public async getMe(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId);
    if (!user || !user?._id) {
      throw new ApiError({
        type: "NotFoundError",
        code: 404,
        message: "User not found",
      });
    }

    return this.sanitize(user);
  }

  public async github(githubId: string, username: string): Promise<any> {
    const user = await this.userModel.findOne({ githubId });
    if (user) {
      return this.sanitize(user);
    }
    const newUser = await this.userModel.create({ githubId, username });
    return this.sanitize(newUser);
  }
}

export default UserService;
