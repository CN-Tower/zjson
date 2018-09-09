import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.less']
})
export class AppConfigComponent {
  @Input() conf: any;
  @Input() lang: string;
  @Input() theme: string;

  isShowConfigs: boolean = false;
  isConfOnSlid: boolean = false;
  types: any = {json: 'Json', jsObj: 'JsObj'};
  languages: any = {
    en: {long: 'English', short: 'EN'},
    zh: {long: '中文（简体）', short: '中文'}
  };

  constructor() { }

  toggleConfigs() {
    if (!this.isConfOnSlid) {
      this.isConfOnSlid = true;
      if (this.isShowConfigs) {
        this.isShowConfigs = false;
        $('.z-conf-wp').slideUp(() => {
          this.isConfOnSlid = false;
        });
      } else {
        this.isShowConfigs = true;
        $('.z-conf-wp').slideDown(() => {
          this.isConfOnSlid = false;
        });
      }
    }
  }
}
