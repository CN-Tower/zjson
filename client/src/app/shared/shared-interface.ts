export interface HintInfo {
  hintMsg: string;
  hintType?: 'danger'|'success';
}
export type EditorModal = 'source' | 'format';
export type DiffEditors = 'original' | 'modified';
export interface FmtHist {
  name: string;
  src: any;
}
export type DiffType = 'src' | 'new' | 'newC' | any;
export interface IgnoreInfo {
  ignoreTime: number;
  ignoreVersion: string;
}
export type QuoteIdx = 1 | 2 | 3 | 4;
export type Indent = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export interface QuoteInfo {
  quoteIdx: QuoteIdx;
  isNormal?: boolean;
}
export type AlertType = 'info' | 'success' | 'warning' | 'danger';
export interface AlertInfo {
  type: FmtErrType;
  idx: number;
  brc: string;
}
export type FmtErrType = 'ost' | 'col' | 'val' | 'end' | 'scc' | 'war' | 'err' | '';
export type FmtedType = 'json' | 'jsObj' | 'pyMap' | 'other' | '';
export type EditorOptions = 'tabsize' | 'theme';
