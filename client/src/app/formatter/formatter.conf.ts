import { FmtHelp } from './formatter.help';
import { AlertType, AlertInfo, Indent, FmtedType } from '../shared';

/**
 * 格式化配置
 * =======================================
 */
export class Configs {
  model: 'expand' | 'combine' = 'expand';
  type: FmtedType = 'json';
  indent: Indent = 2;
  sgIndent: string = ' ';
  keyQuote: '\'' | '\"' | '';
  valQuote: '\'' | '\"';
  isStrict: boolean;
  isEscape: boolean;
}

/**
 * 格式化状态容器
 * =======================================
 */
export class FmtStatus {
  isSrcValid: boolean = true;
  isFmtError: boolean = false;
  fmtedRows: number = 0;
  errRowStr: number = 0;
  errRowIdx: number = 0;
  fmtedLines: number = 0;
  altType: AlertType = 'info';
  altInfo: AlertInfo = { type: '', idx: NaN, brc: '' };
  fmtedType: FmtedType = 'json';
}

/**
 * 格式化期望容器
 * =======================================
 */
export class FmtValidator {
  exceptVal: string = '';
  exceptType: string = '';
  deepIdxCon: string = '';
  isSrcJson: boolean = true;
  srcAcType: FmtedType = '';
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
