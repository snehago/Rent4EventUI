import axios, { AxiosRequestConfig } from "axios";
import { SharedService } from "./SharedService";
import { of } from "await-of";
import { Venue } from "../Shared/Interfaces/Venue";
const sharedService = new SharedService();
class AnalyticsService {
  BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

  public async getAllBookingsHost(id: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/analytics/allBooking/${id}`)
    );
    if (error) {
      console.log(error);
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data;
      } else throw Error(response.data.message);
    }
  }
}

export { AnalyticsService };
