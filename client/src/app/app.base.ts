import { Configs, FmtStatus } from './formatter/formatter.conf';
import { Formatter } from './formatter/formatter.core';
import { AppService, APP_INFO, APP_THEMES } from './app.service';
import { DiffType, AlertType, AlertInfo } from './@shared/index';

export abstract class ZjsApp {
  public isElectronApp: boolean = false;
  public appUrl: string = APP_INFO.appUrl;
  public downloadUrl: string = APP_INFO.downloadUrl;
  public lang: string;
  public version: string;
  public remoteVersion: string = APP_INFO.version;
  public sharedLink: string;
  public isOnLeft: boolean = true;
  public isOnInit: boolean = true;
  public isPageActive: boolean = true;
  public updateUrl: string = APP_INFO.appUrl;
  public isWindowBig: boolean;
  public sourcest: string = '';
  public formated: string = '';
  public alertMsg: string = '';
  public saveFmtTime: string;
  public fmtSourcest: string;
  public fmtHists: any[] = [];
  public maxSrcSize: any = null;
  public maxFmtSize: any = null;
  public isSrcMax: boolean = false;
  public isFmtMax: boolean = false;
  public isModelExpand: boolean = false;
  public isFmtedEditAb: boolean = true;
  public isOriginEmpty: boolean = true;
  public isShowDiff: boolean = false;
  public diffType: DiffType;
  public toggleConfTiele: string;
  public theme: string;
  public themes: string[] = APP_THEMES;
  public altMsgs: any = {};
  public positionIdxArr: number[] = [];
  public positionIdx: number = 0;
  public isShowSrcToTop: boolean = false;
  public isShowFmtToTop: boolean = false;
  public isSrcOnHover: boolean = false;
  public isFmtOnHover: boolean = false;
  public conf: Configs = new Configs();
  public fmtStatus: FmtStatus = new FmtStatus();
  public formatter: Formatter = new Formatter();
  public alertInfo: AlertInfo = {type: '', idx: NaN, brc: ''};
  public alertType: AlertType = 'info';
  public greeting: string;
  public srcEditor: any;
  public fmtEditor: any;
  public errRowIndex: number;
  public errRowDecorations: any[] = [];
  public fullscreen: boolean = false;
  public fullScreenEvent: any = { remove: () => {} };
  public i18n: any = {
    confs: {show: '', hide: ''},
    model: {expand: '', combine: ''},
    alert: {ost: '', col: '', val: '', end: '', war: '', scc: ''}
  };
  public srcEditorOptions: any = {
    language: 'text/plain',
    tabSize: 2,
    wordWrap: 'on',
    theme: this.appService.getEditorTheme(this.appService.getAppTheme()),
    minimap: {
      enabled: false
    },
    scrollbar: {
      horizontal: 'hidden'
    }
  };
  public fmtEditorOptions: any = {
    theme: this.appService.getEditorTheme(this.appService.getAppTheme()),
    language: 'json',
    tabSize: 2,
    minimap: {
      enabled: false
    }
  };
  getTimeStr = () => fn.fmtDate('MM-dd hh:mm:ss', Date.now());
  getFmtHists = () => this.fmtHists = this.appService.getFmtHists();

  constructor (public appService: AppService) { }
}
