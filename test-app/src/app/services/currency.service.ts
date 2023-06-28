import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { Rate } from '../models/rate.model';
import { environment } from '../../environments/environment';

@Injectable({
providedIn: 'root'
})
export class CurrencyService {
private _selectedCurrency = new BehaviorSubject<string>('USD'); 
selectedCurrency$ = this._selectedCurrency.asObservable();

constructor(private http: HttpClient) { }

setCurrency(currency: string) {
	this._selectedCurrency.next(currency);
}

getCurrency(): string {
	return this._selectedCurrency.getValue();
}

	convertCurrency(from: string, to: string): Observable<number>  {
	const url = environment.apiUrl2;
	const headers = {
		'X-RapidAPI-Key': environment.apiKey,
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