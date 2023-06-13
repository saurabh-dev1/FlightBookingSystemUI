export interface BookingModule{
  flightBookingId: number;
  departureCity: string;
  arrivalCity: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  flightId: number;
  userId: number;
}
