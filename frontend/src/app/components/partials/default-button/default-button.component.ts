import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css']
})
export class DefaultButtonComponent {
  @Input() text: string ='Click'
  @Input() bgColor = 'blue';
  @Input() color = 'white';
  @Input() type: 'button' | 'submit'  = 'submit';
  @Input() fontSize = 1;
  @Input() width = " "
  @Input() padding = ".5em .75em"
  @Input() margin = ".5rem auto"
  @Output() OnClick = new EventEmitter();
}
