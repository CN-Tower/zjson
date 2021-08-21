import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { AppService } from '../app.service';
import { MessageService, DiffType, FmtHist, EditorOptions, DiffEditors } from '../@shared/index';
import { Configs } from '../formatter/formatter.conf';
import { Formatter } from '../formatter/formatter.core';
import { TranslateService } from '@ngx-translate/core';
import { MonacoEditorService } from './monaco-eidtor.service';
import { ScreenService } from '../screen.service';

let editorW: number, sourceW: number, originX: number;

@Component({
  selector: 'zjs-diff-editor',
  templateUrl: './zjs-diff-editor.component.html',
  styleUrls: ['./zjs-diff-editor.component.less']
})
export class ZjsDiffEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() diffType: DiffType;
  @Input('fmtConf')
  set fmtConf(fmtConf: Configs) {
    this._fmtConf = fn.deepCopy(fmtConf);
    this._fmtConf.model = 'expand';
  }
  @Input() formated: string;
  @Input() sourcest: string;
  @Input() fullscreen: boolean;
  @Input() isElectronApp: boolean;
  @Output() closePanel: EventEmitter<any> = new EventEmitter();

  public isDifMax: boolean = false;
  public isShowSource: boolean = true;
  public isShowDiffEditor: boolean = false;
  public isLeftFmted: boolean = false;
  public eidtorSub: any;
  public maxFmtSize: any = null;
  public diffEditor: any;
  public editorModel: any;
  public originalModel: any;
  public originalCode: string;
  public modifiedModel: any;
  public modifiedCode: string;
  public originalEditor: any;
  public modifiedEditor: any;
  public isShowOriToTop: boolean = false;
  public isShowModToTop: boolean = false;
  public isShowDifToTop: boolean = false;
  public isOriOnHover: boolean = false;
  public isModOnHover: boolean = false;
  public isDifOnHover: boolean = false;
  public formatter: Formatter = new Formatter();
  public editorOptions: any = {
    language: 'json',
    tabSize: 2,
    theme: this.appService.getEditorTheme(this.appService.getAppTheme()),
    minimap: {
      enabled: false
    }
  };
  public compareHists: any;
  public saveCprTime: string;
  public fullScreenEvent: any = { remove: () => {} };
  private _fmtConf: Configs;
  getTimeStr = () => fn.fmtDate('MM-dd hh:mm:ss', Date.now());
  getCompareHists = () => this.compareHists = this.appService.getCompareHists();

  constructor(
    private appService: AppService,
    private translate: TranslateService,
    private messageService: MessageService,
    private editorService: MonacoEditorService,
    private screenService: ScreenService,
  ) { }

  ngOnInit() {
    this.originalCode = this.formated;
    if (!['newC', 'new'].includes(this.diffType)) this.isShowSource = false;
    if (this.diffType === 'new' || fn.get(this.diffType, 'type') === 'his') {
      this.isLeftFmted = true;
    }
    this.showDiffChange(this.diffType);
    this.getCompareHists();
    this.eidtorSub = this.messageService.editorOptStream.subscribe((eidtorOpt: EditorOptions) => {
      this.updateEditorOptions(eidtorOpt);
    });
  }

  ngOnDestroy() {
    $(win).off('resize', this.resizeEditor);
    this.eidtorSub.unsubscribe();
  }

  ngAfterViewInit() {
    $(win).on('resize', this.resizeEditor);
    if (this.isShowSource) this.initEditEditors();
  }

  initEditEditors() {
    const $win = $(win);
    const mouseMoveHandler = e => this.resizeCodeZone(e);
    this.isShowSource = true;
    fn.defer(() => {
      $('#editor-drager').mousedown(function(e) {
        if ($win.width() > 1025) {
          originX = e.clientX;
          editorW = $('#editor-container').width();
          sourceW = $('#original-container').width();
          $(document).on('mousemove', mouseMoveHandler)
          .one('mouseup', function() {
            $(this).off('mousemove', mouseMoveHandler);
          });
        }
      });
      $('#ori-to-top').click(() => this.editorService.goToPosition(1, this.originalEditor));
      $('#mod-to-top').click(() => this.editorService.goToPosition(1, this.modifiedEditor));
      $('#original-container').hover(() => {
        this.isOriOnHover = true;
        this.toggleEditorToTop('original');
      }, () => {
        this.isOriOnHover = false;
        this.isShowOriToTop = false;
      });
      $('#modified-container').hover(() => {
        this.isModOnHover = true;
        this.toggleEditorToTop('modified');
      }, () => {
        this.isModOnHover = false;
        this.isShowModToTop = false;
      });
    });
  }

  toggleEditorToTop(edtName: DiffEditors) {
    fn.match(edtName, {
      'original': () => {
        this.isShowOriToTop = this.isOriOnHover && this.editorService.checkIsScrolled(this.originalEditor);
      },
      'modified': () => {
        this.isShowModToTop = this.isModOnHover && this.editorService.checkIsScrolled(this.modifiedEditor);
      }
    });
  }

  resizeCodeZone(e: any) {
    const $original = $('#original-container');
    const $modified = $('#modified-container');
    const deltaX = e.clientX - originX;
    let srcW = sourceW + deltaX;
    if (srcW / editorW < 0.35) srcW = editorW * 0.35;
    if (srcW / editorW > 0.64) srcW = editorW * 0.64;
    const srcP = (srcW / editorW) * 100;
    $original.css('width', srcP + '%');
    $modified.css('width', 99 - srcP + '%');
    this.resizeEditor();
    return false;
  }

  resizeEditor = () => {
    $('#zjs-diff-editor .panel').width($(win).width() - (this.fullscreen ? 0 : 42));
    if (this.diffEditor) this.diffEditor.layout();
    if (this.originalEditor && this.modifiedEditor) {
      this.originalEditor.layout();
      this.modifiedEditor.layout();
    }
  }

  afterEditorInit(editor: any, type: DiffEditors) {
    fn.match(type, {
      'original': () => this.originalEditor = editor,
      'modified': () => this.modifiedEditor = editor
    });
    if (editor) editor.onDidScrollChange(() => this.toggleEditorToTop(type));
    this.updateEditorOptions('tabsize');
    this.updateEditorOptions('theme');
  }

  updateEditorOptions(type: EditorOptions) {
    if (this.originalEditor && this.modifiedEditor) {
      fn.match(type, {
        'tabsize': () => {
          this.editorService.updateEditorTabsize(this.originalEditor, this.modifiedEditor);
        },
        'theme': () => {
          this.editorService.updateEditorTheme(this.originalEditor, this.modifiedEditor);
        }
      });
    }
  }

  afterDiffEditorInit(editorInfo: any) {
    this.diffEditor = editorInfo.editor;
    this.editorModel = editorInfo.editorModel;
    this.diffEditor.onDidUpdateDiff(() => this.messageService.hideLoading());
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
    this.alertNotice(this.translate.instant('exchangeSuccess'));
    this.initDiffEditor();
  }

  showDiffChange(diffType: DiffType, isShowHint: boolean = false) {
    fn.match(diffType, {
      'newC': () => {
        if (isShowHint) {
          if (this.originalCode === '' && this.modifiedCode === '') {
            this.alertNotice(this.translate.instant('_clear'), 'danger');
          } else {
            this.alertNotice(this.translate.instant('clearSuccess'));
          }
        }
        this.isShowSource = true;
        this.isLeftFmted = false;
        this.originalCode = '';
        this.modifiedCode = '';
        this.initEditEditors();
      },
      'new': () => {
        this.isShowSource = true;
        this.modifiedCode = '';
        this.initEditEditors();
      },
      'src': () => {
        this.formatAndInitEditor(this.sourcest);
      },
      'default': () => {
        fn.match(fn.get(diffType, 'type'), {
          'his': () => {
            this.formatAndInitEditor(fn.get(diffType, '/hist/src'));
          },
          'cpr': () => {
            this.showOrRmFmtHist(diffType);
          }
        });
      }
    });
  }

  formatAndInitEditor(code: string, type: DiffEditors = 'modified') {
    this.formatter.format(code, this._fmtConf, this).subscribe(fmted => {
      this.modifiedCode = fmted.fmtResult;
      fn.match(type, {
        'original': () => this.originalCode = fmted.fmtResult,
        'modified': () => this.modifiedCode = fmted.fmtResult
      });
      this.initDiffEditor();
    });
  }

  initDiffEditor() {
    if (this.isShowSource) return;
    this.isShowDiffEditor = false;
    this.messageService.showLoading(3000);
    this.originalModel = { code: this.originalCode };
    this.modifiedModel = { code: this.modifiedCode };
    fn.defer(() => this.isShowDiffEditor = true);
  }

  copyEditor(type: DiffEditors) {
    if (type === 'original' && this.originalCode) {
      fn.copyText(this.originalCode);
    } else if (type === 'modified' && this.modifiedCode) {
      fn.copyText(this.modifiedCode);
    } else {
      return this.alertNotice(this.translate.instant('_copy'), 'danger');
    }
    this.alertNotice(this.translate.instant('copySuccess'));
  }

  clearEditor(type: DiffEditors) {
    if (type === 'original' && this.originalCode) {
      this.originalCode = '';
      this.initDiffEditor();
    } else if (type === 'modified' && this.modifiedCode) {
      this.modifiedCode = '';
      this.initDiffEditor();
    } else {
      return this.alertNotice(this.translate.instant('_clear'), 'danger');
    }
    this.alertNotice(this.translate.instant('clearSuccess'));
  }

  doFormateCode(type: DiffEditors) {
    if (type === 'original' && this.originalCode) {
      this.formatter.format(this.originalCode, this._fmtConf, this).subscribe(fmted => {
        this.originalCode = fmted.fmtResult;
      });
    } else if (type === 'modified' && this.modifiedCode) {
      this.formatter.format(this.modifiedCode, this._fmtConf, this).subscribe(fmted => {
        this.modifiedCode = fmted.fmtResult;
      });
    } else {
      return this.alertNotice(this.translate.instant('_format'), 'danger');
    }
    this.alertNotice(this.translate.instant('formatSuccess'));
  }

  showOrRmFmtHist($e: any) {
    if (fn.get($e, '/e/target/tagName') === 'I') {
      this.appService.rmvCompareHists($e.hist);
      this.messageService.changeCompareHist();
      this.getCompareHists();
      this.alertNotice(this.translate.instant('removeSavedSuccess'), 'success');
    } else {
      this.originalCode = $e.hist.ori;
      this.modifiedCode = $e.hist.mod;
      this.isShowSource = false;
      this.initDiffEditor();
    }
  }

  saveCompare() {
    if (!this.originalCode && !this.modifiedCode) {
      this.alertNotice(this.translate.instant('_save'), 'danger');
    } else {
      const svTime = this.getTimeStr();
      if (this.saveCprTime !== svTime) {
        this.saveCprTime = svTime;
        const cprPre = this.originalCode.replace(/[\s\n]/mg, '');
        const cprPre_ = this.modifiedCode.replace(/[\s\n]/mg, '');
        const appdix = cprPre.length > 10 ? cprPre.substr(0, 10) + ' ...' : cprPre;
        const appdix_ = cprPre_.length > 10 ? cprPre_.substr(0, 10) + ' ...' : cprPre_;
        const histName = this.saveCprTime + ` ( ${appdix} | ${appdix_} )`;
        const hist = {name: histName, ori: this.originalCode, mod: this.modifiedCode};
        this.appService.setCompareHists(hist);
        this.messageService.changeCompareHist();
        this.getCompareHists();
        this.alertNotice(this.translate.instant('saveSuccess'));
      }
    }
  }

  maximalPanel() {
    const panel = $('#zjs-diff-editor .panel')[0];
    this.isDifMax = true;
    this.screenService.fullScreen(panel, () => {
      this.fullScreenEvent = this.screenService.fullScreenChange(() => {
        this.minimalPanel();
        this.fullScreenEvent.remove();
      });
    });
  }

  minimalPanel() {
    this.screenService.exitFullScreen(() => this.fullScreenEvent.remove());
    this.isDifMax = false;
  }

  closeDiffEditor() {
    this.closePanel.emit();
  }

  alertNotice(message: string, type: 'danger'|'success' = 'success') {
    this.messageService.showHint({hintMsg: message, hintType: type});
  }
}
