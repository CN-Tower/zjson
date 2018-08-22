import { Component, OnInit, AfterViewInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { toggleSlid } from './animations/toggle-slid';
import { AppService, APP_INFO } from './app.service';
import { Configs } from './formatter/formatter.conf';
import { Zjson } from './app.component.class';

let originX: number;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [toggleSlid],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent extends Zjson implements OnInit, AfterViewInit {
  modalRef: BsModalRef;
  modalElRef = () => $(document).find('.modal-dialog').addClass('modal-sm');
  getFmtHists = () => this.fmtHists = this.appService.getFmtHists();
  getFmtStr = () => $('.z-canvas').text();

  constructor(
    private translate: TranslateService,
    private appService: AppService,
    private modalService: BsModalService
  ) {
    super();
    const broswerLang = translate.getBrowserLang();
    translate.addLangs(['zh', 'en']);
    translate.setDefaultLang('zh');
    this.lang = broswerLang.match(/en|zh/) ? broswerLang : 'zh';
    translate.use(this.lang);
    this.version = APP_INFO.version;
    this.updateTime = APP_INFO.updateTime;
    this.greeting = this.appService.getGreeting(this.lang);
    this.conf = new Configs();
    this.appService.initFmtHists();
    this.getFmtHists();
    /**electron ignore -*/
    this.checkAppVersion(false);
    this.refreshVisitCount();
    this.pollingVisitCount();
    /**electron ignore |*/
  }

  ngOnInit() {
    this.doTranslate();
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.doTranslate();
      this.translateAltMsgs();
    });
    /**electron ignore -*/
    fn.interval('refresh-visit-count', 300000, () => this.refreshVisitCount());
    fn.interval('polling-visit-count', 15000, () => this.pollingVisitCount());
    /**electron ignore |*/
  }

  ngAfterViewInit() {
    win['isRendered'] = true;
    this.animateGreeting();
    this.fixCodeZoneWidth();
    this.rowIndexStayLeft();
    this.setSearchIptStyle();
    this.initUploadEvent();
    this.initOpenDragEvent();
    this.initResizeZconEvent();
    this.onWindowResize();
    $(win).resize(() => this.onWindowResize());
    $(document).on('click keyup', () => this.isPageActive = true);
    fn.timeout(500, () => this.onWindowResize());
    fn.defer(() => this.onChangeTheme(this.appService.getAppTheme()));
  }

  /**
   * 检测App版本
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
    this.appService.pollingVisitCount(userId, this.isOnInit).subscribe((res: any) => {
      if (res['vc']) win['visitCount'] = res.vc;
    });
    this.isOnInit = false;
  }

    /**
   * 生成解析结果分享链接
   * ===================================*/
  shareFormated() {
    /**electron ignore -*/
    fn.throttle(() => {
      this.appService.fmtedShareLinks(this.getFmtStr()).subscribe(res => {
        fn.copyText(res.shareLink);
        this.alertNotice(this.translate.instant('_shareSuccess'));
      });
    }, 3000);
    /**electron ignore |*/
  }

  /**
   * 执行json格式化
   * =================================*/
  doFormate(fmtSrc: string, isSilence?: boolean) {
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
  selectLanguage(type: 'zh'|'en') {
    this.lang = type;
    this.translate.use(type);
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
  alertNotice(message: string|boolean, type: 'danger'|'success' = 'success') {
    if (message === false) {
      this.noticeCtrl = 'hide';
      fn.timeout('alert-success-msg', false);
    } else if (typeof message === 'string') {
      this.noticeCtrl = 'show';
      this.noticeMsg = message;
      this.noticeType = type;
      fn.timeout('alert-success-msg', 2500, () => this.noticeCtrl = 'hide');
    }
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
      $('#z-container')[0].scrollTop = errIdx * 18 - 240;
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
    fn.defer(() => {
      if (fn.has(win, 'onLinksLoad')) win.onLinksLoad();
    });
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
   * 配置选项
   * =================================*/
  toggleConfigs() {
    if (!this.isConfOnSlid) {
      this.isConfOnSlid = true;
      if (this.isShowConfigs) {
        this.isShowConfigs = false;
        $('.z-conf-wp').slideUp(() => {
          this.isConfOnSlid = false;
          this.onWindowResize(true);
        });
      } else {
        this.isShowConfigs = true;
        $('.z-conf-wp').slideDown(() => {
          this.isConfOnSlid = false;
          this.onWindowResize(true);
        });
      }
      this.onWindowResize(true);
    }
  }

  openInfoModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
  onWindowResize(isAnimate: boolean = false) {
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

  /**
   * 初始化代码窗宽度
   * ===================================*/
  fixCodeZoneWidth() {
    const $zSrce = $('#z-source');
    const $zJson = $('#z-jsonwd');
    this.isWindowBig = $(win).width() >= 1025;
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
        $(document)
        .on('mousemove', mouseMoveHandler)
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
    const ww = $('#worker').width();
    let deltaX, curX = e.clientX;
    if (curX !== originX) {
      deltaX = curX - originX;
      originX = curX;
      const sw = $zSrce.width() + deltaX;
      const jw = $zJson.width() - deltaX;
      if (sw / ww > 0.35 || jw / ww > 0.35) {
        if (deltaX < 0 && sw / ww > 0.35) {
          $zSrce.width(sw);
          $zJson.width(jw);
        } else if (deltaX > 0 && jw / ww > 0.35) {
          $zJson.width(jw);
          $zSrce.width(sw);
        }
        const sp = ($zSrce.width() / ww) * 100;
        const jp = 99 - sp;
        $zJson.css('width', jp + '%');
        $zSrce.css('width', sp + '%');
        this.isOnLeft = Math.abs(sp - 35) < 0.1;
      }
    }
  };

  /**
   * 当搜索框宽度为0时则隐藏
   * ===================================*/
  setSearchIptStyle() {
    const searchIpt = document.querySelector('#search-ipt');
    const $ipt = $(searchIpt);
    $('.search').mouseover(() => $ipt.removeClass('opacity0').focus());
    const hideIpt = function() {
      if ($ipt.width() === 0) $ipt.addClass('opacity0');
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
    $('html, body')
    .on('dragenter dragover dragleave', event => event.preventDefault())
    .on('drop', event => {
      event.preventDefault();
      const file = event.originalEvent.dataTransfer.files[0];
      if (file && fn.has(file, 'size')) this.readSrcFile(file, false);
    });
  }

  /**
   * 读取文件
   * ===================================*/
  readSrcFile(file: any, isInitFileIpt: boolean) {
    const reader = new FileReader();
    if (file.size > 80000) {
      this.alertNotice(this.translate.instant('_largeFile'), 'danger');
      if (isInitFileIpt) {
        $('input.upload').replaceWith('<input type="file" class="upload hide">');
        this.initUploadEvent();
      }
    } else {
      const that = this;
      file.type === 'text/plain'
        ? reader.readAsText(file, 'gb2312')
        : reader.readAsText(file, 'utf8');
      reader.addEventListener('load', function () {
        that.sourcest = reader.result;
        that.doFormate(that.sourcest);
        if (isInitFileIpt) {
          $('input.upload').replaceWith('<input type="file" class="upload hide">');
          that.initUploadEvent();
        }
      });
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

  /**
   * 国际化提示信息
   * =================================*/
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
}
