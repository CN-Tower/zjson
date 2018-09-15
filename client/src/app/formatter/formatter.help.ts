import { Configs } from './formatter.conf';

export class FmtHelp {
  constructor() {}

  /**
   * 描述: 给String Key打引号
   */
  quoteKey(str: string, conf: Configs) {
    const quote = conf.isEscape ? `\\${conf.keyQuote}` : conf.keyQuote;
    return quote + str + quote;
  }

  /**
   * 描述: 给String Val打引号
   */
  quoteVal(str: string, conf: Configs) {
    const quote = conf.isEscape ? `\\${conf.valQuote}` : conf.valQuote;
    return fn.match(conf.valQuote, {
      '\"': quote + str.replace(/"/mg, '\\"') + quote,
      '\'': quote + str.replace(/'/mg, '\\\'') + quote
    });
  }

  /**
   * 描述: 给String打引号
   */
  quoteStr(str: string, conf: Configs, head?: any, isOnlyQuoteHead: boolean = false) {
    if (!conf.isEscape) return str;
    if (typeof head === 'boolean') {
      isOnlyQuoteHead = head;
      head = undefined;
    }
    str = !head
      ? `\\${str}`
      : str.replace(head, `${head.substr(0, head.length - 1)}\\${head.substr(-1)}`);
    return isOnlyQuoteHead ? str : `${str.substr(0, str.length - 1)}\\${str.substr(-1)}`;
  }

  /**
   * 描述: 判断是否为特殊值
   */
  isSpecialVal(val: any) {
    return val === '' || ['object', 'boolean'].includes(typeof val);
  }

  /**
   * 描述: 获取剩余字符串
   * @param src
   * @param num
   */
  getSrcRest(src: string, num: number = 1): string {
    return src.length > num ? src.substr(num) : '';
  }

  /**
   * 描述: 获取后半引号索引
   * @param quo
   * @param rest
   */
  getNextQuoIdx(quo: string, rest: string): number {
    for (let i = 0; i < rest.length; i ++) {
      if (rest[i] === quo) {
        if (i === 0 || rest[i - 1] !== '\\' || (
          rest[i - 1] === '\\' && rest[i - 2] === '\\' && rest[i - 3] !== '\\'
        )) {
          return i;
        }
      }
    }
    return -1;
  }

  /**
   * 描述: 设置基础缩进值
   * @param conf [Configs]
   */
  setBaseIndent(conf: Configs) {
    let indent = '';
    for (let i = 0; i < conf.indent; i++) {
      indent += conf.sgIndent;
    }
    return indent;
  }

  /**
   * 描述: 根据层数获取缩进值
   * @arg indent [string] 原始缩进值
   * @arg level [number]
   * */
  getCurIndent(indent: string, level: number): string {
    let baseIndent = '';
    for (let i = 0; i < level; i++) {
      baseIndent += indent;
    }
    return baseIndent;
  }

  /**
   * 描述: 获取镜像括号
   * @param brc [string]
   */
  getBraceMir(brc: string) {
    const pre = ['{', '[', '('];
    const end = ['}', ']', ')'];
    const preIdx = pre.indexOf(brc);
    const endIdx = end.indexOf(brc);
    return preIdx > -1 ? end[preIdx] : pre[endIdx];
  }
}
