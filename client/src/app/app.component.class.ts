import { Configs, FmtStatus, FmterEles } from './formatter/formatter.conf';
import { Formatter } from './formatter/formatter.core';
import { AppService, APP_INFO } from './app.service';

export abstract class ZjsApp {
  appUrl: string = APP_INFO.appUrl;
  conf: Configs;
  lang: string;
  version: string;
  remoteVersion: string;
  sharedLink: string;
  isOnLeft: boolean = true;
  isOnInit: boolean = true;
  isPageActive: boolean = true;
  isShowLoading: boolean = false;
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
  toggleConfTiele: string;
  theme: string;
  altMsgs: any = {};
  stArr: number[] = [];
  stIdx: number = 0;
  eles: FmterEles = new FmterEles();
  fmtSt: FmtStatus = new FmtStatus();
  formatter: Formatter = new Formatter();
  alertInfo: any = {type: '', idx: NaN, brc: ''};
  alertType: 'info'|'success'|'warning'|'danger' = 'info';
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
    tabSize: 2
  };
  getFmtHists = () => this.fmtHists = this.appService.getFmtHists();
  getTimeStr = () => fn.fmtDate('MM-dd hh:mm:ss');
  setRowIdxWpHeight = () => $('.z-canvas').height() + 12 + 'px';

  constructor (public appService: AppService) { }
}
