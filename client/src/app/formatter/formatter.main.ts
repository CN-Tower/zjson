import { Configs, FmtData, FmtStatus, FmtChecker, FmterEles } from './formatter.conf';
import { FmtHelp } from './formatter.help';

export class Formatter extends FmterEles {
    constructor() {
        super();
    }
    /**
     * 描述: 初始化格式器
     * ===================================================
     * @arg source [string]
     * @arg conf [Configs] 配置参数
     * @arg onFmted [Function] 回调
     * */
    init(source: string, conf: Configs, onFmted: Function): void {
        this.dt = new FmtData();
        this.st = new FmtStatus();
        this.ck = new FmtChecker();
        this.dt.src = source;
        this.dt.conf = conf;
        this.level = 0;
        this.rowIdx =  1;
        this.isExpand = conf.model === 'expand';
        this.baseIndent = this.help.setBaseIndent(conf);
        try {
            let obj;
            source === '' ? obj = source : eval( `obj = ${source}`);
            if (['object', 'boolean'].includes(typeof obj) || obj === '') {
                this.dt.src = obj;
                this.doFormate1();
                this.st.isSrcValid = true;
                this.st.fmtedType = this.dt.conf.type;
            } else {
                this.doFormate2();
                this.st.fmtedType = this.ck.srcAcType;
            }
        } catch (e) {
            this.doFormate2();
            this.st.fmtedType = this.ck.srcAcType;
        }
        this.dt.html = this.dt.html === '' ? '' : this.rowIndex(1) + this.dt.html;
        if (this.st.isSrcValid) {
            if (this.ck.deepIdxCon) {
                const expBrc = this.help.getBraceMir(this.ck.deepIdxCon.substr(-1));
                this.expection('end', expBrc);
            }
            this.st.fmtedType === conf.type
                ? this.expection('scc')
                : this.expection('war');
        }
        this.st.fmtedLines = this.rowIdx;
        onFmted(this.dt.html, this.dt.json, this.st);
    }

    /**
     * 描述: 格式化正确的OBJ
     * ===================================================
     * @arg object [object]
     * @arg conf [object, opt.] 配置参数
     * */
    private doFormate1() {
        const src  = this.dt.src;
        const conf = this.dt.conf;
        switch (src) {
            case true:
            case false: return [this.boolFmt(src), src];
            case null: return [this.nullFmt(src), src];
            case '': return ['', ''];
        }
        let ps = {
            obj: null, conf: conf, html: '', json: '',
            isToJson: conf.type === 'json'
        };
        ps.obj = ps.isToJson ? JSON.parse(JSON.stringify(src)) : src;
        ps.obj instanceof Array
            ? this.arrayHandler(ps, rt => ps = rt)
            : this.objectHandler(ps, rt => ps = rt);
        this.dt.html = ps.html;
        this.dt.json = ps.json;
        return [ps.html, ps.json, true];
    }

    /**
     * 对数组的处理
     * ============================
     */
    private arrayHandler(ps: any, onEnd: Function) {
        let curIndent: string;
        if (ps.obj.length > 0) {
            ps.html += this.isExpand ? this.brcPre('[', 'arr', true) + this.brkline() : this.brcPre('[', 'arr');
            ps.json += this.isExpand ? '[\n' : '[';
            this.level++;
            for (let i = 0; i < ps.obj.length; i++) {
                curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
                const rtVal = this.valueHandler(ps.obj[i]);
                ps.html += curIndent;
                ps.html += rtVal[0];
                ps.html += this.isExpand
                    ? i < ps.obj.length - 1 ? this.comma + this.brkline() : this.brkline()
                    : i < ps.obj.length - 1 ? this.comma : '';
                ps.json += curIndent;
                ps.json += rtVal[1];
                ps.json += this.isExpand
                    ? i < ps.obj.length - 1 ? ',\n' : '\n'
                    : i < ps.obj.length - 1 ? ',' : '';
            }
            this.level--;
            curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
            ps.html += curIndent + this.brcEnd(']');
            ps.json += curIndent + ']';
        } else {
            ps.html += this.brcPre('[', 'arr') + this.brcEnd(']');
            ps.json += '[]';
        }
        onEnd(ps);
    }

