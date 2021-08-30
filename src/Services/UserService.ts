import axios from "axios";
import { LoginData } from "../Shared/Interfaces/LoginData";
import { User } from "../Shared/Interfaces/User";
import { SharedService } from "./SharedService";
import { of } from "await-of";
const sharedService = new SharedService();
class UserService {
  BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

  public async signup(user: User) {
    const [response, error] = await of(
      axios.post(
        `${this.BACKEND_URL}/user`,
        user,
        await sharedService.getHeader()
      )
    );
    if (error) {
      throw new Error("Email already registered!");
    }
    if (response) {
      console.log({ response });
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }

  public async login(user: LoginData) {
    const [response, error] = await of(
      axios.post(
        `${this.BACKEND_URL}/user/login`,
        user,
        await sharedService.getHeader()
      )
    );
    if (error) {
      throw Error("Invalid username or password!");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }

  public async getHostById(id:number) {
    const [response, error] = await of(
      axios.get(
        `${this.BACKEND_URL}/user/host/${id}`,
        await sharedService.getHeader()
      )
    );
    if (error) {
      throw Error("Invalid User id");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data;
      } else throw Error(response.data.message);
    }
  }
  public async editHostProfile(user: any) {
    var [response, error] = await of(
      axios.put(
        `${this.BACKEND_URL}/user/host/${user.id}`,
        user,
        await sharedService.getHeader()
      )
    );
    if (error) {
      console.log(error);
      throw Error(error.message);
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }
  public async editClientProfile(user: any) {
    var [response, error] = await of(
      axios.put(
        `${this.BACKEND_URL}/user/client/${user.id}`,
        user,
        await sharedService.getHeader()
      )
    );
    if (error) {
      console.log(error);
      throw Error(error.message);
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }
}

export { UserService };
