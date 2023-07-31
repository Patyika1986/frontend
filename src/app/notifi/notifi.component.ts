import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notifi',
  templateUrl: './notifi.component.html',
  styleUrls: ['./notifi.component.scss']
})
export class NotifiComponent {

  @Input({required:true}) updateSuccess: boolean = false;
  @Input({required:true}) updateText: string = '';

}
