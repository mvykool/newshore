export class Flight {
  departureStation: string;
  arrivalStation: string;
  flightCarrier: string;
  flightNumber: string;
  price: number;

  constructor(
    DepartureStation: string,
    ArrivalStation: string,
    FlightCarrier: string,
    FlightNumber: string,
    Price: number
  ) {
    this.departureStation = DepartureStation;
    this.arrivalStation = ArrivalStation;
    this.flightCarrier = FlightCarrier;
    this.flightNumber = FlightNumber;
    this.price = Price;
  }
}