import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CurrencyService } from '../../../services/currency.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('dropdown', { static: false })
  dropdown!: ElementRef;

  dropdownOpen = false;
  selectedImg = 'assets/images/usa.png';
  selectedOption: string = 'USD';
  options = [
    {name: 'USD', image: 'assets/images/usa.png'},
    {name: 'COP', image: 'assets/images/col.png'},
    {name: 'EUR', image: 'assets/images/eur.png'},
  ];

  constructor(private currencyService: CurrencyService, private router: Router) {} 

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  titleClick(){
    this.router.navigate(['/home']);
  }

  selectOption(option: any) {
    this.selectedOption = option.name;
    this.selectedImg = option.image;
    this.currencyService.setCurrency(option.name);
    this.dropdownOpen = false; 
    this.convertCurrencyTo(option.name); 
}

  convertCurrencyTo(currency: string) {
    if (currency !== 'USD') {
      this.currencyService.convertCurrency('USD', currency)
        .subscribe(rate => {
          console.log(`The conversion rate from USD to ${currency} is ${rate}`);
        });
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    if(!this.dropdown.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
