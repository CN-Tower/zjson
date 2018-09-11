import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'config-indent',
  template: `
    <div class="conf-item-wp col-lg-12">
      <div class="conf-item">
        <h4 class="conf-tt fl">{{'indent' | translate}}</h4>
        <div class="conf-con fl">
          <div class="z-drop z-indent-drop dropdown" dropdown>
            <button dropdownToggle [disabled]="conf.model!='expand'"
                    class="btn btn-default dropdown-toggle" type="button">
              {{conf.indent}} {{'space' | translate}}&nbsp;
              <span class="caret"></span>
            </button>
            <ul *dropdownMenu class="dropdown-menu" (click)="updateTabsize.emit()">
              <li *ngFor="let i of [1,2,3,4,5,6,7,8];">
                <a href="javascript:;" (click)="conf.indent = i">{{i}} {{'space' | translate}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['../app-config.component.less']
})
export class ConfigIndentComponent {
  @Input() conf: any = {model: '', indent: 2};
  @Output() updateTabsize: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
