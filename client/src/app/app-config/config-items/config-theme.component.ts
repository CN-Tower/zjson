import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'config-theme',
  template: `
    <div class="conf-item-wp col-lg-12">
      <div class="conf-item">
        <h4 class="conf-tt fl">{{'theme' | translate}}</h4>
        <div class="conf-con fl">
          <div class="z-drop z-theme-drop dropdown" dropdown>
            <button dropdownToggle class="btn btn-default dropdown-toggle capitalize" type="button">
              {{theme}}
              <span class="caret"></span>
            </button>
            <ul *dropdownMenu class="dropdown-menu">
              <li *ngFor="let them of themes">
                <a href="javascript:;" (click)="changeTheme.emit(them)" class="capitalize">{{them}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['../app-config.component.less']
})
export class ConfigThemeComponent {
  @Input() conf: any;
  @Input() theme: string;
  @Input() themes: string[] = [];
  @Output() changeTheme: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
