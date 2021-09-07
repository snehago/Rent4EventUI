import { Address } from "./Address";
import { Booking } from "./Booking";
import { EventType } from "./EventType";
import { Facility } from "./Facitlity";
import { Feedback } from "./Feedback";
import { Offer } from "./Offer";
import { User } from "./User";

export interface Venue {
  id: number;
  capacity: number;
  price: number;
  bookingAmount: number;
  description: String;
  title: String;
  promoted?: Boolean;
  host: User;
  address: Address;
  offer?: Offer;
  listOfFeedbacks?: Feedback[];
  listOfEventTypes: EventType[];
  bookings: Booking[];
  listOfFacilities: Facility[];
}
