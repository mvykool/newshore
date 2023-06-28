import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    this.el.nativeElement.value = value.toUpperCase();
  }
}