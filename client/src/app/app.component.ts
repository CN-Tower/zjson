import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AppService } from './app.service';
import { toggleSlid } from './animations/toggle-slid';
import { Configs, FmtStatus, FmterEles } from './formatter/formatter.conf';
import { Formatter } from './formatter/formatter.main';

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
  theme: string = 'default';
  isShowAlerts: string = 'hide';
  isModelExpand: boolean = false;
  isFmtedEditAb: boolean = true;
  alertMsg: string = '';
  visitCount: number = NaN;
  alertType: 'info'|'success'|'warning'|'danger' = 'info';
  srcPlaceHolder: string = this.appService.srcPlaceHolder;
  greeting: string = this.appService.getGreeting();
  themeTts: any = this.appService.getThemeTitles();
  conf: Configs = new Configs();
  eles: FmterEles = new FmterEles();
  fmtSt: FmtStatus = new FmtStatus();
  formatter: Formatter = new Formatter();
  clearSourc: Function = () => this.sourcest = '';
  setRowIdxWpHeight: Function = () => $('.pxj-canvas').height() + 12 + 'px';
  clearFmted: Function = () => {
    $('.pxj-canvas').html('');
    this.alertType = 'info';
  }
  expandAll: Function = () => {
    if ($('.pxj-canvas').html()) {
      this.doFormate();
    }
  }
  collapseAll: Function = () => {
    const $firstOpBtn = $('.operator').eq(0);
    if ($firstOpBtn.hasClass('expanded')) {
      $firstOpBtn.click();
    }
  }
  copyFmted: Function = () => {
    if ($('.pxj-canvas').html()) {
      const $tmpIpt = $('<textarea></textarea>');
      $('body').append($tmpIpt);
      $tmpIpt.val(this.formated).select();
      document.execCommand('Copy');
      $tmpIpt.remove();
    }
  }
  toggleOptions: Function = tp => {
    const $opts = $(`.px-${tp}-opts`);
    if ($opts.hasClass('show')) {
      $opts.removeClass('show')
    } else {
      $opts.addClass('show');
      setTimeout(() => $(document).one('click', () => $opts.removeClass('show')), 0);
    }
  }

  constructor(private appService: AppService) {
    const userId = this.appService.getUserId() || 'px-id';
    this.appService.getVistCount(userId).subscribe((vst: any) => {
      this.visitCount = vst.nb;
      this.appService.setUserId(vst.id);
    });
  }

  ngAfterViewInit() {
    const that = this;
    $('#pxj-container').scroll(function(e) {
      $('#pxj-index').css('left', this.scrollLeft + 'px');
      $('.px-row-index').css('left', (this.scrollLeft - 2) + 'px');
    });
  }

  /**
   * 描述: 格式化Json对象
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
        const $pxjCanvas = $('.pxj-canvas');
        $pxjCanvas.html(html);
        this.trigglerEvents();
      }, 0);
    });
  }

  /**
   * 描述: 折叠和展开的按钮事件
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
    const $elps = $('.px-ellipsis').click(function() {
      $(this)
      .parent().removeClass('collapsed').addClass('expanded')
      .prev().removeClass('collapsed').addClass('expanded');
    });
    [$oprs, $elps, $('.px-row-index')].forEach($ele => {
      $ele.hover(() => this.isFmtedEditAb = false, () => this.isFmtedEditAb = true);
    });
    if (!this.fmtSt.isSrcValid) {
      const errIdx = this.fmtSt.errRowIdx;
      $('#pxj-container')[0].scrollTop = errIdx * 18 - 240;
      const caret_ = '<span class="px-hint-caret"><i class="fa fa-caret-right"></i><span>'
      const $errRow = $(`.px-row-${errIdx}`).append(caret_);
      const redNext: Function = $next => {
        if ($next.hasClass('px-code')) {
          $next.addClass('bg-red');
          redNext($next.next());
        }
      }
      redNext($errRow.next());
    }
  }
}


