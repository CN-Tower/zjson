import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
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
  themeTts: any = this.appService.getThemes();
  theme: string = this.themeTts[0];
  conf: Configs = new Configs();
  eles: FmterEles = new FmterEles();
  fmtSt: FmtStatus = new FmtStatus();
  formatter: Formatter = new Formatter();
  alertType: 'info'|'success'|'warning'|'danger' = 'info';
  srcPlaceHolder: string = this.appService.srcPlaceHolder;
  greeting: string = this.appService.getGreeting();
  clearSourc: Function = () => this.sourcest = '';
  setRowIdxWpHeight: Function = () => $('.z-canvas').height() + 12 + 'px';
  getTimeStr: Function = () => moment().format('MM-DD HH:mm:ss');
  getFmtHists: Function = () => this.fmtHists = this.appService.getFmtHists();

  constructor(private appService: AppService) {
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
  doFormate() {
    this.formatter.init(this.sourcest, this.conf , (html, json, fmtSt) => {
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
        this.fmtSourcest = this.sourcest;
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
  maximalPanel(type: 'src'|'fmt') {
    $(document).scrollTop(0);
    const $body = $('html, body').addClass('o-h');
    const bodyH = $body.height() - 94;
    const bodyW = $body.width();
    const pH =  bodyH> 500 ? bodyH : 500;
    const pW = bodyW - 40;
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
    $('html, body').removeClass('o-h');
    this.maxSrcSize = null;
    this.maxFmtSize = null;
    this.isSrcMax = false;
    this.isFmtMax = false;
  }

  /**
   * 格式化相关操作
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
      saveAs(blob, `zjson-${fn.time()}.json`);
    }
  }
  saveFmted() {
    const svTime = this.getTimeStr();
    if (this.fmtSourcest && this.saveFmtTime !== svTime) {
      this.saveFmtTime = svTime;
      const fmtPre = this.fmtSourcest.replace(/[\s\n]/mg, '')
      const appdix = fmtPre.length > 15 ? fmtPre.substr(0, 15) + ' ...' : fmtPre;
      const histName = this.saveFmtTime + ` ( ${appdix} )`;
      const hist = {src: this.fmtSourcest, name: histName};
      const prefix = this.appService.setFmtHists(hist);
      this.getFmtHists();
    }
  }
  showOrRmFmtHist(e: any, hist: any) {
    if (e.target.tagName === 'I') {
      this.appService.rmvFmtHists(hist);
      this.getFmtHists();
    } else {
      this.sourcest = hist.src;
      this.doFormate();
    }
  }
  copyFmted() {
    if ($('.z-canvas').html()) {
      const $tmpIpt = $('<textarea></textarea>');
      $('body').append($tmpIpt);
      $tmpIpt.val(this.formated).select();
      document.execCommand('Copy');
      $tmpIpt.remove();
    }
  }
  clearFmted() {
    $('.z-canvas').html('');
    this.alertType = 'info';
    this.formated = '';
    this.fmtSourcest = '';
  }
  expandAll() {
    if ($('.z-canvas').html()) {
      this.doFormate();
    }
  }
  collapseAll() {
    const $firstOpBtn = $('.operator').eq(0);
    if ($firstOpBtn.hasClass('expanded')) {
      $firstOpBtn.click();
    }
  }

  /**
   * 隐藏和显示下拉菜单
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
   * 代码行号索引水平不滚动及左右拖动代码窗
   * ===================================
   */
  ngAfterViewInit() {
    const that = this;
    $('#z-container').scroll(function() {
      $('#z-index').css('left', this.scrollLeft + 'px');
      $('.z-row-index').css('left', (this.scrollLeft - 2) + 'px');
    });
    const $zSrce = $('#z-source');
    const $zJson = $('#z-jsonwd');
    let dx, nx, ox;
    $('#z-resize').mousedown(function(e) {
      ox = e.clientX;
      $(window).on('mousemove', resizeCodeZone)
      .mouseup(function() {
        $(this).off('mousemove', resizeCodeZone);
      });
    });
    function resizeCodeZone(e: any) {
      $('.src-text').blur();
      const ww = $('#worker').width();
      nx = e.clientX;
      if (nx != ox) {
        dx = nx - ox;
        if (dx < 0) {
          $zSrce.width($zSrce.width() + dx);
          $zJson.width($zJson.width() - dx);
        } else {
          $zJson.width($zJson.width() - dx);
          $zSrce.width($zSrce.width() + dx);
        }
        const sp = ($zSrce.width() / ww) * 100;
        const jp = 99 - sp;
        $zJson.css('width', jp + '%');
        $zSrce.css('width', sp + '%');
        ox = nx;
      }
    }
  }
}


