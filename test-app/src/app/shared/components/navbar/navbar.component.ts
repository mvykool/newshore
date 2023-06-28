import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('dropdown', { static: false })
  dropdown!: ElementRef;

  dropdownOpen = false;
  selectedImg = '../../../../assets/images/usa.png';
  selectedOption: string = 'USD';
  options = [
    {name: 'USD', image: '../../../../assets/images/usa.png'},
    {name: 'COP', image: '../../../../assets/images/col.png'},
    {name: 'EUR', image: '../../../../assets/images/eur.png'},
  ];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: any) {
    this.selectedOption = option.name;
    this.selectedImg = option.image;
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    if(!this.dropdown.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

}
