import { Observable } from 'rxjs';
import { Configs, FmtStatus, FmtValidator, FmtBase } from './formatter.conf';
import { FmtErrType } from '../@shared';

export class Formatter extends FmtBase {

  constructor() { super(); }

  /**
   * 描述: 初始化格式器
   * ===================================================
   * @arg fmtSource [string]
   * @arg fmtConfig [Configs] 配置参数
   * @arg onFmted [Function] 回调
   * */
  format(fmtSource: string, fmtConfig: Configs, that: any) {
    return Observable.create((observer: any) => {
      this.v = new FmtValidator();
      this.fmtStatus = new FmtStatus();
      this.fmtSource = fmtSource;
      this.fmtConfig = fmtConfig;
      this.fmtResult = '';
      this.level = 0;
      this.rowIdx = 1;
      this.isExpand = fmtConfig.model === 'expand';
      this.baseIndent = this.help.setBaseIndent(fmtConfig);
      try {
        this.doFormatByTry(that);
      } catch (err) {
        this.fmtStatus.isFmtError = true;
      } finally {
        this.setupFmtStatus();
        observer.next({ fmtResult: this.fmtResult, fmtStatus: this.fmtStatus });
        observer.complete();
      }
    });
  }

  /**
   * 根据类型进程格式化
   * ============================
   */
  doFormatByTry(that: any) {
    try {
      if (this.fmtSource !== '') eval(`this.fmtSource = ${this.fmtSource}`);
      if (this.help.isSpecialVal(this.fmtSource)) {
        this.fmtObject = this.fmtSource;
        this.help.broadcastQuote(that, this.fmtConfig, true);
        this.doNormalFormat();
        this.fmtStatus.isSrcValid = true;
        this.fmtStatus.fmtedType = this.fmtConfig.type;
      } else {
        this.help.broadcastQuote(that, this.fmtConfig);
        this.doSpecialFormat();
        this.fmtStatus.fmtedType = this.v.srcAcType;
      }
    } catch (e) {
      this.help.broadcastQuote(that, this.fmtConfig);
      this.doSpecialFormat();
      this.fmtStatus.fmtedType = this.v.srcAcType;
    }
  }

  /**
   * 设置格式化状态
   * ============================
   */
  setupFmtStatus() {
    if (this.fmtStatus.isFmtError && !this.fmtStatus.errRowIdx) {
      this.expection('err');
    } else if (this.fmtStatus.isSrcValid) {
      if (this.v.deepIdxCon) {
        const expBrc = this.help.getBraceMir(this.v.deepIdxCon.substr(-1));
        this.expection('end', expBrc);
      }
      this.fmtStatus.fmtedType === this.fmtConfig.type
        ? this.expection('scc')
        : this.expection('war');
    }
    this.fmtStatus.fmtedLines = this.rowIdx;
  }

  /**
   * 描述: 格式化正确的OBJ
   * ===================================================
   * @arg object [object]
   * @arg conf [object, opt.] 配置参数
   * */
  private doNormalFormat() {
    if ([true, false, null, ''].includes(this.fmtObject)) {
      return this.fmtResult += String(this.fmtObject);
    }
    this.fmtObject = this.fmtConfig.isStrict
      ? JSON.parse(JSON.stringify(this.fmtObject))
      : this.fmtObject;
    if (fn.typeOf(this.fmtObject, 'arr')) {
      this.arrayHandler();
    } else if (fn.typeOf(this.fmtObject, 'obj')) {
      this.objectHandler();
    }
  }

  /**
   * 对数组的处理
   * ============================
   */
  private arrayHandler() {
    let curIndent: string;
    const fmtObject = this.fmtObject;
    if (this.fmtObject.length > 0) {
      this.fmtResult += this.brkLine4Normal('[');
      if (this.isExpand) this.rowIdx ++;
      this.level++;
      for (let i = 0; i < fmtObject.length; i++) {
        curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
        this.fmtResult += curIndent;
        this.valueHandler(fmtObject[i]);
        this.fmtResult += this.brkLine4Normal(i < fmtObject.length - 1 ? ',' : '');
      }
      this.level--;
      curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
      this.fmtResult += curIndent + ']';
    } else {
      this.fmtResult += '[]';
    }
  }

  /**
   * 对对象的处理
   * ============================
   */
  private objectHandler() {
    let curIndent: string;
    const fmtObject = this.fmtObject;
    if (fn.len(fmtObject) > 0) {
      this.fmtResult += this.brkLine4Normal('{');
      this.level++;
      let idx = 0;
      const objLength = fn.len(fmtObject);
      for (const key in fmtObject) {
        if (fn.has(fmtObject, key)) {
          idx++;
          const prop = this.help.quoteNormalStr(key, this.fmtConfig, this.fmtConfig.keyQuote);
          curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
          this.fmtResult += curIndent;
          this.fmtResult += prop;
          this.fmtResult += this.isExpand ? ': ' : ':';
          this.valueHandler(fmtObject[key]);
          this.fmtResult += this.brkLine4Normal(idx < objLength ? ',' : '');
        }
      }
      this.level--;
      curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
      this.fmtResult += curIndent + '}';
    } else {
      this.fmtResult += '{}';
    }
  }

