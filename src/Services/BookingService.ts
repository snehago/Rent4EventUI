import axios from "axios";
import { SharedService } from "./SharedService";
import { of } from "await-of";
import { Booking } from "../Shared/Interfaces/Booking";
const sharedService = new SharedService();
class BookingService {
  BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

  public async addBooking(booking: Booking) {
    const [response, error] = await of(
      axios.post(
        `${this.BACKEND_URL}/booking/`,
        booking,
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

  public async checkAvaibility(bookingDates: any) {
    const [response, error] = await of(
      axios.post(
        `${this.BACKEND_URL}/booking/validate`,
        bookingDates,
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

  public async getBookingByVenueId(id: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/booking/venue/${id}`)
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

  public async getBookingByUserId(id: number) {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/booking/client/${id}`)
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

  public async getAllBookings() {
    const [response, error] = await of(
      axios.get(`${this.BACKEND_URL}/booking`)
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

  public async cancelBookingFromHost(booking: any, reason:any) {
    const [response, error] = await of(
      axios.delete(`${this.BACKEND_URL}/booking/deleteFromHost?message=${reason}`, {
        headers: await sharedService.getHeader(),
        data: booking,
      })
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
  public async cancelBookingFromClient(booking: any) {
    const [response, error] = await of(
      axios.delete(
        `${this.BACKEND_URL}/booking/deleteFromClient?message="cancel"`,
        {
          headers: await sharedService.getHeader(),
          data: booking,
        }
      )
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

export { BookingService };
