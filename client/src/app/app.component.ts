import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { toggleSlid } from './animations/toggle-slid';
import { AppService } from './app.service';
import { Configs, FmtStatus, FmterEles } from './formatter/formatter.conf';
import { Formatter } from './formatter/formatter.main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [toggleSlid],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  conf: Configs;
  lang: string;
  isOnInit: boolean = true;
  isPageActive: boolean = true;
  isWindowBig: boolean;
  sourcest: string = '';
  formated: string = '';
  alertMsg: string = '';
  saveFmtTime: string;
  fmtSourcest: string;
  fmtHists: any[] = [];
  maxSrcSize: any = null;
  maxFmtSize: any = null;
  isSrcMax: boolean = false;
  isFmtMax: boolean = false;
  noticeCtrl: string = 'hide';
  noticeMsg: string = '';
  noticeType: 'success'|'danger'|null = null;
  isModelExpand: boolean = false;
  isFmtedEditAb: boolean = true;
  isShowConfigs: boolean = false;
  isConfOnSlid: boolean = false;
  isOriginEmpty: boolean = true;
  toggleConfTiele: string;
  themes: any[] = [
    'dark', 'abyss', 'blue', 'red', 'kimbie', 'moonlight', 'solarized', 'light'
  ];
  theme: string;
  eles: FmterEles = new FmterEles();
  fmtSt: FmtStatus = new FmtStatus();
  formatter: Formatter = new Formatter();
  alertInfo: any = {type: '', idx: NaN, brc: ''};
  alertType: 'info'|'success'|'warning'|'danger' = 'info';
  greeting: string;
  languages: any = {
    en: {long: 'English', short: 'EN'},
    zh: {long: '中文（简体）', short: '中文'}
  };
  i18n: any = {
    confs: {show: '', hide: ''},
    model: {expand: '', combine: ''},
    type: {json: 'Json', jsObj: 'JsObj'},
    alert: {ost: '', col: '', val: '', end: '', war: '', scc: ''}
  };
  altMsgs: any = {};
  setRowIdxWpHeight: Function = () => $('.z-canvas').height() + 12 + 'px';
  getTimeStr: Function = () => fn.fmtDate('MM-dd hh:mm:ss');
  getFmtHists: Function = () => this.fmtHists = this.appService.getFmtHists();

  constructor(
    private translate: TranslateService,
    private appService: AppService
  ) {
    const broswerLang = translate.getBrowserLang();
    translate.addLangs(['zh', 'en']);
    translate.setDefaultLang('zh');
    this.lang = broswerLang.match(/en|zh/) ? broswerLang : 'zh';
    translate.use(this.lang);
    this.greeting = this.appService.getGreeting(this.lang);
    this.conf = new Configs();
    this.getFmtHists();
    this.checkVersion(false);
    this.refreshVisitCount();
    this.pollingVisitCount();
  }

  ngOnInit() {
    this.doTranslate();
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.doTranslate();
      this.translateAltMsgs();
    });
    fn.interval('refresh-visit-count', 300000, () => this.refreshVisitCount());
    fn.interval('polling-visit-count', 15000, () => this.pollingVisitCount());
  }

  /**
   * 检测版本
   * =================================
   */
  checkVersion(isRefresh: boolean) {
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
   * =================================
   */
  refreshVisitCount() {
    if (this.isPageActive) {
      this.isPageActive = false;
      const userId = this.appService.getUserId();
      this.appService.refreshVisitCount(userId).subscribe((res: any) => {
        if (res['id']) {
          this.appService.setUserId(res.id);
        }
      });
    } else {
      this.checkVersion(true);
    }
  }

  /**
   * 轮询访问量
   * =================================
   */
  pollingVisitCount() {
    const userId = this.appService.getUserId();
    this.appService.pollingVisitCount(userId, this.isOnInit).subscribe((res: any) => {
      if (res['vc']) {
        win['visitCount'] = res.vc;
      }
    });
    this.isOnInit = false;
  }

  /**
   * 执行格式化
   * =================================
   */
  doFormate(fmtSrc: string, isSilence?: boolean) {
    this.isOriginEmpty = !this.formated;
    if (!this.sourcest && !this.fmtSourcest && !isSilence) {
      this.alertNotice(this.translate.instant('_format'), 'danger');
    } else {
      this.formatter.init(fmtSrc.trim(), this.conf , (html, json, fmtSt) => {
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
        fn.timeout(() => {
          const $zCanvas = $('.z-canvas');
          $zCanvas.html(html);
          this.trigglerEvents();
          this.fmtSourcest = fmtSrc;
        });
      });
    }
  }

  /**
   * 设置言语
   * =================================
   */
  selectLanguage(type: 'zh'|'en') {
    this.lang = type;
    this.translate.use(type);
    this.animateGreeting();
  }

  /**
   * 禁止原代码框的Tab事件
   * =================================
   */
  onTextareaKeyDown(e: any) {
    e = e || win.event;
    if (e.key === 'Tab' || e.keyCode === 9) {
      return false;
    }
  }

  /**
   * 提示信息
   * =================================
   */
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
   * =================================
   */
  trigglerEvents() {
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
   * 更换主题
   * =================================
   */
  onChangeTheme(them: string) {
    if (this.theme !== them) {
      this.theme = them;
      let fontColor = '#999999';
      if (fn.contains(['light', 'solarized'], them)) {
        fontColor = '#333333';
      }
      $('body').css('color', fontColor);
      $('#z-source textarea.src-text').css('color', fontColor);
      this.appService.setAppTheme(them);
    }
  }

  /**
   * 最大化窗口
   * =================================
   */
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
   * =================================
   */
  minimalPanel(type?: 'src'|'fmt') {
    fn.exitFullScreen($('#z-source .panel')[0]);
    fn.exitFullScreen($('#z-jsonwd .panel')[0]);
    fn.fullScreenChange(false);
    this.isSrcMax = false;
    this.isFmtMax = false;
    this.maxSrcSize = null;
    this.maxFmtSize = null;
    setTimeout(() => this.onWindowResize());
  }

  /**
   * 下载操作
   * =================================
   */
  download(type: 'src'|'fmt') {
    let blob;
    if (type === 'src') {
        if (this.sourcest) {
          blob = new Blob([this.sourcest], {type: ''});
        }
    } else if (type === 'fmt') {
        if (this.formated) {
          blob = new Blob([this.formated], {type: ''});
        }
    }
    if (blob) {
      saveAs(blob, `zjson-${String(fn.time()).substr(-6)}.json`);
    } else {
      this.alertNotice(this.translate.instant('_download'), 'danger');
    }
  }

  /**
   * 窗口推到左边
   * =================================
   */
  pushToLeft() {
    $('#z-source').animate({width: '35%'}, 500);
    $('#z-jsonwd').animate({width: '64%'}, 500);
  }

  /**
   * 窗口推到中间
   * =================================
   */
  pushToMiddle() {
    if ($('#z-source').width() / $('#worker').width() >= 0.495) {
      $('#z-source').animate({width: '49.5%'}, 500);
      $('#z-jsonwd').animate({width: '49.5%'}, 500);
    } else {
      $('#z-jsonwd').animate({width: '49.5%'}, 500);
      $('#z-source').animate({width: '49.5%'}, 500);
    }
  }

  /**
   * 右边的内容显示到左边
   * =================================
   */
  showInLeft() {
    this.sourcest = this.formated;
    $('.src-text').scrollTop(0);
  }

  /**
   * 保存到历史记录
   * =================================
   */
  saveFmted() {
    const svTime = this.getTimeStr();
    if (this.fmtSourcest) {
      if (this.saveFmtTime !== svTime) {
        this.saveFmtTime = svTime;
        const fmtPre = this.fmtSourcest.replace(/[\s\n]/mg, '');
        const appdix = fmtPre.length > 15 ? fmtPre.substr(0, 15) + ' ...' : fmtPre;
        const histName = this.saveFmtTime + ` ( ${appdix} )`;
        const hist = {src: this.fmtSourcest, name: histName};
        const prefix = this.appService.setFmtHists(hist);
        this.getFmtHists();
        this.alertNotice(this.translate.instant('saveSuccess'), 'success');
      }
    } else {
      this.alertNotice(this.translate.instant('_save'), 'danger');
    }
  }

  /**
   * 显示历史记录
   * =================================
   */
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
   * =================================
   */
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
   * =================================
   */
  clearSourc() {
    if (this.sourcest) {
      this.sourcest = '';
    } else {
      this.alertNotice(this.translate.instant('_clear'), 'danger');
    }
  }

  /**
   * 清空操作
   * =================================
   */
  clearFmted() {
    if (this.fmtSourcest) {
      this.emptyFmt();
    } else {
      this.alertNotice(this.translate.instant('_clear'), 'danger');
    }
  }

  /**
   * 执行清空
   * =================================
   */
  emptyFmt() {
    $('.z-canvas').html('');
    this.alertType = 'info';
    this.formated = '';
    this.fmtSourcest = '';
    if (!this.isOriginEmpty) {
      this.animateGreeting();
    }
  }

  /**
   * 全部展开
   * =================================
   */
  expandAll() {
    if ($('.z-canvas').html()) {
      this.doFormate(this.fmtSourcest);
    }
  }

  /**
   * 全部收起
   * =================================
   */
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
   * =================================
   */
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

  /**
   * 下拉菜单
   * =================================
   */
  toggleOptions(tp: string) {
    const $opts = $(`.z-${tp}-opts`);
    if ($opts.hasClass('show')) {
      $opts.removeClass('show');
    } else {
      $opts.addClass('show');
      fn.timeout(() => $(document).one('click', () => $opts.removeClass('show')));
    }
  }

  /**
   * 问候语动画
   * ===================================
   */
  animateGreeting() {
    if (this.alertType === 'info' && this.isWindowBig) {
      fn.timeout(() => {
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
   * ===================================
   */
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
      }
    } else {
      if (this.isWindowBig) {
        this.isWindowBig = false;
        this.animateGreeting();
        $zSrce.css('width', '49.5%');
        $zJson.css('width', '49.5%');
      }
    }
    if ($maxPanel.length > 0) {
      $maxPanel.width(winW - 40).height(winH - 30);
    }
    $('.z-fmt-alts').width((winW - 40) * 0.35);
  }

  /**
   * 代码行号索引水平不滚动及左右拖动代码窗
   * ===================================
   */
  ngAfterViewInit() {
    const $win = $(win);
    const $zSrce = $('#z-source');
    const $zJson = $('#z-jsonwd');
    this.isWindowBig = $win.width() >= 1025;
    if (!this.isWindowBig) {
      $zSrce.css('width', '49.5%');
      $zJson.css('width', '49.5%');
    }
    this.animateGreeting();
    this.onWindowResize();
    fn.defer(() => this.onChangeTheme(this.appService.getAppTheme()));
    $(document).on('click keyup', () => this.isPageActive = true);
    $win.resize(() => this.onWindowResize());
    setTimeout(() => this.onWindowResize(), 500);
    $('#z-container').scroll(function() {
      $('#z-index').css('left', this.scrollLeft + 'px');
      $('.z-row-index').css('left', (this.scrollLeft - 2) + 'px');
    });
    let dx, nx, ox;
    const resizeCodeZone: Function = e => {
      $('.src-text').blur();
      const ww = $('#worker').width();
      nx = e.clientX;
      if (nx !== ox) {
        dx = nx - ox;
        ox = nx;
        const sw = $zSrce.width() + dx;
        const jw = $zJson.width() - dx;
        if (sw / ww > 0.35 || jw / ww > 0.35) {
          if (dx < 0 && sw / ww > 0.35) {
            $zSrce.width(sw);
            $zJson.width(jw);
          } else if (dx > 0 && jw / ww > 0.35) {
            $zJson.width(jw);
            $zSrce.width(sw);
          }
          const sp = ($zSrce.width() / ww) * 100;
          const jp = 99 - sp;
          $zJson.css('width', jp + '%');
          $zSrce.css('width', sp + '%');
        }
      }
    };

    $('#z-resize').mousedown(function(e) {
      if ($win.width() > 1025) {
        ox = e.clientX;
        $(document).on('mousemove', resizeCodeZone).mouseup(function() {
          $(this).off('mousemove', resizeCodeZone);
        });
      }
    });
  }

  /**
   * i18n国际化
   * =================================
   */
  doTranslate() {
    this.i18n.confs.show = this.translate.instant('showConfs');
    this.i18n.confs.hide = this.translate.instant('hideConfs');
    this.i18n.model.expand = this.translate.instant('expand');
    this.i18n.model.combine = this.translate.instant('combine');
  }

  /**
   * 国际化提示信息
   * =================================
   */
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
