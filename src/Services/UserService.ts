import axios from "axios";
import { User } from "../Shared/Interfaces/User";
import { SharedService } from "./SharedService";
const sharedService = new SharedService();
class UserService {
  BACKEND_URL: string | undefined = process.env.BACKEND_URL;

  public async signup(user: User) {
    return axios.post(
      `${this.BACKEND_URL}`,
      user,
      await sharedService.getHeader()
    );
  }

  public async login(user: User) {
    return axios.post(
      `${this.BACKEND_URL}/login`,
      user,
      await sharedService.getHeader()
    );
  }
}

export { UserService };
