import axios from "axios";
import { SharedService } from "./SharedService";
import { of } from "await-of";
import { Facility } from "../Shared/Interfaces/Facitlity";
const sharedService = new SharedService();
class FacilityService{
  BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

  public async addFacility(facility: Facility) {
    const [response, error] = await of(axios.post(
      `${this.BACKEND_URL}/admin/facility`,
      facility,
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

  public async getFacilityId(id: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/admin/facility/${id}`)
    );
    if (error) {
      console.log(error);
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }

  public async getAllFacility() {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/facility`)
    );
    if (error) {
      console.log(error);
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }

  public async deleteFacility(id: number) {
    const [response, error] = await of(
      axios.delete(`${this.BACKEND_URL}/facility/${id}`)
    );
    if (error) {
      console.log(error);
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }
}

export { FacilityService };