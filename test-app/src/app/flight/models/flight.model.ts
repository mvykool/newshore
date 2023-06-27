export class Flight {
  DepartureStation: string;
  ArrivalStation: string;
  FlightCarrier: string;
  FlightNumber: string;
  Price: number;

  constructor(
    DepartureStation: string,
    ArrivalStation: string,
    FlightCarrier: string,
    FlightNumber: string,
    Price: number
  ) {
    this.DepartureStation = DepartureStation;
    this.ArrivalStation = ArrivalStation;
    this.FlightCarrier = FlightCarrier;
    this.FlightNumber = FlightNumber;
    this.Price = Price;
  }
}