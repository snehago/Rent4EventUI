import axios from "axios";
import { of } from "await-of";

class AnalyticsService {
  BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

  public async getAllBookingsHost(id: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/analytics/allBooking/${id}`)
    );
    if (error) {
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data;
      } else throw Error(response.data.message);
    }
  }

  public async getNoOfAttendees(id: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/analytics/attendees/${id}`)
    );
    if (error) {
      
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data;
      } else throw Error(response.data.message);
    }
  }

  public async getNoOfBookingsForVenue(venueId: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/analytics/booking/${venueId}`)
    );
    if (error) {
      
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data;
      } else throw Error(response.data.message);
    }
  }

  public async getEarningsForVenue(venueId: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/analytics/earning/${venueId}`)
    );
    if (error) {
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data;
      } else throw Error(response.data.message);
    }
  }

  public async getEarningsForAllVenue(userId: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/analytics/earning/All/${userId}`)
    );
    if (error) {
      throw Error("Something went wrong");
    }
    if (response) {
      if (response.status >= 200 && response.status <= 210) {
        return response.data;
      } else throw Error(response.data.message);
    }
  }

  public async getTotalEarningOfHost(userId: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/analytics/earning/total/${userId}`)
    );
    if (error) {
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
