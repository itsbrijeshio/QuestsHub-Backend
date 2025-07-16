import { asyncHandler } from "../middlewares";
import { UserService } from "../services";
import { response, signCookie } from "../utils";
import { AuthRequest } from "../types/error.type";

class AuthController extends UserService {
  constructor() {
    super();
  }

  handleRegister = asyncHandler(async (req, res) => {
    const user = await this.register(req.body);
    response(res, 201, { user });
  });

  handleLogin = asyncHandler(async (req, res) => {
    const user = await this.login(req.body);
    const accessToken = signCookie(res, user);
    response(res, 200, null, { accessToken });
  });

  handleGetMe = asyncHandler(async (req: AuthRequest, res) => {
    const { _id } = req.auth;
    console.log(_id)
    const user = await this.getMe(_id);
    response(res, 200, { user });
  });
}

export default AuthController;
