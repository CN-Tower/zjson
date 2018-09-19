import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../app.service';
import { SharedBroadcastService, FmtHist } from '../shared/index';

@Component({
  selector: 'zjs-compare',
  template: `
    <span class="z-sm-hide dropdown" #dropdown="bs-dropdown" (onShown)="onShown()" dropdown>
      <i dropdownToggle class="fa fa-{{icoClass}} z-op-icon dropdown-toggle" title="{{'jsonCompare' | translate}}"></i>
      <ul *dropdownMenu class="dropdown-menu dropdown-menu-right">
        <li><a href="javascript:;" (click)="showDiffChange.emit('src')">{{'cpWidthSrc' | translate}}</a></li>
        <li><a href="javascript:;" (click)="showDiffChange.emit('new')">{{'cpWidthNew' | translate}}</a></li>
        <li *ngFor="let hist of fmtHists">
          <a href="javascript:;" (click)="showDiffChange.emit(hist.name)">{{hist.name}}</a>
        </li>
      </ul>
  </span>`
})
export class ZjsCompareComponent implements OnInit {
  @ViewChild('dropdown') dropdown: any;
  @Input() formated: string;
  @Input() icoClass: string = '';
  @Input() fmtHists?: FmtHist[];
  @Output() showDiffChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private appService: AppService,
    private translate: TranslateService,
    private broadcast: SharedBroadcastService
  ) { }

  ngOnInit() {
    if (this.fmtHists === undefined) {
      this.fmtHists = this.appService.getFmtHists();
    }
  }

  onShown() {
    if (!this.formated.trim()) {
      this.dropdown.hide();
      this.broadcast.showHint({hintMsg: this.translate.instant('fmtedRequired'), hintType: 'danger'});
    }
  }
}
