import { BookingKey } from "./BookingKey";
import { User } from "./User";
import { Venue } from "./Venue";

export interface Booking{
    user: User;
    venue: Venue;
    bookingDateAndTime: Date;
    amountPaid: number;
    transactionId: String;
    numberOfAttendees: number;
    status: String;
    bookingKey: BookingKey;
}