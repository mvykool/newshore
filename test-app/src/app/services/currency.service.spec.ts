import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
let service: CurrencyService;
let httpMock: HttpTestingController;

beforeEach(() => {
	TestBed.configureTestingModule({
	imports: [HttpClientTestingModule],
	providers: [CurrencyService]
	});

	service = TestBed.inject(CurrencyService);
	httpMock = TestBed.inject(HttpTestingController);
});

afterEach(() => {
	httpMock.verify(); 
});

it('should be created', () => {
	expect(service).toBeTruthy();
});

it('should set and get the selected currency', () => {
	service.setCurrency('EUR');
	expect(service.getCurrency()).toEqual('EUR');
});

it('should convert currency', () => {
	const mockRate = { rates: { 'USD': { rate: '1.23' } } };

	service.convertCurrency('EUR', 'USD').subscribe((rate: number) => {
	expect(rate).toEqual(1.23);// Update the expectation to 1 for USD conversion
	});
	
	const req = httpMock.expectOne('https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=EUR&to=USD&amount=1');
	expect(req.request.method).toEqual('GET');
	req.flush(mockRate);
});
});