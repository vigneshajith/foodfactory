import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
const VALIDATORS_MESSAGES: any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength: 'Field is too short',
  notMatch:'Password and Confirm does not match'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent  implements OnInit, OnChanges{
  @Input() control!: AbstractControl;
  @Input() showError = true;
  errorMessages: string[] = [];

  ngOnInit():void{
    this.control.statusChanges.subscribe(() => {
      this.checkValidation()
    })
    this.control.valueChanges.subscribe(() => {
      this.checkValidation()
    })
  }
  ngOnChanges(): void {
    this.checkValidation()
  }

  checkValidation(): void{
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }
}
