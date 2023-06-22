export interface PaymentModule{
  paymentId: number,
  paymentTime: Date,
  paymentMethod: string,
  totalPrice: number,
  paymentStatus: boolean,
  flightBookingId: number
}
