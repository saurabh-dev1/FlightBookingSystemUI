export interface BookingModule{
  flightBookingId: number;
  departureCity: string;
  arrivalCity: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  noOfPassenger: number;
  flightId: number;
  userId: number;
}
