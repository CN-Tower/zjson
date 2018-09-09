import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'zjs-hist',
  template: `
    <span  class="z-ico-hd dropdown" dropdown>
      <i dropdownToggle class="fa fa-database z-op-icon dropdown-toggle" title="{{'saved' | translate}}"></i>
      <ul *dropdownMenu id="hist-ops" class="dropdown-menu">
        <li *ngIf="fmtHists.length==0">
          <a href="javascript:;">
            <i class="fa fa-exclamation-circle"></i>&nbsp;&nbsp;{{'noHist' | translate}}
          </a>
        </li>
        <li *ngFor="let hist of fmtHists">
          <a href="javascript:;" (click)="showOrRmFmtHist.emit($event, hist)">
            <i class="fa fa-trash z-op-icon"></i>&nbsp;&nbsp;{{hist.name}}
          </a>
        </li>
      </ul>
    </span>`
})
export class ZjsHistComponent {
  @Input() fmtHists: any[] = [];
  @Output() showOrRmFmtHist: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
