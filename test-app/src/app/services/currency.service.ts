import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { Rate } from '../models/rate.model';

@Injectable({
providedIn: 'root'
})
export class CurrencyService {
private _selectedCurrency = new BehaviorSubject<string>('USD'); // set default value
selectedCurrency$ = this._selectedCurrency.asObservable();

constructor(private http: HttpClient) { }

setCurrency(currency: string) {
	this._selectedCurrency.next(currency);
}

getCurrency(): string {
	return this._selectedCurrency.getValue();
}

	convertCurrency(from: string, to: string): Observable<number>  {
	const url = 'https://currency-converter5.p.rapidapi.com/currency/convert';
	const headers = {
		'X-RapidAPI-Key': '8cdfbab5b0mshb1d20180d87119ep1ad4dcjsnd919c03de762',
		'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
	};
	const params = {
		format: 'json',
		from: from,
		to: to,
		amount: '1'
	};
	return this.http.get<Rate>(url, { headers, params })
		.pipe(map((response: { rates: { [x: string]: { rate: string; }; }; }) => parseFloat(response.rates[to].rate)));
	}
}