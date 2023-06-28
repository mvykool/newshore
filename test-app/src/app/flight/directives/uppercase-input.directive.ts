import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.toUpperCase();

    if ( initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}