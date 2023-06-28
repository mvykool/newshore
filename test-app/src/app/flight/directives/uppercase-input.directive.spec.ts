import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UppercaseInputDirective } from './uppercase-input.directive';

@Component({
template: '<input appUppercase>'
})
class TestComponent {}

describe('UppercaseInputDirective', () => {
let component: TestComponent;
let fixture: ComponentFixture<TestComponent>;
let inputEl: DebugElement;

beforeEach(() => {
	TestBed.configureTestingModule({
	declarations: [UppercaseInputDirective, TestComponent]
	});

	fixture = TestBed.createComponent(TestComponent);
	component = fixture.componentInstance;
	inputEl = fixture.debugElement.query(By.directive(UppercaseInputDirective));

	fixture.detectChanges();
});

it('should convert input value to uppercase', () => {
	const inputValue = 'Hello World';
	const expectedValue = 'HELLO WORLD';

	// Set the input value
	inputEl.nativeElement.value = inputValue;
	// Trigger the 'input' event
	inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });

	// Verify that the input value is converted to uppercase
	expect(inputEl.nativeElement.value).toEqual(expectedValue);
});
});