import { Component, OnInit, AfterViewInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { AppService } from './app.service';
import { SharedMQService } from './shared/index';
import { ZjsApp } from './app.component.class';
import { Configs } from './formatter/formatter.conf';

let workerW: number, sourceW: number, originX: number;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less', './shared/theme.less'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent extends ZjsApp implements OnInit, AfterViewInit {

  getFmtStr = () => $('.z-canvas').text();
  getFmtHists = () => this.fmtHists = this.appService.getFmtHists();

  constructor(
    private translate: TranslateService,
    private appService: AppService,
    private mqService: SharedMQService
  ) {
    super();
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
    this.rowIndexStayLeft();
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
  doFormate(fmtSrc?: string, isSilence?: boolean) {
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
          $('.z-canvas').html(html);
          this.addScrollTop(0);
          this.initStIdx();
          this.trigglerZfmtEvents();
          this.redFmtedErrorRow();
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
   * 阻止原代码窗的Tab事件
   * =================================*/
  onTextareaKeyDown(e: any) {
    e = e || win.event;
    if (e.key === 'Tab' || e.keyCode === 9) return false;
  }

  /**
   * 弹出操作通知
   * =================================*/
  alertNotice(message: string, type: 'danger'|'success' = 'success') {
    this.mqService.showHint({hintMsg: message, hintType: type});
  }

  /**
   * 格式化后的代码折叠和展开事件
   * =================================*/
  trigglerZfmtEvents() {
    const $oprs = $('.operator').click(function() {
      const $this = $(this);
      if ($this.hasClass('expanded')) {
        $this.removeClass('expanded').addClass('collapsed');
        $(`#${$this.data('id')}`).removeClass('expanded').addClass('collapsed');
      } else {
        $this.removeClass('collapsed').addClass('expanded');
        $(`#${$this.data('id')}`).removeClass('collapsed').addClass('expanded');
      }
    });
    const $elps = $('.z-ellipsis').click(function() {
      $(this)
      .parent().removeClass('collapsed').addClass('expanded')
      .prev().removeClass('collapsed').addClass('expanded');
    });
    [$oprs, $elps, $('.z-row-index')].forEach($ele => {
      $ele.hover(() => this.isFmtedEditAb = false, () => this.isFmtedEditAb = true);
    });
  }

  /**
   * 给错误行设置红底
   * =================================*/
  redFmtedErrorRow() {
    if (!this.fmtSt.isSrcValid) {
      const errIdx = this.fmtSt.errRowIdx;
      const scrollTop = errIdx * 18 - 240;
      this.scrollTo(scrollTop);
      this.addScrollTop(scrollTop);
      const caret_ = '<span class="z-hint-caret"><i class="fa fa-caret-right"></i><span>';
      const $errRow = $(`.z-row-${errIdx}`).append(caret_);
      const redNext: Function = $next => {
        if ($next.hasClass('z-code')) {
          $next.addClass('bg-red');
          redNext($next.next());
        }
      };
      redNext($errRow.next());
    }
  }

  /**
   * 更换App主题
   * =================================*/
  onChangeTheme(them: string) {
    if (this.theme !== them) {
      this.theme = them;
      let fontColor = '#999999';
      if (fn.contains(['light', 'solarized'], them)) fontColor = '#333333';
      $('body').css('color', fontColor);
      $('#z-source textarea.src-text').css('color', fontColor);
      this.appService.setAppTheme(them);
    }
  }

  /**
   * 最大化窗口
   * =================================*/
  maximalPanel(type: 'src'|'fmt') {
    let panel;
    if (type === 'src') {
        this.isSrcMax = true;
        panel = $('#z-source .panel')[0];
    } else if (type === 'fmt') {
        this.isFmtMax = true;
        panel = $('#z-jsonwd .panel')[0];
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
    fn.exitFullScreen($('#z-source .panel')[0]);
    fn.exitFullScreen($('#z-jsonwd .panel')[0]);
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
      const blob = new Blob([this.getFmtStr()], {type: ''});
      saveAs(blob, `zjson-${String(fn.time()).substr(-6)}.json`);
    } else {
      this.alertNotice(this.translate.instant('_download'), 'danger');
    }
  }

  /**
   * 窗口推到左边
   * =================================*/
  pushToLeft() {
    $('#z-source').animate({width: '35%'}, 500);
    $('#z-jsonwd').animate({width: '64%'}, 500);
    this.isOnLeft = true;
  }

  /**
   * 窗口推到中间
   * =================================*/
  pushToMiddle() {
    if ($('#z-source').width() / $('#worker').width() >= 0.495) {
      $('#z-source').animate({width: '49.5%'}, 500);
      $('#z-jsonwd').animate({width: '49.5%'}, 500);
    } else {
      $('#z-jsonwd').animate({width: '49.5%'}, 500);
      $('#z-source').animate({width: '49.5%'}, 500);
    }
    this.isOnLeft = false;
  }

  /**
   * 右边的内容显示到左边
   * =================================*/
  showInLeft() {
    this.sourcest = this.getFmtStr();
    $('.src-text').scrollTop(0);
    this.doFormate(this.sourcest);
  }

  /**
   * 保存到历史记录
   * =================================*/
  saveFmted() {
    const svTime = this.getTimeStr();
    if (this.formated) {
      const fmted = this.getFmtStr();
      this.sourcest = fmted;
      if (this.saveFmtTime !== svTime) {
        this.saveFmtTime = svTime;
        const fmtPre = fmted.replace(/[\s\n]/mg, '');
        const appdix = fmtPre.length > 15 ? fmtPre.substr(0, 15) + ' ...' : fmtPre;
        const histName = this.saveFmtTime + ` ( ${appdix} )`;
        const hist = {src: fmted, name: histName};
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
  showOrRmFmtHist(e: any, hist: any) {
    if (e.target.tagName === 'I') {
      this.appService.rmvFmtHists(hist);
      this.getFmtHists();
      this.alertNotice(this.translate.instant('removeSavedSuccess'), 'success');
    } else {
      this.sourcest = hist.src;
      this.doFormate(this.sourcest);
    }
  }

  /**
   * 复制操作
   * =================================*/
  copyFmted() {
    if (this.formated) {
      fn.copyText(this.getFmtStr());
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
    $('.z-canvas').html('');
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
    if ($('.z-canvas').html()) this.doFormate(this.getFmtStr());
  }

  /**
   * 全部收起
   * =================================*/
  collapseAll() {
    const $firstOpBtn = $('.operator').eq(0);
    if ($firstOpBtn.hasClass('expanded')) {
      $firstOpBtn.click();
    } else {
      this.alertNotice(this.translate.instant('_collapse'), 'danger');
    }
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
    const $work = $('#worker');
    const $panel = $work.find('.panel:not(.z-maximal)');
    const $zSrce = $('#z-source');
    const $zJson = $('#z-jsonwd');
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
  }

  initAppStyles() {
    const that = this;
    $('#z-container').click(function() {
      that.addScrollTop($(this).scrollTop());
      that.initStIdx();
    });
    $('body').append($('<button id="myBtn"></button>').click(function() {
      document.execCommand('Copy');
    }));
  }

  /**
   * 初始化代码窗宽度
   * ===================================*/
  fixCodeZoneWidth() {
    const $zSrce = $('#z-source');
    const $zJson = $('#z-jsonwd');
    if (!this.isWindowBig) {
      $zSrce.css('width', '49.5%');
      $zJson.css('width', '49.5%');
      this.isOnLeft = false;
    }
  }

  /**
   * 行号栏始终居左显示
   * ===================================*/
  rowIndexStayLeft() {
    $('#z-container').scroll(function() {
      $('#z-index').css('left', this.scrollLeft + 'px');
      $('.z-row-index').css('left', (this.scrollLeft - 2) + 'px');
    });
  }

  /**
   * 改变window大小
   * ===================================*/
  initResizeZconEvent() {
    const $win = $(win);
    const mouseMoveHandler = e => this.resizeCodeZone(e);
    $('#z-resize').mousedown(function(e) {
      if ($win.width() > 1025) {
        originX = e.clientX;
        workerW = $('#worker').width();
        sourceW = $('#z-source').width();
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
    $('.src-text').blur();
    const $zSrce = $('#z-source');
    const $zJson = $('#z-jsonwd');
    const deltaX = e.clientX - originX;
    let srcW = sourceW + deltaX;
    if (srcW / workerW < 0.35) srcW = workerW * 0.35;
    if (srcW / workerW > 0.64) srcW = workerW * 0.64;
    const srcP = (srcW / workerW) * 100;
    $zSrce.css('width', srcP + '%');
    $zJson.css('width', 99 - srcP + '%');
    this.isOnLeft = Math.abs(srcP - 35) < 0.1;
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
      if ($ipt.width() === 0) $ipt.addClass('opacity0').val('');
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
        this.sourcest = reader.result;
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
    const sharedJson = this.getFmtStr();
    if (!sharedJson) {
      return this.alertNotice(this.translate.instant('_shareFmted'), 'danger');
    }
    if (sharedJson.length > 8000000) {
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
    this.appService.shareFormated(sharedJson).subscribe(success, error);
    /**electron ignore end*/
    /**electron enable sta_*//*
    win.shareFormated(sharedJson, this.appService.getUserId(), success, error);
    *//**electron enable end_*/
  }

  /**
   * 获得共享Json字符串
   * ===================================*/
  getSharedJson(isFromIpt: boolean = true) {
    fn.defer(() => {
      const queryStr = isFromIpt ? $('#search-ipt').val() || '-' : location.href;
      const sharedId = fn.get(fn.parseQueryString(queryStr), 'sharedId') || '';
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
