import { Configs, FmtStatus } from './formatter/formatter.conf';
import { Formatter } from './formatter/formatter.core';
import { AppService, APP_INFO, APP_THEMES } from './app.service';
import { DiffType, AlertType, AlertInfo } from './shared/index';

export abstract class ZjsApp {
  appUrl: string = APP_INFO.appUrl;
  lang: string;
  version: string;
  remoteVersion: string;
  sharedLink: string;
  isOnLeft: boolean = true;
  isOnInit: boolean = true;
  isPageActive: boolean = true;
  updateUrl: string = '';
  isWindowBig: boolean;
  sourcest: string = '';
  formated: string = '';
  alertMsg: string = '';
  saveFmtTime: string;
  fmtSourcest: string;
  fmtHists: any[] = [];
  maxSrcSize: any = null;
  maxFmtSize: any = null;
  isSrcMax: boolean = false;
  isFmtMax: boolean = false;
  isModelExpand: boolean = false;
  isFmtedEditAb: boolean = true;
  isOriginEmpty: boolean = true;
  isShowDiff: boolean = false;
  diffType: DiffType;
  toggleConfTiele: string;
  theme: string;
  themes: string[] = APP_THEMES;
  altMsgs: any = {};
  positionIdxArr: number[] = [];
  positionIdx: number = 0;
  isShowSrcToTop: boolean = false;
  isShowFmtToTop: boolean = false;
  isSrcOnHover: boolean = false;
  isFmtOnHover: boolean = false;
  conf: Configs = new Configs();
  fmtStatus: FmtStatus = new FmtStatus();
  formatter: Formatter = new Formatter();
  alertInfo: AlertInfo = {type: '', idx: NaN, brc: ''};
  alertType: AlertType = 'info';
  greeting: string;
  srcEditor: any;
  fmtEditor: any;
  errRowIndex: number;
  errRowDecorations: any[] = [];
  i18n: any = {
    confs: {show: '', hide: ''},
    model: {expand: '', combine: ''},
    alert: {ost: '', col: '', val: '', end: '', war: '', scc: ''}
  };
  srcEditorOptions: any = {
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
  fmtEditorOptions: any = {
    theme: this.appService.getEditorTheme(this.appService.getAppTheme()),
    language: 'json',
    tabSize: 2,
    minimap: {
      enabled: false
    }
  };
  getTimeStr = () => fn.fmtDate('MM-dd hh:mm:ss');
  getFmtHists = () => this.fmtHists = this.appService.getFmtHists();

  constructor (public appService: AppService) { }
}
