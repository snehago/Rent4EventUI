import axios from "axios";
import { LoginData } from "../Shared/Interfaces/LoginData";
import { User } from "../Shared/Interfaces/User";
import { SharedService } from "./SharedService";
const sharedService = new SharedService();
class UserService {
  BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

  public async signup(user: User) {
    return axios.post(
      `${this.BACKEND_URL}/user`,
      user,
      await sharedService.getHeader()
    );
  }

  public async login(user: LoginData) {
    return axios.post(
      `${this.BACKEND_URL}/user/login`,
      user,
      await sharedService.getHeader()
    );
  }
}

export { UserService };
