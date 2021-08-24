import axios from "axios";
import { LoginData } from "../Shared/Interfaces/LoginData";
import { User } from "../Shared/Interfaces/User";
import { SharedService } from "./SharedService";
import {of} from 'await-of';
const sharedService = new SharedService();
class UserService {
  BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

  public async signup(user: User) {
    const [response, error] = await of(axios.post(
      `${this.BACKEND_URL}/user`,
      user,
      await sharedService.getHeader()
    ));
    if(error) {
      throw new Error(error.message);
    } 
    if(response) {
      console.log({response});
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }

  public async login(user: LoginData) {
    const [response,error]= await of(axios.post(
      `${this.BACKEND_URL}/user/login`,
      user,
      await sharedService.getHeader()
    ));
    if(error) {
      console.log(error);
      throw Error("Something went wrong");
    }
    if(response) {
      if(response.status>=200 && response.status<=210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }
}


export { UserService };
