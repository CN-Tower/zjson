import { Component, OnInit, AfterViewInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { AppService } from './app.service';
import { SharedBroadcastService, EditorModal } from './shared/index';
import { ZjsApp } from './app.component.class';
import { Configs } from './formatter/formatter.conf';

let editorW: number, sourceW: number, originX: number;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less', './shared/theme.less'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent extends ZjsApp implements OnInit, AfterViewInit {

  constructor(
    public appService: AppService,
    private translate: TranslateService,
    private broadcast: SharedBroadcastService
  ) {
    super(appService);
    const lang = this.appService.getAppLang() || translate.getBrowserLang();
    translate.addLangs(['zh', 'en']);
    translate.setDefaultLang('zh');
    this.lang = lang.match(/en|zh/) ? lang : 'zh';
    translate.use(this.lang);
    this.greeting = this.appService.getGreeting(this.lang);
    this.conf = new Configs();
    this.appService.initFmtHists();
  }

  ngOnInit() {
    this.getFmtHists();
    this.checkAndUpdateApp();
    this.doTranslate();
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.doTranslate();
      this.translateAltMsgs();
    });
  }

  ngAfterViewInit() {
    win['isRendered'] = true;
    const $win = $(win);
    this.isWindowBig = $win.width() >= 1025;
    $win.resize(() => this.onWindowResize());
    this.animateGreeting();
    this.initAppStyles();
    this.fixCodeZoneWidth();
    this.initSearchIptEvent();
    this.initUploadEvent();
    this.initOpenDragEvent();
    this.initResizeZconEvent();
    this.onWindowResize();
    fn.timeout(500, () => this.onWindowResize());
    fn.defer(() => this.onChangeTheme(this.appService.getAppTheme()));
    $(document).on('click keyup', () => this.isPageActive = true);
  }

  /**
   * 执行json格式化
   * =================================*/
  doFormate(fmtSrc?: any, isSilence?: boolean) {
    if (fmtSrc === undefined) {
      fmtSrc = this.sourcest;
    } else if (typeof fmtSrc === 'boolean') {
      isSilence = fmtSrc;
      fmtSrc = this.sourcest;
    }
    this.isOriginEmpty = !this.formated;
    if (!this.sourcest && !this.fmtSourcest && !isSilence) {
      this.alertNotice(this.translate.instant('_format'), 'danger');
    } else {
      fmtSrc = fmtSrc.trim().replace(/\&/mg, '&amp;')
        .replace(/\</mg, '&lt;').replace(/\>/mg, '&gt;');
      this.formatter.init(fmtSrc, this.conf , (html, json, fmtSt) => {
        this.formated = json;
        this.fmtSt = fmtSt;
        if (html) {
          this.alertType = this.fmtSt.altType;
          this.alertInfo = this.fmtSt.altInfo;
          this.translateAltMsgs();
          this.animateGreeting();
        } else {
          this.emptyFmt();
        }
        this.isOriginEmpty = !this.formated;
        this.isModelExpand = this.conf.model === 'expand';
        fn.defer(() => {
          this.addScrollTop(0);
          this.initStIdx();
          this.revealErrorRow();
          this.fmtSourcest = fmtSrc;
        });
      });
    }
  }

  /**
   * 设置App的显示语言
   * =================================*/
  selectLanguage(lang: 'zh'|'en') {
    this.lang = lang;
    this.translate.use(lang);
    this.appService.setAppLang(lang);
    this.animateGreeting();
  }

  /**
   * 弹出操作通知
   * =================================*/
  alertNotice(message: string, type: 'danger'|'success' = 'success') {
    this.broadcast.showHint({hintMsg: message, hintType: type});
  }

  /**
   * 给错误行设置红底
   * =================================*/
  revealErrorRow() {
    if (this.fmtEditor) {
      if (!this.fmtSt.isSrcValid) {
        const errRowIdx = this.fmtSt.errRowIdx;
        this.fmtEditor.revealPositionInCenter({ lineNumber: errRowIdx, column: 1 });
        fn.defer(() => this.errRowDecorations = this.fmtEditor.deltaDecorations([], [
          {
            range: new win.monaco.Range(errRowIdx, 1, errRowIdx, 1),
            options: {
              isWholeLine: true,
              className: 'myContentClass',
              glyphMarginClassName: 'myGlyphMarginClass'
            }
          }
        ]));
        // const scrollTop = errIdx * 18 - 240;
        // this.scrollTo(scrollTop);
        // this.addScrollTop(scrollTop);
      } else {
        this.fmtEditor.deltaDecorations(this.errRowDecorations, []);
      }
    }
  }

  /**
   * 更换App主题
   * =================================*/
  onChangeTheme(them: string) {
    if (this.theme !== them) {
      this.theme = them;
      this.appService.setAppTheme(them);
    }
    this.updateTheme(them);
  }

  /**
   * 最大化窗口
   * =================================*/
  maximalPanel(type: 'src'|'fmt') {
    let panel;
    if (type === 'src') {
        this.isSrcMax = true;
        panel = $('#zjs-source .panel')[0];
    } else if (type === 'fmt') {
        this.isFmtMax = true;
        panel = $('#zjs-format .panel')[0];
    }
    fn.fullScreen(panel);
    fn.interval('checkIsFullScreen', 100, () => {
      if (fn.isFullScreen(panel)) {
        fn.interval('checkIsFullScreen', false);
        fn.timeout(100, () => fn.fullScreenChange(() => this.minimalPanel()));
      }
    });
    const $win = $(win);
    const winH = $win.height() - 20;
    const winW = $win.width();
    const pW = winW - 40;
    const pH =  winH > 500 ? winH : 500;
    if (type === 'src') {
        this.maxSrcSize = {height: pH + 'px', width: pW + 'px'};
        this.isSrcMax = true;
    } else if (type === 'fmt') {
        this.maxFmtSize = {height: pH + 'px', width: pW + 'px'};
        this.isFmtMax = true;
    }
  }

  /**
   * 最小化窗口
   * =================================*/
  minimalPanel(type?: 'src'|'fmt') {
    fn.exitFullScreen($('#zjs-source .panel')[0]);
    fn.exitFullScreen($('#zjs-format .panel')[0]);
    fn.fullScreenChange(false);
    this.isSrcMax = false;
    this.isFmtMax = false;
    this.maxSrcSize = null;
    this.maxFmtSize = null;
    fn.defer(() => this.onWindowResize());
  }

  /**
   * 上传操作
   * =================================*/
  upload() {
    $('input.upload').click();
  }

  /**
   * 下载操作
   * =================================*/
  download() {
    if (this.formated) {
      const blob = new Blob([this.formated], {type: ''});
      saveAs(blob, `zjson-${String(fn.time()).substr(-6)}.json`);
    } else {
      this.alertNotice(this.translate.instant('_download'), 'danger');
    }
  }

  /**
   * 窗口推到左边
   * =================================*/
  pushToLeft() {
    this.asyncEditorWidth();
    this.animateEditorWidth('source', '35%');
    this.animateEditorWidth('format', '64%');
    this.isOnLeft = true;
  }

  /**
   * 窗口推到中间
   * =================================*/
  pushToMiddle() {
    this.asyncEditorWidth();
    if ($('#zjs-source').width() / $('#zjs-editors').width() >= 0.495) {
      this.animateEditorWidth('source', '49.5%');
      this.animateEditorWidth('format', '49.5%');
    } else {
      this.animateEditorWidth('format', '49.5%');
      this.animateEditorWidth('source', '49.5%');
    }
    this.isOnLeft = false;
  }

  asyncEditorWidth() {
    fn.interval('asyncSrcEdtW', 0, () => this.updateSourceEditor());
    fn.interval('asyncFmtEdtW', 0, () => this.updateFormatEditor());
  }

  animateEditorWidth(editor: EditorModal, percent: string) {
    fn.match(editor, {
      'source': () => $('#zjs-source').animate({width: percent}, 500, () => {
        fn.interval('asyncSrcEdtW', false);
      }),
      'format': () => $('#zjs-format').animate({width: percent}, 500, () => {
        fn.interval('asyncFmtEdtW', false);
      })
    });
  }

  /**
   * 右边的内容显示到左边
   * =================================*/
  showInLeft() {
    this.sourcest = this.formated;
    $('.src-text').scrollTop(0);
  }

  /**
   * 保存到历史记录
   * =================================*/
  saveFmted() {
    const svTime = this.getTimeStr();
    if (this.formated) {
      this.sourcest = this.formated;
      if (this.saveFmtTime !== svTime) {
        this.saveFmtTime = svTime;
        const fmtPre = this.formated.replace(/[\s\n]/mg, '');
        const appdix = fmtPre.length > 15 ? fmtPre.substr(0, 15) + ' ...' : fmtPre;
        const histName = this.saveFmtTime + ` ( ${appdix} )`;
        const hist = {src: this.formated, name: histName};
        this.appService.setFmtHists(hist);
        this.getFmtHists();
        this.alertNotice(this.translate.instant('saveSuccess'), 'success');
      }
    } else {
      this.alertNotice(this.translate.instant('_save'), 'danger');
    }
  }

  /**
   * 显示历史记录
   * =================================*/
  showOrRmFmtHist($e: any) {
    if ($e.e.target.tagName === 'I') {
      this.appService.rmvFmtHists($e.hist);
      this.getFmtHists();
      this.alertNotice(this.translate.instant('removeSavedSuccess'), 'success');
    } else {
      this.sourcest = $e.hist.src;
      this.doFormate(this.sourcest);
    }
  }

  /**
   * 复制操作
   * =================================*/
  copyFmted() {
    if (this.formated) {
      fn.copyText(this.formated);
      this.alertNotice(this.translate.instant('copySuccess'), 'success');
    } else {
      this.alertNotice(this.translate.instant('_copy'), 'danger');
    }
  }

  /**
   * 清空源始代码
   * =================================*/
  clearSourc() {
    if (this.sourcest) {
      this.sourcest = '';
    } else {
      this.alertNotice(this.translate.instant('_clear'), 'danger');
    }
  }

  /**
   * 清空操作
   * =================================*/
  clearFmted() {
    if (this.fmtSourcest) {
      this.emptyFmt();
    } else {
      this.alertNotice(this.translate.instant('_clear'), 'danger');
    }
  }

  /**
   * 执行清空
   * =================================*/
  emptyFmt() {
    this.alertType = 'info';
    this.formated = '';
    this.fmtSourcest = '';
    if (!this.isOriginEmpty) this.animateGreeting();
    /**electron enable sta_*//*
    fn.defer(() => win.onLinksLoad());
    *//**electron enable end_*/
  }

  /**
   * 全部展开
   * =================================*/
  expandAll() {
    this.doFormate(this.formated);
    this.updateFormatEditor();
  }

  /**
   * 问候语动画
   * ===================================*/
  animateGreeting() {
    if (this.alertType === 'info' && this.isWindowBig) {
      fn.defer(() => {
        const $greeting = $('#z-greeting');
        const greetingIn = () => {
          this.greeting = this.appService.getGreeting(this.lang);
          $greeting.removeClass().addClass(`${this.appService.getAnimateClass('in')} animated`);
        };
        greetingIn();
        fn.interval('greeting', 5000, () => {
          $greeting.removeClass().addClass(`${this.appService.getAnimateClass('out')} animated`);
          fn.timeout(500, () => {
            greetingIn();
            fn.timeout(1000, () => $greeting.removeClass());
          });
        });
      });
    } else {
      fn.interval('greeting', false);
    }
  }

  /**
   * 改变window大小
   * ===================================*/
  onWindowResize() {
    const $win = $(win);
    const $maxPanel = $('.z-maximal');
    const $work = $('#zjs-editors');
    const $panel = $work.find('.panel:not(.z-maximal)');
    const $zSrce = $('#zjs-source');
    const $zJson = $('#zjs-format');
    const winW = $win.width();
    const winH = $win.height();
    const wH = winH - 100;
    $work.height(wH);
    $panel.height(wH - 10);
    if (winW >= 1025) {
      if (!this.isWindowBig) {
        this.isWindowBig = true;
        this.animateGreeting();
        $zSrce.css('width', '35%');
        $zJson.css('width', '64%');
        this.isOnLeft = true;
      }
    } else {
      if (this.isWindowBig) {
        this.isWindowBig = false;
        this.animateGreeting();
        $zSrce.css('width', '49.5%');
        $zJson.css('width', '49.5%');
        this.isOnLeft = false;
      }
    }
    if ($maxPanel.length > 0) {
      $maxPanel.width(winW - 40).height(winH - 30);
    }
    $('.z-fmt-alts').width((winW - 40) * 0.35);
    this.updateSourceEditor();
    this.updateFormatEditor();
  }

  initAppStyles() {
    const that = this;
    $('#z-container').click(function() {
      that.addScrollTop($(this).scrollTop());
      that.initStIdx();
    });
    const $chars = $(`<span id="zjs-chars" hidden>${fn.array(50, 'x').join('')}</span>`);
    $('body').append($chars);
  }

  /**
   * 初始化代码窗宽度
   * ===================================*/
  fixCodeZoneWidth() {
    const $zSrce = $('#zjs-source');
    const $zJson = $('#zjs-format');
    if (!this.isWindowBig) {
      $zSrce.css('width', '49.5%');
      $zJson.css('width', '49.5%');
      this.isOnLeft = false;
    }
  }

  /**
   * 改变window大小
   * ===================================*/
  initResizeZconEvent() {
    const $win = $(win);
    const mouseMoveHandler = e => this.resizeCodeZone(e);
    $('#zjs-drager').mousedown(function(e) {
      if ($win.width() > 1025) {
        originX = e.clientX;
        editorW = $('#zjs-editors').width();
        sourceW = $('#zjs-source').width();
        $(document).on('mousemove', mouseMoveHandler)
        .one('mouseup', function() {
          $(this).off('mousemove', mouseMoveHandler);
        });
      }
    });
  }

  /**
   * 代码窗的拖拉事件
   * =================================*/
  resizeCodeZone(e: any) {
    const $zSrce = $('#zjs-source');
    const $zJson = $('#zjs-format');
    const deltaX = e.clientX - originX;
    let srcW = sourceW + deltaX;
    if (srcW / editorW < 0.35) srcW = editorW * 0.35;
    if (srcW / editorW > 0.64) srcW = editorW * 0.64;
    const srcP = (srcW / editorW) * 100;
    $zSrce.css('width', srcP + '%');
    $zJson.css('width', 99 - srcP + '%');
    this.isOnLeft = Math.abs(srcP - 35) < 0.1;
    this.updateSourceEditor();
    this.updateFormatEditor();
    return false;
  }

  /**
   * 当搜索框宽度为0时则隐藏
   * ===================================*/
  initSearchIptEvent() {
    const searchIpt = document.querySelector('#search-ipt');
    const $ipt = $(searchIpt).keydown(e => {
      if (e.keyCode === 13) this.getSharedJson();
    });
    $('.search').mouseover(() => $ipt.removeClass('opacity0').focus());
    const hideIpt = () => {
      if ($ipt.width() < 5) $ipt.addClass('opacity0').val('');
    };
    ['transitionend', 'webkitTransitionEnd', 'mozTransitionEnd'].forEach(e => {
      searchIpt.addEventListener(e, hideIpt);
    });
  }

  /**
   * 设置上传事件
   * ===================================*/
  initUploadEvent() {
    const that = this;
    $('input.upload').change(function(e) {
      const file = this.files[0];
      that.readSrcFile(file, true);
    });
  }

  /**
   * 拖放文件事件
   * ===================================*/
  initOpenDragEvent() {
    $(document)
    .on('dragenter dragover dragleave', event => event.preventDefault())
    .on('drop', event => {
      event.preventDefault();
      const file = event.originalEvent.dataTransfer.files[0];
      if (file && file.size) this.readSrcFile(file, false);
    });
  }

  afterEditorInit(editor: any, editorName: EditorModal) {
    fn.match(editorName, {
      'source': () => {
        this.srcEditor = editor;
        this.updateSourceEditor();
        this.updateFormatEditor();
      },
      'format': () => {
        this.fmtEditor = editor;
        this.updateSourceEditor();
        this.updateFormatEditor();
      }
    });
    this.updateTabsize();
  }

  updateTheme(theme: string = this.theme) {
    fn.defer(() => {
      theme = this.appService.getEditorTheme(theme);
      if (this.srcEditor && this.fmtEditor) {
        win.monaco.editor.setTheme(theme);
      }
    });
  }

  updateTabsize() {
    this.doFormate(true);
    if (this.srcEditor && this.fmtEditor) {
      [this.srcEditor, this.fmtEditor].forEach(editor => {
        const model = editor.getModel();
        model.updateOptions({tabSize: this.conf.indent});
      });
    }
  }

  updateSourceEditor() {
    fn.defer(() => {
      if (this.srcEditor) {
        this.srcEditor.layout();
        const srcWidth = $('#source-container').width() - 78;
        const charWidth = $('#zjs-chars').width() / 50;
        this.srcEditor.updateOptions({
          wordWrap: 'wordWrapColumn',
          wordWrapColumn: Math.floor(srcWidth / charWidth)
        });
      }
    });
  }

  updateFormatEditor() {
    fn.defer(() => {
      if (this.fmtEditor) {
        this.fmtEditor.layout();
        if (this.conf.model === 'expand') {
          this.fmtEditor.updateOptions({
            wordWrap: 'off'
          });
        } else {
          const minimapW = $('#format-container .minimap').width();
          const fmtWidth = $('#format-container').width() - 78 - minimapW;
          const charWidth = $('#zjs-chars').width() / 50;
          this.fmtEditor.updateOptions({
            wordWrap: 'wordWrapColumn',
            wordWrapColumn: Math.floor(fmtWidth / charWidth)
          });
        }
      }
    });
  }

  /**
   * 读取文件
   * ===================================*/
  readSrcFile(file: any, isInitFileIpt: boolean) {
    if (file.size > 80000) {
      this.alertNotice(this.translate.instant('_largeFile'), 'danger');
      if (isInitFileIpt) {
        $('input.upload').replaceWith('<input type="file" class="upload hide">');
        this.initUploadEvent();
      }
    } else {
      const reader = new FileReader();
      if (file.type.match(/image/)) {
        reader.readAsDataURL(file);
      } else if (file.type === 'text/plain') {
        reader.readAsText(file, 'gb2312');
      } else {
        reader.readAsText(file, 'utf8');
      }
      reader.addEventListener('load', () => {
        this.sourcest = reader.result.toString();
        this.doFormate(this.sourcest);
        if (isInitFileIpt) {
          $('input.upload').replaceWith('<input type="file" class="upload hide">');
          this.initUploadEvent();
        }
      });
    }
  }

  /**
   * 上一步和下一步位置
   * ===================================*/
  lastPosition() {
    this.stIdx --;
    if (this.stIdx < 0) this.stIdx = 0;
    this.scrollTo(this.stArr[this.stIdx]);
    this.nextPztCursor();
  }

  nextPosition() {
    this.stIdx ++;
    if (this.stIdx > this.stArr.length - 1) this.stIdx = this.stArr.length - 1;
    this.scrollTo(this.stArr[this.stIdx]);
    this.nextPztCursor();
  }

  scrollTo(top: number) {
    $('#z-container').scrollTop(top);
  }

  initStIdx() {
    this.stIdx = this.stArr.length > 0 ? this.stArr.length - 1 : 0;
    this.nextPztCursor();
  }

  nextPztCursor() {
    if (this.stIdx === this.stArr.length - 1) {
      $('.next-postion').addClass('no-cursor');
    } else {
      $('.next-postion').removeClass('no-cursor');
    }
  }

  /**
   * 点击代码时增加位置信息
   * ===================================*/
  addScrollTop(top: number) {
    if (top !== this.stArr[this.stArr.length - 1]) {
      this.stArr.push(top);
      if (this.stArr.length > 32) {
        this.stArr.shift();
      }
    }
  }

  /**
   * i18n国际化
   * =================================*/
  doTranslate() {
    this.i18n.confs.show = this.translate.instant('showConfs');
    this.i18n.confs.hide = this.translate.instant('hideConfs');
    this.i18n.model.expand = this.translate.instant('expand');
    this.i18n.model.combine = this.translate.instant('combine');
  }

  translateAltMsgs() {
    switch (this.alertInfo.type) {
      case 'ost':
        this.i18n.alert.ost = this.translate.instant('alert.ost', {
          rowIdx: this.alertInfo.idx
        });
        break;
      case 'col':
        this.i18n.alert.col = this.translate.instant('alert.col', {
          rowIdx: this.alertInfo.idx
        });
        break;
      case 'val':
        this.i18n.alert.val = this.translate.instant('alert.val', {
          rowIdx: this.alertInfo.idx
        });
        break;
      case 'scc':
        this.i18n.alert.scc = this.translate.instant('alert.scc', {
          rowIdx: this.alertInfo.idx
        });
        break;
      case 'war':
        this.i18n.alert.war = this.translate.instant('alert.war', {
          rowIdx: this.alertInfo.idx
        });
        break;
      case 'end':
        this.i18n.alert.end = this.translate.instant('alert.end', {
          rowIdx: this.alertInfo.idx, brc: this.alertInfo.brc
        });
        break;
    }
    this.alertMsg  = this.i18n.alert[this.alertInfo.type];
  }

  /**
   * 检测、轮询、刷新APP
   * =================================*/
  checkAndUpdateApp() {
    /**electron ignore sta*/
    this.checkAppVersion(false);
    this.refreshVisitCount();
    this.getSharedJson(false);
    this.getUpdateUrl();
    fn.interval('refresh-visit-count', 300000, () => this.refreshVisitCount());
    /**electron ignore end*/
    /**electron enable sta_*//*
    fn.defer(() => win.checkAppVersion(res => {
      if (res.version !== res.localVersion) {
        const noUpVersion = this.appService.getIgnoreVersion();
        if (!noUpVersion || res.version !== noUpVersion) {
          this.updateUrl = res.updateUrl;
          this.remoteVersion = res.version;
          $('#updateBtn').click();
        }
      }
    }));
    *//**electron enable end_*/
    this.pollingVisitCount();
    fn.interval('polling-visit-count', 15000, () => this.pollingVisitCount());
  }

  /**
   * 获取App下载地址
   * =================================*/
  getUpdateUrl() {
    this.appService.getUpdateUrl().subscribe(res => {
      this.remoteVersion = res.version;
      this.updateUrl = res.updateUrl;
    });
  }

  /**
   * 检测Zjson版本
   * =================================*/
  checkAppVersion(isRefresh: boolean) {
    this.appService.getRemoteVersion().subscribe(res => {
      const locVersion = this.appService.getLocalVersion();
      const rmtVersion = res['version'];
      this.appService.setLocalVersion(rmtVersion);
      if (isRefresh && locVersion !== rmtVersion) {
        this.appService.setIsUpGrade('yes');
        location.reload(true);
      }
      win['version'] = rmtVersion;
    });
  }

  /**
   * 刷新访问量
   * =================================*/
  refreshVisitCount() {
    if (this.isPageActive) {
      this.isPageActive = false;
      const userId = this.appService.getUserId();
      this.appService.refreshVisitCount(userId).subscribe((res: any) => {
        if (res['id']) this.appService.setUserId(res.id);
      });
    } else {
      this.checkAppVersion(true);
    }
  }

  /**
   * 轮询访问量
   * =================================*/
  pollingVisitCount() {
    const userId = this.appService.getUserId();
    /**electron ignore sta*/
    this.appService.pollingVisitCount(userId, this.isOnInit).subscribe((res: any) => {
      if (res['vc']) win['vc'] = res.vc;
    });
    /**electron ignore end*/
    /**electron enable sta_*//*
    fn.defer(() => win.pollingVisitCount(userId, this.isOnInit));
    *//**electron enable end_*/
    this.isOnInit = false;
  }

  /**
   * 生成解析结果分享链接
   * ===================================*/
  shareFormated() {
    if (!this.formated) {
      return this.alertNotice(this.translate.instant('_shareFmted'), 'danger');
    }
    if (this.formated.length > 8000000) {
      return this.alertNotice(this.translate.instant('_largeError'), 'danger');
    }
    this.sharedLink = '';
    fn.copyText(`${this.appUrl}?sharedId=${this.appService.getUserId()}`);
    this.showLoading();
    const success = () => {
      this.isShowLoading = false;
      this.alertNotice(this.translate.instant('_shareSuccess'));
    };
    const error = () => {
      this.isShowLoading = false;
      this.alertNotice(this.translate.instant('_shareJsonError'), 'danger');
    };
    /**electron ignore sta*/
    this.appService.shareFormated(this.formated).subscribe(success, error);
    /**electron ignore end*/
    /**electron enable sta_*//*
    win.shareFormated(this.formated, this.appService.getUserId(), success, error);
    *//**electron enable end_*/
  }

  /**
   * 获得共享Json字符串
   * ===================================*/
  getSharedJson(isFromIpt: boolean = true) {
    fn.defer(() => {
      const queryStr = isFromIpt ? $('#search-ipt').val() || '-' : location.href;
      const sharedId = fn.get(fn.parseQueryStr(queryStr), 'sharedId') || '';
      if (sharedId) {
        this.showLoading();
        const error = () => {
          this.isShowLoading = false;
          this.alertNotice(this.translate.instant('_getJsonError'), 'danger');
        };
        /**electron ignore sta*/
        this.appService.getSharedJson(sharedId).subscribe(res => {
          this.isShowLoading = false;
          this.sourcest = res.sharedJson;
          this.doFormate(this.sourcest);
        }, error);
        /**electron ignore end*/
        /**electron enable sta_*//*
        win.getSharedJson(sharedId, res => {
          this.isShowLoading = false;
          this.sourcest = res.sharedJson;
          $('#format-btn').click();
        }, error);
        *//**electron enable end_*/
      }
      if (!sharedId && isFromIpt) {
        this.alertNotice(this.translate.instant('_bdSharedLink'), 'danger');
      }
    });
  }

  showLoading() {
    this.isShowLoading = true;
    fn.timeout(3000, () => this.isShowLoading = false);
  }
}
