import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { QuoteIdx, QuoteInfo, MessageService } from '../../@shared';
import { AppService } from '../../app.service';

@Component({
  selector: 'config-quote',
  template: `
    <div class="conf-item-wp col-lg-12">
      <div class="conf-item">
        <h4 class="conf-tt fl">{{'quote' | translate}}</h4>
        <div class="conf-con fl">
          <div class="z-drop z-type-drop dropdown" dropdown>
            <button dropdownToggle [disabled]="isShowDiff"
                    class="btn btn-default dropdown-toggle" type="button">
              {{conf.keyQuote}}key{{conf.keyQuote}}: {{conf.valQuote}}value{{conf.valQuote}}
              <span class="caret"></span>
            </button>
            <ul *dropdownMenu class="dropdown-menu" (click)="doFormate.emit(true)">
              <li>
                <a href="javascript:;" (click)="changeQuote(1, true)">
                  "key": "value"
                </a>
              </li>
              <li>
                <a href="javascript:;" (click)="changeQuote(2, true)">
                  'key': 'value'
                </a>
              </li>
              <li *ngIf="isNormal">
                <a href="javascript:;" (click)="changeQuote(3, true)">
                  &nbsp;key: "value"
                </a>
              </li>
              <li *ngIf="isNormal">
                <a href="javascript:;" (click)="changeQuote(4, true)">
                  &nbsp;key: 'value'
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['../app-config.component.less']
})
export class ConfigQuoteComponent implements OnInit {
  @Input() conf: any;
  @Input() isShowDiff: boolean;
  @Output() doFormate: EventEmitter<any> = new EventEmitter();
  isNormal: boolean = true;
  quoteMap: any = {
    1: {kQ: '\"', vQ: '\"'},
    2: {kQ: '\'', vQ: '\''},
    3: {kQ: '', vQ: '\"'},
    4: {kQ: '', vQ: '\''}
  };

  constructor(private messageService: MessageService, private appService: AppService) {
    this.messageService.quoteStream.subscribe((qtInfo: QuoteInfo) => {
      this.changeQuote(qtInfo.quoteIdx);
      if (qtInfo.isNormal !== undefined) this.isNormal = qtInfo.isNormal;
    });
  }

  ngOnInit() {
    if (this.conf.keyQuote === undefined || this.conf.valQuote === undefined) {
      this.changeQuote(this.appService.getQuoteIdx());
    }
  }

  changeQuote(qtIdx: QuoteIdx, isStore?: boolean) {
    this.conf.keyQuote = this.quoteMap[qtIdx].kQ;
    this.conf.valQuote = this.quoteMap[qtIdx].vQ;
    if (isStore) this.appService.setQuoteIdx(qtIdx);
  }
}
