import { FmtHelp } from './formatter.help';

/**
 * 格式化配置
 * =======================================
 */
export class Configs {
    public model: 'expand'|'collapse' = 'expand';
    public type: 'json'|'jsObj'|'pyMap' = 'json';
    public indent: 1|2|3|4 = 2;
    public sgIndent: string = ' ';
    public quotes: '\''|'"' = '\''
    public isQuoteKey: boolean = false;

    constructor (conf?: any) {
        if (conf) {
            Object.keys(this).forEach(prop => {
                if (conf.hasOwnProperty(prop)) {
                    this[prop] = conf[prop];
                }
            });
        }
    }
}

/**
 * 格式化数据容器
 * =======================================
 */
export class FmtData {
    public html: string = '';
    public json: string = '';
    public src: any = '';
    public conf: Configs;
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
    public altMesg: string = '';
    public fmtedLines: number = 0;
    public altType: 'info'|'success'|'warning'|'danger' = 'info';
    public fmtedType: 'json'|'jsObj'|'pyMap'|'other'|'' = 'json';
}

/**
 * 格式化期望容器
 * =======================================
 */
export class FmtChecker {
    public exceptVal: string = '';
    public exceptType: string = '';
    public deepIdxCon: string = '';
    public isSrcJson: boolean = true;
    public srcAcType: 'json'|'jsObj'|'pyMap'|'other'|'' = '';
}

/**
 * 格式化基类，不同值对应的HTML元素
 * =======================================
 */
export class FmterEles {
    public dt: FmtData    = new FmtData();
    public st: FmtStatus  = new FmtStatus();
    public ck: FmtChecker = new FmtChecker();
    public help: FmtHelp  = new FmtHelp();
    public level: number  = 0;
    public rowIdx: number = 1;
    public isExpand: boolean  = true;
    public baseIndent: string = '';
    public colon: string = '<span class="z-code z-colon-sign">:</span>';
    public colon_: string = '<span class="z-code z-colon-sign">: </span>';
    public comma: string = '<span class="z-code z-comma-sign">,</span>';
    public backslash: string = '<span class="z-code z-backslash">\\</span>';
    public propFmt: Function = val => `<span class="z-code z-prop-val">${val}</span>`;
    public striFmt: Function = val => `<span class="z-code z-stri-val">${val}</span>`;
    public funcFmt: Function = val => `<span class="z-code z-func-val">${val}</span>`;
    public numbFmt: Function = val => `<span class="z-code z-numb-val">${val}</span>`;
    public boolFmt: Function = val => `<span class="z-code z-bool-val">${val}</span>`;
    public nullFmt: Function = val => `<span class="z-code z-null-val">${val}</span>`;
    public brkline: Function = () => `<span class="z-code z-break-sign">\n</span>${this.rowIndex(++this.rowIdx)}`;
    public rowIndex: Function = idx => {
        let rowIdxes = '<span class="z-idxes-wp fr">';
        String(idx).split('').forEach(i => {
            rowIdxes += `<span class="z-idxes z-idx-${i}"></span>`
        });
        return `<span class="z-row-index no-select z-row-${idx}">${rowIdxes}</span></span>`;
    };
    public brcPre: Function = (sig, cls, isNotEmpty = false) => {
        const id = isNotEmpty ? fn.uuid() : '';
        const eleId = id ? `id="${id}"` : '';
        const expanded = id ? 'expandable expanded' : '';
        const operator = id ? `<span class="operator expanded" data-id="${id}"></span>` : '';
        return `${operator}<span ${eleId} class="z-code z-brace z-${cls}-brace ${expanded}">${sig}<span class="z-obj-val">`;
    };
    public brcEnd: Function = sig => `</span><span class="z-ellipsis"></span>${sig}</span>`
    public getExpInfo: Function = (type, brc) => {
        const exps = {
            ost: {Tpe: 'danger', msg: `Expect a string in line: ${this.rowIdx} !`},
            col: {Tpe: 'danger', msg: `Expect a colon in line: ${this.rowIdx} !`},
            val: {Tpe: 'danger', msg: `Invalid value in line: ${this.rowIdx} !`},
            end: {Tpe: 'danger', msg: `Expect a comma or a "${brc}" in line: ${this.rowIdx} !`},
            war: {Tpe: 'warning', msg: 'Formate success, But the source is not a regular JSON!'},
            scc: {Tpe: 'success', msg: `Success formated ${this.rowIdx} lines !`}
        }
        return exps[type];
    }
    constructor () { }
}
