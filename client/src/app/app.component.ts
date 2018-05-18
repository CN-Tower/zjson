import { Component, AfterViewInit, ViewEncapsulation, HostListener } from '@angular/core';
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
export class AppComponent implements AfterViewInit {
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
  isShowConfigs: boolean = true;
  isConfOnSlid: boolean = false;
  warningMsg: string;
  themeTts: any[] = this.appService.getThemes();
  theme: string = this.themeTts[0];
  conf: Configs = new Configs();
  eles: FmterEles = new FmterEles();
  fmtSt: FmtStatus = new FmtStatus();
  formatter: Formatter = new Formatter();
  alertType: 'info'|'success'|'warning'|'danger' = 'info';
  srcPlaceHolder: string = this.appService.srcPlaceHolder;
  greeting: string = this.appService.getGreeting();
  setRowIdxWpHeight: Function = () => $('.z-canvas').height() + 12 + 'px';
  getTimeStr: Function = () => moment().format('MM-DD HH:mm:ss');
  getFmtHists: Function = () => this.fmtHists = this.appService.getFmtHists();

  constructor(
    private appService: AppService
  ) {
    const userId = this.appService.getUserId() || 'z-json';
    this.getFmtHists();
    this.appService.getVistCount(userId).subscribe((vst: any) => {
      this.visitCount = vst.nb;
      this.appService.setUserId(vst.id);
    });
  }

  /**
   * 执行格式化
   * =================================
   */
  doFormate(fmtSrc: string) {
    if (!this.sourcest && !this.fmtSourcest) {
      this.isShowAlerts = 'show';
      this.warningMsg = 'Format';
    }
    this.formatter.init(fmtSrc, this.conf , (html, json, fmtSt) => {
      // this.isShowAlerts = status ? 'hide' : 'show';
      this.formated = json;
      this.fmtSt = fmtSt;
      if (html) {
        this.alertType = this.fmtSt.altType;
        this.alertMsg  = this.fmtSt.altMesg;
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
    })
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
      this.warningMsg = 'Download';
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
      this.warningMsg = 'Save';
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
      this.warningMsg = 'Copy';
    }
  }
  clearSourc() {
    if (this.sourcest) {
      this.sourcest = '';
    } else {
      this.isShowAlerts = 'show';
      this.warningMsg = 'Clear';
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
      this.warningMsg = 'Clear';
    }
  }
  expandAll() {
    if ($('.z-canvas').html()) {
      this.doFormate(this.fmtSourcest);
    } else {
      this.isShowAlerts = 'show';
      this.warningMsg = 'Expand';
    }
  }
  collapseAll() {
    const $firstOpBtn = $('.operator').eq(0);
    if ($firstOpBtn.hasClass('expanded')) {
      $firstOpBtn.click();
    } else {
      this.isShowAlerts = 'show';
      this.warningMsg = 'Collapse';
    }
  }
  toggleConfigs() {
    if (!this.isConfOnSlid) {
      this.isConfOnSlid = true;
      if (this.isShowConfigs) {
        $('.z-conf-item').slideUp(380, 'linear', () => {
          this.isConfOnSlid = false;
          this.isShowConfigs = false;
        });
      } else {
        $('.z-conf-item').slideDown(380, 'linear', () => {
          this.isConfOnSlid = false;
          this.isShowConfigs = true;
        });
      }
      this.onWindowResize(true);
    }
  }
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
   * 改变window大小
   * ===================================
   */
  onWindowResize(isAnimate: boolean = false) {
    const $win = $(win);
    const $conf = $('.z-conf-item');
    const $maxPanel = $('.z-maximal');
    const $work = $('#worker');
    const $panel = $work.find('.panel:not(.z-maximal)');
    const bH = $win.height();
    const cH = $conf.css('display') === 'none' ? 85 : $conf.height();
    let wH = bH + cH  - 370;
    let pH = bH + cH  - 380;
    if (wH < 210) {
      wH = 210;
    }
    if (pH < 200) {
      pH = 200;
    }
    if (isAnimate) {
      $work.animate({height: wH}, 300, 'linear');
      $panel.animate({height: pH}, 300, 'linear');
    } else {
      $work.height(wH);
      $panel.height(pH);
    }
    if ($maxPanel.length > 0) {
      const ww = $win.width();
      const wh = $win.height();
      $maxPanel.width(ww - 40).height(wh - 85);
    }
  }

  /**
   * 代码行号索引水平不滚动及左右拖动代码窗
   * ===================================
   */
  ngAfterViewInit() {
    const that = this;
    this.onWindowResize();
    $(win).resize(() => this.onWindowResize());
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
}

