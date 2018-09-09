import { Component, Input} from '@angular/core';

@Component({
  selector: 'zjs-notice',
  template: `
    <div id="zjs-notice" class="z-fmt-alts" [ngSwitch]="alertType">
      <div class="alert alert-success alert-dismissible" *ngSwitchCase="'success'">
        <strong class="fl alt-tt">{{'success' | translate}}</strong> {{alertMsg}}
      </div>
      <div class="alert alert-warning alert-dismissible" *ngSwitchCase="'warning'">
        <strong class="fl alt-tt">{{'warning' | translate}}</strong> {{alertMsg}}
      </div>
      <div class="alert alert-danger alert-dismissible" *ngSwitchCase="'danger'">
        <strong class="fl alt-tt">{{'error' | translate}}</strong> {{alertMsg}}
      </div>
      <div class="alert alert-info alert-dismissible" *ngSwitchDefault>
        <strong class="fl alt-tt">{{'welecome'| translate}}</strong>
        <div class="z-greetings"><div id="z-greeting">{{greeting}}</div></div>
      </div>
    </div>`,
  styleUrls: ['./zjs-attachments.less']
})
export class ZjsNoticeComponent {
  @Input() alertType: string;
  @Input() alertMsg: string;
  @Input() greeting: string;
  constructor() { }
}
