import axios from "axios";
import { SharedService } from "./SharedService";
import { of } from "await-of";
const sharedService = new SharedService();
class EventTypeService {
  BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

  public async addEventType(eventType:any) {
    const [response, error] = await of(
      axios.post(
        `${this.BACKEND_URL}/admin/event`,
        eventType,
        await sharedService.getHeader()
      )
    );
    if (error) {
      throw new Error(error.message);
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }

  public async getEventTypeId(id: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/admin/event/${id}`)
    );
    if (error) {
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }

  public async getAllEventType() {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/admin/event`)
    );
    if (error) {
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data;
      } else throw Error(response.data);
    }
  }

  public async getAllServices() {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/services`)
    );
    if (error) {

      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {

        return response.data;
      } else throw Error(response.data);
    }
  }

  public async deleteEventType(id: number) {
    const [response, error] = await of(
      axios.delete(`${this.BACKEND_URL}/event/${id}`)
    );
    if (error) {
      
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }
}

export { EventTypeService };