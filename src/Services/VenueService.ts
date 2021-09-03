import axios, { AxiosRequestConfig } from "axios";
import { SharedService } from "./SharedService";
import { of } from "await-of";
import { Venue } from "../Shared/Interfaces/Venue";
const { cors } = require("cors");
const sharedService = new SharedService();
class VenueService {
  BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

  public async addVenue(venue: Venue) {
    const [response, error] = await of(
      axios.post(
        `${this.BACKEND_URL}/venue`,
        venue,
        await sharedService.getHeader()
      )
    );
    if (error) {
      throw new Error(error.message);
    }
    if (response) {
      console.log({ response });
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }

  public async uploadVenuePictures(data: any) {
    const [response, error] = await of(
      axios.post(`${this.BACKEND_URL}/gcp/venue/upload/`, data)
    );
    if (error) {
      throw new Error(error.message);
    }
    if (response) {
      console.log({ response });
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }
  public async getVenuePictures(venueId: any, hostId: any) {
    const [response, error] = await of(
      axios.get(
        `${this.BACKEND_URL}/gcp/venue/?hostId=${hostId}&venueId=${venueId}`
      )
    );
    if (error) {
      throw new Error(error.message);
    }
    if (response) {
      console.log({ response });
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }
  public async getVenueByVenueId(id: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/venue/${id}`)
    );
    if (error) {
      console.log(error);
      throw Error("Something went wrong");
    }
    if (response) {
      console.log(response);
      if (response.status >= 200 && response.status <= 210) {
        return response.data;
      } else throw Error(response.data.message);
    }
  }

  public async getVenueByUserId(id: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/venue/user/${id}`)
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

  public async getPromotedVenues() {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/venue/promotional?page=0&limit=10`)
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

  public async getPopularVenues() {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/venue/popular`)
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
  public async getAllVenues(page: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/venue?page=${page}&limit=9`)
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

  public async deleteVenue(id: number) {
    const [response, error] = await of(
      axios.delete(`${this.BACKEND_URL}/venue/${id}`)
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

  public async addVenueToWishlist(venue: any) {
    const [response, error] = await of(
      axios.post(
        `${this.BACKEND_URL}/wishlist/`,
        venue,
        await sharedService.getHeader()
      )
    );
    if (error) {
      throw new Error(error.message);
    }
    if (response) {
      console.log("wishlist done");
      console.log({ response });
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }

  public async removeVenueToWishlist(venue: any) {
    var config = {
      method: "delete",
      url: "http://localhost:8080/wishlist/",
      headers: {
        "Content-Type": "application/json",
      },
      data: venue,
    };
    const [response, error] = await of(axios(config as AxiosRequestConfig));
    if (error) {
      throw new Error(error.message);
    }
    if (response) {
      console.log("wishlist item removed");
      console.log({ response });
      if (response.status >= 200 && response.status <= 210) {
        return response.data.response;
      } else throw Error(response.data.message);
    }
  }
}

export { VenueService };