    /**
     * 对对象的处理
     * ============================
     */
    private objectHandler(ps: any, onEnd: Function) {
        let curIndent: string;
        if (fn.len(ps.obj) > 0) {
            ps.html += this.isExpand ? this.brcPre('{', 'obj', true) + this.brkline() : this.brcPre('{', 'obj');
            ps.json += this.isExpand ? '{\n' : '{';
            this.level++;
            let idx = 0;
            const objLength = fn.len(ps.obj);
            for (const key in ps.obj) {
                if (ps.obj.hasOwnProperty(key)) {
                    idx++;
                    const prop = ps.isToJson
                        ? `"${key}"`
                        : ps.conf.isQuoteKey ? this.help.quoteVal(key, ps.conf.quotes) : key;
                    curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
                    const rtVal = this.valueHandler(ps.obj[key]);
                    ps.html += curIndent;
                    ps.html += this.propFmt(prop);
                    ps.html += this.isExpand ? this.colon_ : this.colon;
                    ps.html += rtVal[0];
                    ps.html += this.isExpand
                        ? idx < objLength ? this.comma + this.brkline() : this.brkline()
                        : idx < objLength ? this.comma : '';
                    ps.json += curIndent;
                    ps.json += prop;
                    ps.json += this.isExpand ? ': ' : ':';
                    ps.json += rtVal[1];
                    ps.json += this.isExpand
                        ? idx < objLength ? ',\n' : '\n'
                        : idx < objLength ? ',' : '';
                }
            }
            this.level--;
            curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
            ps.html += curIndent + this.brcEnd('}');
            ps.json += curIndent + '}';
        } else {
            ps.html += this.brcPre('{', 'obj') + this.brcEnd('}');
            ps.json += '{}';
        }
        onEnd(ps);
    }

    /**
     * 对值的分类和处理
     * ============================
     */
    private valueHandler(value: any): any[] {
        const conf = this.dt.conf;
        switch (typeof value) {
            case 'undefined':
                return [this.nullFmt(String(value)), String(value)];
            case 'function':
                return [this.funcFmt(String(value)), String(value)];
            case 'number':
                return [this.numbFmt(value), value];
            case 'boolean':
                return [this.boolFmt(value), value];
            case 'object':
                this.dt.src = value;
                return this.doFormate1();
            case 'string':
                const isToJson = conf && conf.hasOwnProperty('type') && conf.type === 'json';
                const strVal = isToJson ? `"${value.replace(/"/mg, '\\"')}"` : `'${value.replace(/'/mg, '\\\'')}'`;
                const strValue = strVal.split('<').join('&lt;').split('>').join('&gt;');
                return [this.striFmt(strValue), strValue];
            default: return [this.nullFmt(value), value];
        }
    }

