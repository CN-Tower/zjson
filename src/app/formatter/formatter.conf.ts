import { FmtHelp } from './formatter.help';
import { AlertType, AlertInfo, Indent, FmtedType } from '../@shared';

/**
 * 格式化配置
 * =======================================
 */
export class Configs {
  public model: 'expand' | 'combine' = 'expand';
  public type: FmtedType = 'json';
  public indent: Indent = 2;
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
  public isFmtError: boolean = false;
  public fmtedRows: number = 0;
  public errRowStr: number = 0;
  public errRowIdx: number = 0;
  public fmtedLines: number = 0;
  public altType: AlertType = 'info';
  public altInfo: AlertInfo = { type: '', idx: NaN, brc: '' };
  public fmtedType: FmtedType = 'json';
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
  public srcAcType: FmtedType = '';
}

/**
 * 格式化主程序基类
 * =======================================
 */
export class FmtBase {
  public v: FmtValidator;
  public fmtObject: any;
  public fmtSource: any;
  public fmtResult: string;
  public fmtConfig: Configs;
  public fmtStatus: FmtStatus;
  public help: FmtHelp = new FmtHelp();
  public level: number = 0;
  public rowIdx: number = 1;
  public baseIndent: string = '';
  public isExpand: boolean;
}
