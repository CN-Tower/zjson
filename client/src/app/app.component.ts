import { Component, OnInit, AfterViewInit, ViewEncapsulation, HostListener } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { AppService } from './app.service';
import { toggleSlid } from './animations/toggle-slid';
import { Configs, FmtStatus, FmterEles } from './formatter/formatter.conf';
import { Formatter } from './formatter/formatter.main';
import { window } from 'rxjs/operator/window';
import * as moment from 'moment';

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
  warningMsg: string;
  isWindowBig: boolean;
  sourcest: string = '';
  formated: string = '';
  visitCount: number = NaN;
  alertMsg: string = '';
  saveFmtTime: string;
  fmtSourcest: string;
  fmtHists: any[] = [];
  maxSrcSize: any = null;
  maxFmtSize: any = null;
  isSrcMax: boolean = false;
  isFmtMax: boolean = false;
  isShowAlerts: string = 'hide';
  isModelExpand: boolean = false;
  isFmtedEditAb: boolean = true;
  isShowConfigs: boolean = false;
  isConfOnSlid: boolean = false;
  toggleConfTiele: string;
  themes: any[] = ['default', 'nocolor'];
  theme: string = 'default';
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
    type: {json: 'Json', jsobj: 'Js Obj'},
    theme: {default: '', nocolor: ''},
    alert: {ost: '', col: '', val: '', end: '', war: '', scc: ''}
  };
  altMsgs: any = {

  };
  setRowIdxWpHeight: Function = () => $('.z-canvas').height() + 12 + 'px';
  getTimeStr: Function = () => moment().format('MM-DD HH:mm:ss');
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
    const userId = this.appService.getUserId() || 'z-json';
    this.getFmtHists();
    this.appService.getVistCount(userId).subscribe((vst: any) => {
      this.visitCount = vst.nb;
      this.appService.setUserId(vst.id);
    });
  }

  ngOnInit() {
    this.doTranslate();
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.doTranslate();
      this.translateAltMsgs();
    });
  }

  /**
   * 执行格式化
   * =================================
   */
  doFormate(fmtSrc: string) {
    if (!this.sourcest && !this.fmtSourcest) {
      this.isShowAlerts = 'show';
      this.warningMsg = this.translate.instant('_format');
    }
    this.formatter.init(fmtSrc, this.conf , (html, json, fmtSt) => {
      this.formated = json;
      this.fmtSt = fmtSt;
      if (html) {
        this.alertType = this.fmtSt.altType;
        this.alertInfo = this.fmtSt.altInfo;
        this.translateAltMsgs();
        this.animateGreeting();
      }
      this.isModelExpand = this.conf.model === 'expand';
      setTimeout(() => {
        const $zCanvas = $('.z-canvas');
        $zCanvas.html(html);
        this.trigglerEvents();
        this.fmtSourcest = fmtSrc;
      }, 0);
    });
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
      const caret_ = '<span class="z-hint-caret"><i class="fa fa-caret-right"></i><span>'
      const $errRow = $(`.z-row-${errIdx}`).append(caret_);
      const redNext: Function = $next => {
        if ($next.hasClass('z-code')) {
          $next.addClass('bg-red');
          redNext($next.next());
        }
      }
      redNext($errRow.next());
    }
  }

  /**
   * 最大化、最小化代码窗口
   * =================================
   */
  setMaximalPanelTop() {
    $('.z-maximal').css('top', 74 - $(this).scrollTop());
  }
  maximalPanel(type: 'src'|'fmt') {
    $(document).scrollTop(0).on('scroll', this.setMaximalPanelTop);
    $('.z-to-left, .z-show-left').addClass('hide');
    const $win = $(win);
    const winH = $win.height() - 85;
    const winW = $win.width();
    const pW = winW - 40;
    const pH =  winH > 500 ? winH : 500;
    switch (type) {
      case 'src':
        this.maxSrcSize = {height: pH + 'px', width: pW + 'px'};
        this.isSrcMax = true;
        break;
      case 'fmt':
        this.maxFmtSize = {height: pH + 'px', width: pW + 'px'};
        this.isFmtMax = true;
        break;
    }
  }
  minimalPanel(type: 'src'|'fmt') {
    $(document).off('scroll', this.setMaximalPanelTop);
     $('.z-to-left, .z-show-left').removeClass('hide');
    this.isSrcMax = false;
    this.isFmtMax = false;
    this.maxSrcSize = null;
    this.maxFmtSize = null;
    setTimeout(() => this.onWindowResize(), 0);
  }

  /**
   * 相关操作
   * =================================
   */
  download(type: 'src'|'fmt') {
    let blob;
    switch (type) {
      case 'src':
        if (this.sourcest) {
          blob = new Blob([this.sourcest], {type: ''});
        } break;
      case 'fmt':
        if (this.formated) {
          blob = new Blob([this.formated], {type: ''})
        } break;
    }
    if (blob) {
      saveAs(blob, `ZJSON-${String(fn.time()).substr(-6)}.json`);
    } else {
      this.isShowAlerts = 'show';
      this.warningMsg = this.translate.instant('_download');
    }
  }
  pushToLeft() {
    const ww = $('#worker').width();
    const ps = 300 / ww * 100;
    const pj = 99 - ps;
    $('#z-source').animate({width: ps + '%'}, 500);
    $('#z-jsonwd').animate({width: pj + '%'}, 500);
  }
  showInLeft() {
    this.sourcest = this.formated;
    $('.src-text').scrollTop(0);
  }
  saveFmted() {
    const svTime = this.getTimeStr();
    if (this.fmtSourcest) {
      if (this.saveFmtTime !== svTime) {
        this.saveFmtTime = svTime;
        const fmtPre = this.fmtSourcest.replace(/[\s\n]/mg, '')
        const appdix = fmtPre.length > 15 ? fmtPre.substr(0, 15) + ' ...' : fmtPre;
        const histName = this.saveFmtTime + ` ( ${appdix} )`;
        const hist = {src: this.fmtSourcest, name: histName};
        const prefix = this.appService.setFmtHists(hist);
        this.getFmtHists();
      }
    } else {
      this.isShowAlerts = 'show';
      this.warningMsg = this.translate.instant('_save');
    }
  }
  showOrRmFmtHist(e: any, hist: any) {
    if (e.target.tagName === 'I') {
      this.appService.rmvFmtHists(hist);
      this.getFmtHists();
    } else {
      this.sourcest = hist.src;
      this.doFormate(this.sourcest);
    }
  }
  copyFmted() {
    if ($('.z-canvas').html()) {
      const $tmpIpt = $('<textarea></textarea>');
      $('body').append($tmpIpt);
      $tmpIpt.val(this.formated).select();
      document.execCommand('Copy');
      $tmpIpt.remove();
    } else {
      this.isShowAlerts = 'show';
      this.warningMsg = this.translate.instant('_copy');
    }
  }
  clearSourc() {
    if (this.sourcest) {
      this.sourcest = '';
    } else {
      this.isShowAlerts = 'show';
      this.warningMsg = this.translate.instant('_clear');
    }
  }
  clearFmted() {
    if (this.fmtSourcest) {
      $('.z-canvas').html('');
      this.alertType = 'info';
      this.formated = '';
      this.fmtSourcest = '';
    } else {
      this.isShowAlerts = 'show';
      this.warningMsg = this.translate.instant('_clear');
    }
    this.animateGreeting();
  }
  expandAll() {
    if ($('.z-canvas').html()) {
      this.doFormate(this.fmtSourcest);
    } else {
      this.isShowAlerts = 'show';
      this.warningMsg = this.translate.instant('_expand');
    }
  }
  collapseAll() {
    const $firstOpBtn = $('.operator').eq(0);
    if ($firstOpBtn.hasClass('expanded')) {
      $firstOpBtn.click();
    } else {
      this.isShowAlerts = 'show';
      this.warningMsg = this.translate.instant('_collapse');
    }
  }
  toggleConfigs() {
    if (!this.isConfOnSlid) {
      this.isConfOnSlid = true;
      if (this.isShowConfigs) {
        $('.z-conf-item').slideUp(380, () => {
          this.isConfOnSlid = false;
          this.isShowConfigs = false;
          this.onWindowResize(true);
        });
      } else {
        $('.z-conf-item').slideDown(380, () => {
          this.isConfOnSlid = false;
          this.isShowConfigs = true;
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
      $opts.removeClass('show')
    } else {
      $opts.addClass('show');
      setTimeout(() => $(document).one('click', () => $opts.removeClass('show')), 0);
    }
  }

  /**
   * 问候语动画
   * ===================================
   */
  animateGreeting() {
    if (this.alertType === 'info' && this.isWindowBig) {
      setTimeout(() => {
        const $greeting = $('#z-greeting');
        const greetingIn = () => {
          this.greeting = this.appService.getGreeting(this.lang);
          $greeting.removeClass().addClass(`${this.appService.getAnimateClass('in')} animated`);
        };
        greetingIn();
        fn.polling('greeting', 5000, () => {
          $greeting.removeClass().addClass(`${this.appService.getAnimateClass('out')} animated`);
          setTimeout(() => {
            greetingIn();
            setTimeout(() => $greeting.removeClass(), 1000);
          }, 500);
        });
      }, 0);
    } else {
      fn.polling('greeting', false);
    }
  }

  /**
   * 改变window大小
   * ===================================
   */
  onWindowResize(isAnimate: boolean = false) {
    const $win = $(win);
    const $conf = $('.z-conf-item');
    const $maxPanel = $('.z-maximal');
    const $work = $('#worker');
    const $panel = $work.find('.panel:not(.z-maximal)');
    const cH = this.isShowConfigs ? $conf.height() + 10 : 0;
    const winW = $win.width();
    const winH = $win.height();
    let fixH = 265;
    if (winW < 1025 && winW > 768) {
      fixH = 245;
    } else if (winW <= 768) {
      fixH = 310;
    }
    let wH = winH - cH - fixH;
    if (wH < 210) {
      wH = 210;
    }
    if (isAnimate) {
      $work.animate({height: wH}, 200);
      $panel.animate({height: wH - 10}, 200);
    } else {
      $work.height(wH);
      $panel.height(wH - 10);
    }
    if (winW >= 1025) {
      if (!this.isWindowBig) {
        this.isWindowBig = true;
        this.animateGreeting();
      }
    } else {
      if (this.isWindowBig) {
        this.isWindowBig = false;
        this.animateGreeting();
      }
    }
    if ($maxPanel.length > 0) {
      $maxPanel.width(winW - 40).height(winH - 85);
    }
  }

  /**
   * 代码行号索引水平不滚动及左右拖动代码窗
   * ===================================
   */
  ngAfterViewInit() {
    const that = this;
    const $win = $(win);
    this.isWindowBig = $win.width() >= 1025;
    this.animateGreeting();
    this.onWindowResize();
    $win.resize(() => this.onWindowResize());
    setTimeout(() => this.onWindowResize(), 500);
    $('#z-container').scroll(function() {
      $('#z-index').css('left', this.scrollLeft + 'px');
      $('.z-row-index').css('left', (this.scrollLeft - 2) + 'px');
    });
    let dx, nx, ox;
    const $zSrce = $('#z-source');
    const $zJson = $('#z-jsonwd');
    const resizeCodeZone: Function = e => {
      $('.src-text').blur();
      const ww = $('#worker').width();
      nx = e.clientX;
      if (nx !== ox) {
        dx = nx - ox;
        ox = nx;
        const sw = $zSrce.width() + dx;
        const jw = $zJson.width() - dx;
        if (sw > 300 || jw > 300) {
          if (dx < 0 && sw > 300) {
            $zSrce.width(sw);
            $zJson.width(jw);
          } else if (dx > 0 && jw > 300) {
            $zJson.width(jw);
            $zSrce.width(sw);
          }
          const sp = ($zSrce.width() / ww) * 100;
          const jp = 99 - sp;
          $zJson.css('width', jp + '%');
          $zSrce.css('width', sp + '%');
        }
      }
    }
    $('#z-resize').mousedown(function(e) {
      ox = e.clientX;
      $(document).on('mousemove', resizeCodeZone).mouseup(function() {
        $(this).off('mousemove', resizeCodeZone);
      });
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
    this.i18n.theme.default = this.translate.instant('default');
    this.i18n.theme.nocolor = this.translate.instant('noColor');
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