    /**
     * 描述: 格式化错误的JSON
     * ===================================================
     * @param src [string]
     * @param conf [Configs]
     */
    private doFormate2() {
        this.dt.src = this.dt.src.replace(/^\s*/, '');
        if (this.dt.src.length > 0) {
            const conf = this.dt.conf;
            switch (this.dt.src[0]) {
                case '\'':
                case '"': this.quotaHandler();  break;
                case ':': this.colonHandler();  break;
                case ',': this.commaHandler();  break;
                case '{': this.objPreHandler(); break;
                case '}': this.objEndHandler(); break;
                case '[': this.arrPreHandler(); break;
                case ']': this.arrEndHandler(); break;
                case '(': this.tupPreHandler(); break;
                case ')': this.tupEndHandler(); break;
            }
            const unicMts = this.dt.src.match(/^u'/);
            const unicMtd = this.dt.src.match(/^u"/);
            if (unicMts || unicMtd) {
                return this.unicHandler(unicMts);
            }
            const numbMt = this.dt.src.match(/^(-?[0-9]+\.?[0-9]*|0[xX][0-9a-fA-F]+)/);
            if (numbMt) {
                return this.numbHandler(numbMt);
            }
            const boolMt = this.dt.src.match(/^(true|false|True|False)/);
            if (boolMt) {
                return this.boolHandler(boolMt);
            }
            const nullMt = this.dt.src.match(/^(null|undefined|None|NaN)/);
            if (nullMt) {
                return this.nullHandler(nullMt);
            }
            this.otheHandler();
        }
    }

    /**
     * 引号
     * ============================
     */
    private quotaHandler() {
        if (this.dt.src[0] === '\'') {
            this.ck.isSrcJson = false;
        }
        const rest = this.help.getSrcRest(this.dt.src);
        const restIdx = rest.indexOf(this.dt.src[0]);
        this.chkExpect(this.dt.src[0]);
        if (restIdx > -1) {
            if (this.ck.exceptVal === 'ost') {
                this.dt.html += this.propFmt(this.dt.src.substr(0, restIdx + 2));
            } else {
                this.dt.html += this.striFmt(this.dt.src.substr(0, restIdx + 2));
            }
            this.dt.json += this.dt.src.substr(0, restIdx + 2);
            this.setExpect(this.dt.src[0]);
            this.dt.src = this.help.getSrcRest(this.dt.src, restIdx + 2);
            this.doFormate2();
        } else {
            this.dt.html += this.striFmt(this.dt.src);
            this.dt.json += this.dt.src;
            this.setExpect('!');
            this.dt.src = '';
            this.doFormate2();
        }
    }

    /**
     * 冒号
     * ============================
     */
    private colonHandler() {
        this.dt.html += this.isExpand ? this.colon_ : this.colon;
        this.dt.json += this.isExpand ? ': ' : ':';
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        this.dt.src = this.help.getSrcRest(this.dt.src);
        this.doFormate2();
    }

    /**
     * 逗号
     * ============================
     */
    private commaHandler() {
        const curIndent = this.help.getCurIndent(this.baseIndent, this.level);
        const bklIdt = this.isExpand ? this.brkline() + curIndent : '';
        this.dt.html += this.comma + bklIdt;
        this.dt.json += this.isExpand ? ',\n' + curIndent : ',';
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        this.dt.src = this.help.getSrcRest(this.dt.src);
        this.doFormate2();
    }

    /**
     * 大括号（前）
     * ============================
     */
    private objPreHandler() {
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        if (this.dt.src[1] && this.dt.src[1] === '}') {
            this.dt.html += this.brcPre('{', 'obj') + this.brcEnd('}');
            this.dt.json += '{}';
            this.setExpect('}');
            this.dt.src = this.help.getSrcRest(this.dt.src, 2);
            this.doFormate2();
        } else {
            this.level ++;
            const curIndent = this.help.getCurIndent(this.baseIndent, this.level);
            this.dt.html += this.isExpand ? this.brcPre('{', 'obj', true) : this.brcPre('{', 'obj');
            this.dt.json += '{';
            this.dt.html += this.isExpand ? this.brkline() + curIndent : '';
            this.dt.json += this.isExpand ? '\n' + curIndent : '';
            this.dt.src = this.help.getSrcRest(this.dt.src);
            this.doFormate2();
        }
    }

    /**
     * 大括号（后）
     * ============================
     */
    private objEndHandler() {
        this.level --;
        const curIndent = this.help.getCurIndent(this.baseIndent, this.level);
        const bklIdt = this.isExpand ? this.brkline() + curIndent : '';
        this.dt.html += bklIdt + this.brcEnd('}');
        this.dt.json += this.isExpand ? `\n${curIndent}}` : '';
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        this.dt.src = this.help.getSrcRest(this.dt.src);
        this.doFormate2();
    }

    /**
     * 中括号（前）
     * ============================
     */
    private arrPreHandler() {
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        if (this.dt.src[1] && this.dt.src[1] === ']') {
            this.dt.html += this.brcPre('[', 'arr') + this.brcEnd(']');
            this.dt.json += '[]';
            this.setExpect(']');
            this.dt.src = this.help.getSrcRest(this.dt.src, 2);
            this.doFormate2();
        } else {
            this.level ++;
            const curIndent = this.help.getCurIndent(this.baseIndent, this.level);
            this.dt.html += this.isExpand ? this.brcPre('[', 'arr', true) : this.brcPre('[', 'arr');
            this.dt.json += '[';
            this.dt.html += this.isExpand ? this.brkline() + curIndent : '';
            this.dt.json += this.isExpand ? '\n' + curIndent : '';
            this.dt.src = this.help.getSrcRest(this.dt.src);
            this.doFormate2();
        }
    }

    /**
     * 中括号（后）
     * ============================
     */
    private arrEndHandler() {
        this.level --;
        const curIndent = this.help.getCurIndent(this.baseIndent, this.level);
        const bklIdt = this.isExpand ? this.brkline() + curIndent : '';
        this.dt.html += bklIdt + this.brcEnd(']');
        this.dt.json += this.isExpand ? `\n${curIndent}]` : '';
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        this.dt.src = this.help.getSrcRest(this.dt.src);
        this.doFormate2();
    }

    /**
     * 括号（前）
     * ============================
     */
    private tupPreHandler() {
        this.ck.srcAcType = this.ck.srcAcType || 'pyMap';
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        if (this.dt.src[1] && this.dt.src[1] === ')') {
            this.dt.html += this.brcPre('(', 'arr') + this.brcEnd(')');
            this.dt.json += '()';
            this.setExpect(')');
            this.dt.src = this.help.getSrcRest(this.dt.src, 2);
            this.doFormate2();
        } else {
            this.level ++;
            const curIndent = this.help.getCurIndent(this.baseIndent, this.level);
            this.dt.html += this.isExpand ? this.brcPre('(', 'arr', true) : this.brcPre('(', 'arr') ;
            this.dt.json += '(';
            this.dt.html += this.isExpand ? this.brkline() + curIndent : '';
            this.dt.json += this.isExpand ? '\n' + curIndent : '';
            this.dt.src = this.help.getSrcRest(this.dt.src);
            this.doFormate2();
        }
    }

    /**
     * 括号（后）
     * ============================
     */
    private tupEndHandler() {
        this.level --;
        const curIndent = this.help.getCurIndent(this.baseIndent, this.level);
        const bklIdt = this.isExpand ? this.brkline() + curIndent : '';
        this.dt.html += bklIdt + this.brcEnd(')');
        this.dt.json += this.isExpand ? `\n${curIndent})` : '';
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        this.dt.src = this.help.getSrcRest(this.dt.src);
        this.doFormate2();
    }

    /**
     * Unicode
     * ============================
     */
    private unicHandler(unicMts) {
        this.ck.srcAcType = this.ck.srcAcType || 'pyMap';
        const rest = this.help.getSrcRest(this.dt.src, 2);
        const restIdx = unicMts ? rest.indexOf('\'') : rest.indexOf('"');
        this.chkExpect('u');
        if (restIdx > -1) {
            if (this.ck.exceptVal === 'ost') {
                this.dt.html += this.propFmt(this.dt.src.substr(0, restIdx + 3));
            } else {
                this.dt.html += this.striFmt(this.dt.src.substr(0, restIdx + 3));
            }
            this.dt.json += this.dt.src.substr(0, restIdx + 3);
            this.setExpect('u');
            this.dt.src = this.help.getSrcRest(this.dt.src, restIdx + 3);
            this.doFormate2();
        } else {
            this.dt.html += this.striFmt(this.dt.src);
            this.dt.json += this.dt.src;
            this.setExpect('!');
            this.dt.src = '';
            this.doFormate2();
        }
    }

    /**
     * 数字
     * ============================
     */
    private numbHandler(numbMt) {
        this.dt.html += this.numbFmt(numbMt[0]);
        this.dt.json += numbMt[0];
        this.chkExpect('n');
        this.setExpect('n');
        this.dt.src = this.help.getSrcRest(this.dt.src, numbMt[0].length);
        this.doFormate2();
    }

    /**
     * 布尔
     * ============================
     */
    private boolHandler(boolMt) {
        this.ck.srcAcType = this.ck.srcAcType || (['True', 'False'].includes(boolMt[0]) ? 'pyMap' : 'jsObj');
        this.dt.html += this.boolFmt(boolMt[0]);
        this.dt.json += boolMt[0];
        this.chkExpect('b');
        this.setExpect('b');
        this.dt.src = this.help.getSrcRest(this.dt.src, boolMt[0].length);
        this.doFormate2();
    }

    /**
     * 空
     * ============================
     */
    private nullHandler(nullMt) {
        this.ck.srcAcType = this.ck.srcAcType || (['None'].includes(nullMt[0]) ? 'pyMap' : 'jsObj');
        this.dt.html += this.nullFmt(nullMt[0]);
        this.dt.json += nullMt[0];
        this.chkExpect('N');
        this.setExpect('N');
        this.dt.src = this.help.getSrcRest(this.dt.src, nullMt[0].length);
        this.doFormate2();
    }

    /**
     * 非法字符
     * ============================
     */
    private otheHandler() {
        const strMatch = this.dt.src.match(/^[^\{\}\[\]\(\):,]*/);
        const strMated = strMatch && strMatch[0] || '';
        if (strMated) {
            this.dt.html += this.nullFmt(strMated);
            this.dt.json += strMated;
            this.chkExpect('!');
            this.dt.src = this.help.getSrcRest(this.dt.src, strMated.length);
            this.doFormate2();
        }
    }

    /**
     * 与期待值匹配
     * ============================
     */
    private chkExpect(sig: string) {
        if (this.st.isSrcValid) {
            switch (this.ck.exceptVal) {
                case 'val':
                    if (':,}])!'.includes(sig)) {
                        this.expection('val');
                    } break;
                case 'ost':
                    if (!'\'"unbN'.includes(sig)) {
                        this.expection('ost');
                    } break;
                case 'end':
                    const endBrc = this.help.getBraceMir(this.ck.exceptType);
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
                this.ck.exceptVal = 'val';
                break;
            case ',':
                this.ck.exceptType === '{'
                    ? this.ck.exceptVal = 'ost'
                    : this.ck.exceptVal = 'val';
                break;
            case '{':
                this.ck.exceptType = sig;
                this.ck.deepIdxCon += sig;
                this.ck.exceptVal = 'ost';
                break;
            case '}':
                this.ck.deepIdxCon = this.ck.deepIdxCon.substr(0, this.ck.deepIdxCon.length - 1);
                this.ck.exceptType = this.ck.deepIdxCon.substr(-1);
                this.ck.exceptVal = 'end';
                break;
            case '[':
                this.ck.exceptType = sig;
                this.ck.deepIdxCon += sig;
                this.ck.exceptVal = 'val';
                break;
            case ']':
                this.ck.deepIdxCon = this.ck.deepIdxCon.substr(0, this.ck.deepIdxCon.length - 1);
                this.ck.exceptType = this.ck.deepIdxCon.substr(-1);
                this.ck.exceptVal = 'end';
                break;
            case '(':
                this.ck.exceptType = sig;
                this.ck.deepIdxCon += sig;
                this.ck.exceptVal = 'val';
                break;
            case ')':
                this.ck.deepIdxCon = this.ck.deepIdxCon.substr(0, this.ck.deepIdxCon.length - 1);
                this.ck.exceptType = this.ck.deepIdxCon.substr(-1);
                this.ck.exceptVal = 'end';
                break;
            case 'u':
            case 'n':
            case 'b':
            case 'N':
            case '"':
            case '\'':
                this.ck.exceptVal === 'ost'
                    ? this.ck.exceptVal = 'col'
                    : this.ck.exceptVal = 'end';
                break;
        }
    }

    /**
     * 期待返回设置
     * ============================
     */
    private expection(type: string, brc: string = '') {
        const altTypes = {
            ost: 'danger', col: 'danger', val: 'danger',
            end: 'danger', war: 'warning', scc: 'success'
        };
        if (['ost', 'col', 'val', 'end'].includes(type)) {
            this.st.isSrcValid = false;
            this.st.errRowIdx = this.rowIdx;
        }
        this.st.altType = altTypes[type];
        this.st.altInfo = {type: type, idx: this.rowIdx, brc: brc};
    }
}