  /**
   * 对值的分类和处理
   * ============================
   */
  private valueHandler(value: any) {
    switch (typeof value) {
      case 'undefined':
      case 'function': return this.fmtResult += String(value);
      case 'number':
      case 'boolean':  return this.fmtResult += value;
      case 'object':
        this.fmtObject = value;
        return this.doNormalFormat();
      case 'string':
        return this.fmtResult += this.help.quoteNormalStr(value, this.fmtConfig, this.fmtConfig.valQuote);
    }
  }

  /**
   * 设置换行策略
   * ============================
   */
  brkLine4Normal = (str: string) => {
    if (!this.isExpand) return str;
    this.rowIdx ++;
    return str + '\r\n';
  }
  brkLine4Special = (str: string = '') => {
    if (!this.isExpand) return this.fmtResult += str;
    this.rowIdx ++;
    this.fmtResult += `\r\n${this.help.getCurIndent(this.baseIndent, this.level) + str}`;
  }

  /**
   * 描述: 格式化错误的JSON
   * ===================================================
   * @param src [string]
   */
  private doSpecialFormat() {
    this.fmtSource = this.fmtSource.replace(/^\s*/, '');
    if (this.fmtSource.length === 0) return;
    let isMatched = false;
    switch (this.fmtSource[0]) {
      case '\'':
      case '"': isMatched = true; this.quotaHandler();  break;
      case ':': isMatched = true; this.colonHandler();  break;
      case ',': isMatched = true; this.commaHandler();  break;
      case '{': isMatched = true; this.objPreHandler(); break;
      case '}': isMatched = true; this.objEndHandler(); break;
      case '[': isMatched = true; this.arrPreHandler(); break;
      case ']': isMatched = true; this.arrEndHandler(); break;
      case '(': isMatched = true; this.tupPreHandler(); break;
      case ')': isMatched = true; this.tupEndHandler(); break;
    }
    if (!isMatched) {
      const unicMt = this.fmtSource.match(/^u(\s)?'|^u(\s)?"/);
      if (unicMt) {
        isMatched = true;
        this.unicHandler(unicMt[0]);
      }
    }
    if (!isMatched) {
      const numbMt = this.fmtSource.match(/^(-?[0-9]+\.?[0-9]*|0[xX][0-9a-fA-F]+)/);
      if (numbMt) {
        isMatched = true;
        this.numbHandler(numbMt[0]);
      }
    }
    if (!isMatched) {
      const boolMt = this.fmtSource.match(/^(true|false|True|False)/);
      if (boolMt) {
        isMatched = true;
        this.boolHandler(boolMt[0]);
      }
    }
    if (!isMatched) {
      const nullMt = this.fmtSource.match(/^(null|undefined|None|NaN)/);
      if (nullMt) {
        isMatched = true;
        this.nullHandler(nullMt[0]);
      }
    }
    if (!isMatched) this.otheHandler();
    return this.doSpecialFormat();
  }

  /**
   * 引号
   * ============================
   */
  private quotaHandler() {
    if (this.fmtSource[0] === '\'') this.v.isSrcJson = false;
    const rest = this.help.getSrcRest(this.fmtSource);
    const restIdx = this.help.getNextQuoIdx(this.fmtSource[0], rest);
    this.chkExpect(this.fmtSource[0]);
    const quoteMt = this.fmtSource.substr(0, 1);
    const isProperty = this.v.exceptVal === 'ost';
    let strInQuote = '';
    if (restIdx > -1) {
      strInQuote = this.fmtSource.substr(1, restIdx);
      this.fmtResult += this.help.quoteSpecialStr(strInQuote, this.fmtConfig, quoteMt, isProperty);
      this.setExpect(this.fmtSource[0]);
      this.fmtSource = this.help.getSrcRest(this.fmtSource, restIdx + 2);
    } else {
      strInQuote = this.fmtSource.substr(1);
      this.fmtResult += this.help.quoteSpecialStr(strInQuote, this.fmtConfig, quoteMt, isProperty);
      this.setExpect('!');
      this.fmtSource = '';
    }
  }

  /**
   * 冒号
   * ============================
   */
  private colonHandler() {
    this.fmtResult += this.isExpand ? ': ' : ':';
    this.chkExpect(this.fmtSource[0]);
    this.setExpect(this.fmtSource[0]);
    this.fmtSource = this.help.getSrcRest(this.fmtSource);
  }

  /**
   * 逗号
   * ============================
   */
  private commaHandler() {
    const curIndent = this.help.getCurIndent(this.baseIndent, this.level);
    if (this.isExpand) this.rowIdx ++;
    this.fmtResult += this.isExpand ? `,\r\n${curIndent}` : ',';
    this.chkExpect(this.fmtSource[0]);
    this.setExpect(this.fmtSource[0]);
    this.fmtSource = this.help.getSrcRest(this.fmtSource);
    if (this.fmtSource.replace(/(\r)?\n|\s/mg, '') === '') this.expection('val');    // this.doSpecialFormat();
  }

  /**
   * 大括号（前）
   * ============================
   */
  private objPreHandler() {
    this.chkExpect(this.fmtSource[0]);
    this.setExpect(this.fmtSource[0]);
    if (this.fmtSource[1] && this.fmtSource[1] === '}') {
      this.fmtResult += '{}';
      this.setExpect('}');
      this.fmtSource = this.help.getSrcRest(this.fmtSource, 2);
    } else {
      this.level++;
      this.fmtResult += '{';
      this.brkLine4Special();
      this.fmtSource = this.help.getSrcRest(this.fmtSource);
    }
  }

  /**
   * 大括号（后）
   * ============================
   */
  private objEndHandler() {
    this.level--;
    this.brkLine4Special('}');
    this.chkExpect(this.fmtSource[0]);
    this.setExpect(this.fmtSource[0]);
    this.fmtSource = this.help.getSrcRest(this.fmtSource);
  }

  /**
   * 中括号（前）
   * ============================
   */
  private arrPreHandler() {
    this.chkExpect(this.fmtSource[0]);
    this.setExpect(this.fmtSource[0]);
    if (this.fmtSource[1] && this.fmtSource[1] === ']') {
      this.fmtResult += '[]';
      this.setExpect(']');
      this.fmtSource = this.help.getSrcRest(this.fmtSource, 2);
    } else {
      this.level++;
      this.fmtResult += '[';
      this.brkLine4Special();
      this.fmtSource = this.help.getSrcRest(this.fmtSource);
    }
  }

  /**
   * 中括号（后）
   * ============================
   */
  private arrEndHandler() {
    this.level--;
    this.brkLine4Special(']');
    this.chkExpect(this.fmtSource[0]);
    this.setExpect(this.fmtSource[0]);
    this.fmtSource = this.help.getSrcRest(this.fmtSource);
  }

  /**
   * 括号（前）
   * ============================
   */
  private tupPreHandler() {
    this.v.srcAcType = this.v.srcAcType || 'pyMap';
    this.chkExpect(this.fmtSource[0]);
    this.setExpect(this.fmtSource[0]);
    if (this.fmtSource[1] && this.fmtSource[1] === ')') {
      this.fmtResult += this.fmtConfig.isStrict ? '[]' : '()';
      this.setExpect(')');
      this.fmtSource = this.help.getSrcRest(this.fmtSource, 2);
    } else {
      this.level++;
      this.fmtResult += this.fmtConfig.isStrict ? '[' : '(';
      this.brkLine4Special();
      this.fmtSource = this.help.getSrcRest(this.fmtSource);
    }
  }

  /**
   * 括号（后）
   * ============================
   */
  private tupEndHandler() {
    this.level--;
    this.brkLine4Special(this.fmtConfig.isStrict ? ']' : ')');
    this.chkExpect(this.fmtSource[0]);
    this.setExpect(this.fmtSource[0]);
    this.fmtSource = this.help.getSrcRest(this.fmtSource);
  }

  /**
   * Unicode
   * ============================
   */
  private unicHandler(unicMt: string) {
    this.v.srcAcType = this.v.srcAcType || 'pyMap';
    const rest = this.help.getSrcRest(this.fmtSource, unicMt.length);
    const restIdx = unicMt.indexOf('\'') > -1
      ? this.help.getNextQuoIdx('\'', rest)
      : this.help.getNextQuoIdx('"', rest);
    this.chkExpect('u');
    const isProperty = this.v.exceptVal === 'ost';
    let uniqStr = '';
    if (restIdx > -1) {
      const cutIdx = restIdx + unicMt.length + 1;
      uniqStr = this.fmtSource.substr(unicMt.length, cutIdx - unicMt.length - 1);
      this.fmtResult += this.help.quoteSpecialStr(uniqStr, this.fmtConfig, unicMt, isProperty);
      this.setExpect('u');
      this.fmtSource = this.help.getSrcRest(this.fmtSource, cutIdx);
    } else {
      uniqStr = this.fmtSource.substr(unicMt.length);
      this.fmtResult += this.help.quoteSpecialStr(uniqStr, this.fmtConfig, unicMt, isProperty);
      this.setExpect('!');
      this.fmtSource = '';
    }
  }

  /**
   * 数字
   * ============================
   */
  private numbHandler(numbMt: string) {
    this.fmtResult += numbMt;
    this.chkExpect('n');
    this.setExpect('n');
    this.fmtSource = this.help.getSrcRest(this.fmtSource, numbMt.length);
  }

  /**
   * 布尔
   * ============================
   */
  private boolHandler(boolMt: string) {
    this.v.srcAcType = this.v.srcAcType || (['True', 'False'].includes(boolMt) ? 'pyMap' : 'jsObj');
    this.fmtResult += this.fmtConfig.isStrict ? boolMt.toLowerCase() : boolMt;
    this.chkExpect('b');
    this.setExpect('b');
    this.fmtSource = this.help.getSrcRest(this.fmtSource, boolMt.length);
  }

  /**
   * 空
   * ============================
   */
  private nullHandler(nullMt: string) {
    this.v.srcAcType = this.v.srcAcType || (['None'].includes(nullMt) ? 'pyMap' : 'jsObj');
    this.fmtResult += this.fmtConfig.isStrict ? 'null' : nullMt;
    this.chkExpect('N');
    this.setExpect('N');
    this.fmtSource = this.help.getSrcRest(this.fmtSource, nullMt.length);
  }

  /**
   * 非法字符
   * ============================
   */
  private otheHandler() {
    const strMatch = this.fmtSource.match(/^[^\{\}\[\]\(\):,]*/);
    const strMated = strMatch && strMatch[0] || '';
    if (strMated) {
      this.fmtResult += strMated;
      this.chkExpect('!');
      this.fmtSource = this.help.getSrcRest(this.fmtSource, strMated.length);
    }
  }

  /**
   * 与期待值匹配
   * ============================
   */
  private chkExpect(sig: string) {
    if (this.fmtStatus.isSrcValid) {
      switch (this.v.exceptVal) {
        case 'val':
          if (':,}])!'.includes(sig)) {
            this.expection('val');
          } break;
        case 'ost':
          if (!'\'"unbN'.includes(sig)) {
            this.expection('ost');
          } break;
        case 'end':
          const endBrc = this.help.getBraceMir(this.v.exceptType);
          if (![',', endBrc].includes(sig)) {
            this.expection('end', endBrc);
          } break;
        case 'col':
          if (sig !== ':') {
            this.expection('col');
          } break;
      }
    }
  }

  /**
   * 设置期待值
   * ============================
   */
  private setExpect(sig: string) {
    switch (sig) {
      case ':':
        this.v.exceptVal = 'val';
        break;
      case ',':
        this.v.exceptType === '{'
          ? this.v.exceptVal = 'ost'
          : this.v.exceptVal = 'val';
        break;
      case '{':
        this.v.exceptType = sig;
        this.v.deepIdxCon += sig;
        this.v.exceptVal = 'ost';
        break;
      case '}':
        this.v.deepIdxCon = this.v.deepIdxCon.substr(0, this.v.deepIdxCon.length - 1);
        this.v.exceptType = this.v.deepIdxCon.substr(-1);
        this.v.exceptVal = 'end';
        break;
      case '[':
        this.v.exceptType = sig;
        this.v.deepIdxCon += sig;
        this.v.exceptVal = 'val';
        break;
      case ']':
        this.v.deepIdxCon = this.v.deepIdxCon.substr(0, this.v.deepIdxCon.length - 1);
        this.v.exceptType = this.v.deepIdxCon.substr(-1);
        this.v.exceptVal = 'end';
        break;
      case '(':
        this.v.exceptType = sig;
        this.v.deepIdxCon += sig;
        this.v.exceptVal = 'val';
        break;
      case ')':
        this.v.deepIdxCon = this.v.deepIdxCon.substr(0, this.v.deepIdxCon.length - 1);
        this.v.exceptType = this.v.deepIdxCon.substr(-1);
        this.v.exceptVal = 'end';
        break;
      case 'u':
      case 'n':
      case 'b':
      case 'N':
      case '"':
      case '\'':
        this.v.exceptVal === 'ost'
          ? this.v.exceptVal = 'col'
          : this.v.exceptVal = 'end';
        break;
    }
  }

  /**
   * 期待返回设置
   * ============================
   */
  private expection(type: FmtErrType, brc: string = '') {
    if (['ost', 'col', 'val', 'end'].includes(type)) {
      this.fmtStatus.isSrcValid = false;
      this.fmtStatus.errRowIdx = this.rowIdx;
    }
    this.fmtStatus.altType = fn.match(type, {
      'war': 'warning',
      'scc': 'success',
      'default': 'danger'
    });
    this.fmtStatus.altInfo = { type: type, idx: this.rowIdx, brc: brc };
  }
}
