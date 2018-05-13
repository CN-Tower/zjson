import { Configs } from './formatter.conf';

export class FmtHelp {
    quoteVal: Function = (val: string, quo: string) => quo + val + quo;
    getSrcRest: Function = (src: string, num: number = 1) => src.length > num ? src.substr(num) : '';

    constructor () { }

    /**
     * 描述: 设置基础缩进值
     * @param conf [Configs]
     */
    setBaseIndent(conf: Configs) {
        let indent = '';
        for (let i = 0; i < conf.indent; i ++) {
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
