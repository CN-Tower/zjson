import { Configs } from './formatter.conf';

export class FmtHelp {
  constructor() {}

  /**
   * 描述: 给String打引号
   */
  quoteVal = (val: string, quo: string) => quo + val + quo;

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
