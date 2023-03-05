import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css']
})
export class InputComponentComponent {

  @Input() label!: string;
  @Input() bgColor= 'white'

}
