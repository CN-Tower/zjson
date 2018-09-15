import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'config-type',
  template: `
    <div class="conf-item-wp col-lg-12">
      <div class="conf-item">
        <h4 class="conf-tt fl">{{'type' | translate}}</h4>
        <div class="conf-con fl">
          <div class="z-drop z-type-drop dropdown" dropdown>
            <button dropdownToggle [disabled]="conf.isStrict"
                    class="btn btn-default dropdown-toggle" type="button">
              {{types[conf.type]}}&nbsp;
              <span class="caret"></span>
            </button>
            <ul *dropdownMenu class="dropdown-menu" (click)="doFormate.emit(true)">
              <li><a href="javascript:;" (click)="conf.type='json'">{{types.json}}</a></li>
              <li><a href="javascript:;" (click)="conf.type='jsObj'">{{types.jsObj}}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['../app-config.component.less']
})
export class ConfigTypeComponent {
  @Input() conf: any;
  @Output() doFormate: EventEmitter<any> = new EventEmitter();

  types: any = {json: 'Json', jsObj: 'JsObj'};

  constructor() { }
}
