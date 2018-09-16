import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { AppService } from '../app.service';
import { DiffType, FmtHist, SharedBroadcastService } from '../shared/index';
import { Configs } from '../formatter/formatter.conf';
import { Formatter } from '../formatter/formatter.core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'zjs-diff-editor',
  templateUrl: './zjs-diff-editor.component.html',
  styleUrls: ['./zjs-diff-editor.component.less']
})
export class ZjsDiffEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() diffType: DiffType;
  @Input() fmtConf: Configs;
  @Input() formated: string;
  @Input() sourcest: string;
  @Output() closePanel: EventEmitter<any> = new EventEmitter();
  @Output() saveModified: EventEmitter<any> = new EventEmitter();
  isDifMax: boolean = false;
  isShowEditor: boolean = false;
  isLeftFmted: boolean = true;
  maxFmtSize: any = null;
  editor: any;
  editorModel: any;
  originalModel: any;
  originalCode: string;
  modifiedModel: any;
  modifiedCode: string;
  private _fmtConf: Configs;
  formatter: Formatter = new Formatter();

  constructor(
    private appService: AppService,
    private translate: TranslateService,
    private broadcast: SharedBroadcastService
  ) { }

  ngOnInit() {
    this._fmtConf = fn.deepCopy(this.fmtConf);
    this._fmtConf.model = 'expand';
    this.originalCode = this.formated;
    this.showDiffChange(this.diffType);
  }

  ngAfterViewInit() {
    $(win).on('resize', this.resizeEditor);
  }

  ngOnDestroy() {
    $(win).off('resize', this.resizeEditor);
  }

  resizeEditor = () => {
    if (this.editor) this.editor.layout();
  }

  afterEditorInit(editorInfo: any) {
    this.editor = editorInfo.editor;
    this.editorModel = editorInfo.editorModel;
    this.broadcast.hideLoading();
    // this.editor.onDidUpdateDiff(() => this.broadcast.hideLoading());
    this.editorModel.onDidChangeContent(() => {
      this.modifiedCode = this.getModelContent();
    });
  }

  getModelContent = () => this.editorModel.getLinesContent().join('\n');

  exchangeModels() {
    const tmpModelCode = this.originalCode;
    this.originalCode = this.modifiedCode;
    this.modifiedCode = tmpModelCode;
    this.isLeftFmted = false;
    this.initDiffEditor();
  }

  doFormate() {
    if (this.modifiedCode) {
      this.formatAndInitEditor(this.modifiedCode);
    } else {
      this.alertNotice(this.translate.instant('_format'), 'danger');
    }
  }

  showDiffChange(diffType: DiffType) {
    fn.match(diffType, {
      'new': () => {
        this.modifiedCode = '';
        this.initDiffEditor();
      },
      'src': () => this.formatAndInitEditor(this.sourcest),
      '@default': () => {
        const fmtHists: FmtHist[] = this.appService.getFmtHists();
        const modelCode = fn.get(fn.find(fmtHists, {name: diffType}), 'src');
        this.formatAndInitEditor(modelCode);
      }
    });
  }

  formatAndInitEditor(code: string) {
    this.formatter.format(code, this._fmtConf).subscribe(fmted => {
      this.modifiedCode = fmted.fmtResult;
      this.initDiffEditor();
    });
  }

  initDiffEditor() {
    this.isShowEditor = false;
    this.broadcast.showLoading(3000);
    this.originalModel = { code: this.originalCode };
    this.modifiedModel = { code: this.modifiedCode };
    fn.defer(() => this.isShowEditor = true);
  }

  clearModified() {
    if (this.modifiedCode) {
      this.showDiffChange('new');
    } else {
      this.alertNotice(this.translate.instant('_clear'), 'danger');
    }
  }

  saveModifiedChange() {
    this.saveModified.emit(this.modifiedCode);
    this.alertNotice(this.translate.instant('saveSuccess'));
  }

  copyModified() {
    if (this.modifiedCode) {
      fn.copyText(this.modifiedCode);
      this.alertNotice(this.translate.instant('copySuccess'));
    } else {
      this.alertNotice(this.translate.instant('_copy'), 'danger');
    }
  }

  maximalPanel() {
    const panel = $('#zjs-diff-editor .panel')[0];
    fn.fullScreen(panel);
    this.isDifMax = true;
    fn.interval('checkIsFullScreen', 100, () => {
      if (fn.isFullScreen(panel)) {
        fn.interval('checkIsFullScreen', false);
        fn.timeout(100, () => fn.fullScreenChange(() => this.minimalPanel()));
      }
    });
  }

  minimalPanel() {
    fn.exitFullScreen($('#zjs-diff-editor .panel')[0]);
    fn.fullScreenChange(false);
    this.isDifMax = false;
  }

  closeDiffEditor() {
    this.closePanel.emit();
  }

  alertNotice(message: string, type: 'danger'|'success' = 'success') {
    this.broadcast.showHint({hintMsg: message, hintType: type});
  }
}
