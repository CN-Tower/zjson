import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'config-lang',
  template: `
    <div class="conf-item-wp col-lg-12">
      <div class="conf-item">
        <h4 class="conf-tt fl">{{'lang' | translate}}<br>{{'lang_' | translate}}</h4>
        <div class="conf-con fl">
          <div class="z-drop z-language-drop dropdown" dropdown>
            <button dropdownToggle class="btn btn-default dropdown-toggle" type="button">
              <span class="z-lang-bg">{{languages[lang]?.long}} </span>
              <span class="caret"></span>
            </button>
            <ul *dropdownMenu class="dropdown-menu">
              <li><a href="javascript:;" (click)="selectLanguage.emit('en')">English</a></li>
              <li><a href="javascript:;" (click)="selectLanguage.emit('zh')">中文(简体)</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['../app-config.component.less']
})
export class ConfigLangComponent {
  @Input() conf: any = {model: '', indent: 2};
  @Input() lang: any;
  @Output() selectLanguage: EventEmitter<any> = new EventEmitter();

  languages: any = {
    en: {long: 'English', short: 'EN'},
    zh: {long: '中文（简体）', short: '中文'}
  };
  constructor() { }
}
