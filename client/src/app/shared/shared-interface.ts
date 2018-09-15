export interface HintInfo {
  hintMsg: string;
  hintType?: 'danger'|'success';
}
export type EditorModal = 'source' | 'format';
export interface FmtHist {
  name: string;
  src: any;
}
export type DiffType = 'src' | 'new' | string;
