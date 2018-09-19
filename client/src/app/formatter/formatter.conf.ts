import { FmtHelp } from './formatter.help';

/**
 * 格式化配置
 * =======================================
 */
export class Configs {
  public model: 'expand' | 'combine' = 'expand';
  public type: 'json' | 'jsObj' | 'pyMap' = 'json';
  public indent: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 2;
  public sgIndent: string = ' ';
  public keyQuote: '\'' | '\"' | '';
  public valQuote: '\'' | '\"';
  public isStrict: boolean;
  public isEscape: boolean;
}

/**
 * 格式化状态容器
 * =======================================
 */
export class FmtStatus {
  public isSrcValid: boolean = true;
  public fmtedRows: number = 0;
  public errRowStr: number = 0;
  public errRowIdx: number = 0;
  public fmtedLines: number = 0;
  public altType: 'info' | 'success' | 'warning' | 'danger' = 'info';
  public altInfo: any = { type: '', idx: NaN, brc: '' };
  public fmtedType: 'json' | 'jsObj' | 'pyMap' | 'other' | '' = 'json';
}

/**
 * 格式化期望容器
 * =======================================
 */
export class FmtValidator {
  public exceptVal: string = '';
  public exceptType: string = '';
  public deepIdxCon: string = '';
  public isSrcJson: boolean = true;
  public srcAcType: 'json' | 'jsObj' | 'pyMap' | 'other' | '' = '';
}

/**
 * 格式化主程序基类
 * =======================================
 */
export class FmtBase {
  v: FmtValidator;
  fmtObject: any;
  fmtSource: any;
  fmtResult: string;
  fmtConfig: Configs;
  fmtStatus: FmtStatus;
  help: FmtHelp = new FmtHelp();
  level: number = 0;
  rowIdx: number = 1;
  baseIndent: string = '';
  isExpand: boolean;
}
