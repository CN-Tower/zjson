import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../app.service';
import { SharedBroadcastService, FmtHist } from '../shared/index';

@Component({
  selector: 'zjs-compare',
  template: `
    <span class="z-sm-hide dropdown" #dropdown="bs-dropdown" dropdown>
      <i dropdownToggle class="fa fa-{{icoClass}} z-op-icon dropdown-toggle"></i>
      <ul *dropdownMenu class="dropdown-menu dropdown-menu-right">
        <li *ngIf="icoClass == 'columns'">
          <a href="javascript:;" (click)="showDiffChange.emit('newC')">{{'newCompare' | translate}}</a>
        </li>
        <ng-container *ngIf="formated || icoClass == 'th-list'">
          <li class="divider dropdown-divider"></li>
          <li *ngIf="icoClass == 'columns'">
            <a href="javascript:;" (click)="showDiffChange.emit('new')">{{'cpWidthNew' | translate}}</a>
          </li>
          <li *ngIf="icoClass == 'columns'">
            <a href="javascript:;" (click)="showDiffChange.emit('src')">{{'cpWidthSrc' | translate}}</a>
          </li>
          <li *ngFor="let hist of fmtHists">
            <a href="javascript:;" (click)="showDiffChange.emit({type: 'his', hist: hist})">{{hist.name}}</a>
          </li>
        </ng-container>
        <ng-container *ngIf="compareHists.length">
          <li class="divider dropdown-divider"></li>
          <li *ngFor="let hist of compareHists">
            <a href="javascript:;" (click)="compareHistChange($event, hist)">
              <i class="fa fa-trash z-op-icon"></i>&nbsp;&nbsp;{{hist.name}}
            </a>
          </li>
        </ng-container>
      </ul>
  </span>`
})
export class ZjsCompareComponent implements OnInit, OnDestroy {
  @ViewChild('dropdown') dropdown: any;
  @Input() formated: string;
  @Input() icoClass: string = '';
  @Input() fmtHists?: FmtHist[];
  @Output() showDiffChange: EventEmitter<any> = new EventEmitter();

  compareHists: any[] = [];
  histsSub: any;
  getCompareHists: any = () => this.compareHists = this.appService.getCompareHists();

  constructor(
    private appService: AppService,
    private translate: TranslateService,
    private broadcast: SharedBroadcastService
  ) { }

  ngOnInit() {
    if (this.fmtHists === undefined) {
      this.fmtHists = this.appService.getFmtHists();
    }
    this.getCompareHists();
    this.histsSub = this.broadcast.compareHistStream.subscribe(() => this.getCompareHists());
  }

  ngOnDestroy() {
    this.histsSub.unsubscribe();
  }

  compareHistChange($e: any, hist: any) {
    if (fn.get($e, '/target/tagName') === 'I') {
      this.appService.rmvCompareHists(hist);
      this.getCompareHists();
      this.broadcast.showHint({
        hintType: 'success',
        hintMsg: this.translate.instant('removeSavedSuccess')
      });
    } else {
      this.showDiffChange.emit({type: 'cpr', hist: hist, e: $e});
    }
  }
}
