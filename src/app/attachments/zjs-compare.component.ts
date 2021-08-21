import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../app.service';
import { MessageService, FmtHist } from '../@shared/index';

@Component({
  selector: 'zjs-compare',
  template: `
    <span class="z-sm-hide dropdown" #dropdown="bs-dropdown" dropdown>
      <button *ngIf="compareType == 'outer'" dropdownToggle class="btn btn-default btn-xs zjs-compare-btn dropdown-toggle">
        {{'textCompare' | translate}}
      </button>
      <i *ngIf="compareType == 'inner'" dropdownToggle class="fa fa-th-list z-op-icon dropdown-toggle"></i>
      <ul *dropdownMenu class="dropdown-menu" [class.dropdown-menu-right]="compareType == 'inner'">
        <li *ngIf="compareType == 'outer'">
          <a href="javascript:;" (click)="showDiffChange.emit('newC')">{{'newCompare' | translate}}</a>
        </li>
        <ng-container *ngIf="compareType == 'outer' && formated">
          <li class="divider dropdown-divider"></li>
          <li>
            <a href="javascript:;" (click)="showDiffChange.emit('new')">{{'cpWidthNew' | translate}}</a>
          </li>
          <li>
            <a href="javascript:;" (click)="showDiffChange.emit('src')">{{'cpWidthSrc' | translate}}</a>
          </li>
          <li *ngFor="let hist of fmtHists">
            <a href="javascript:;" (click)="showDiffChange.emit({type: 'his', hist: hist})">{{hist.name}}</a>
          </li>
        </ng-container>
        <ng-container *ngIf="compareType == 'inner'">
          <li *ngFor="let hist of fmtHists">
            <a href="javascript:;" (click)="showDiffChange.emit({type: 'his', hist: hist})">{{hist.name}}</a>
          </li>
        </ng-container>
        <ng-container *ngIf="compareType == 'outer' && compareHists.length">
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
  @Input() compareType: string;
  @Input() formated: string;
  @Input() fmtHists?: FmtHist[];
  @Output() showDiffChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('dropdown') dropdown: any;
  compareHists: any[] = [];
  histsSub: any;
  getCompareHists: any = () => this.compareHists = this.appService.getCompareHists();

  constructor(
    private appService: AppService,
    private translate: TranslateService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    if (this.fmtHists === undefined) {
      this.fmtHists = this.appService.getFmtHists();
    }
    this.getCompareHists();
    this.histsSub = this.messageService.compareHistStream.subscribe(() => this.getCompareHists());
  }

  ngOnDestroy() {
    this.histsSub.unsubscribe();
  }

  compareHistChange($e: any, hist: any) {
    if (fn.get($e, '/target/tagName') === 'I') {
      this.appService.rmvCompareHists(hist);
      this.getCompareHists();
      this.messageService.showHint({
        hintType: 'success',
        hintMsg: this.translate.instant('removeSavedSuccess')
      });
    } else {
      this.showDiffChange.emit({type: 'cpr', hist: hist, e: $e});
    }
  }
}
