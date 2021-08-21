import { Injectable } from "@angular/core";

@Injectable()
export class ScreenService {
  fsChangeEvents = {};
  fsEvent = 'fullscreenchange';
  fsEvents = [this.fsEvent, 'webkit' + this.fsEvent, 'moz' + this.fsEvent, 'MS' + this.fsEvent];
  document = document as any;
  window = window as any;

  /**
     * [fn.fullScreen] 全屏显示HTML元素
     * @param el      : HTMLElement
     * @param didFull : function [?]
     */
  fullScreen(el: any, didFull: any) {
    if (typeof el === 'string') el = this.document.querySelector(el);
    if (el && el.tagName) {
      const rfs = el.requestFullScreen || el.webkitRequestFullScreen
        || el.mozRequestFullScreen || el.msRequestFullScreen;
      rfs ? rfs.call(el) : this.sendF11();
      if (fn.isFun(didFull)) {
        let timer: any;
        timer = fn.interval(100, () => {
          if (this.isFullScreen()) clearInterval(timer), fn.defer(didFull);
        });
      }
    }
  }

  /**
   * [fn.exitFullScreen] 退出全屏显示
   * @param didExit : function [?]
   */
  exitFullScreen(didExit: any) {
    const cfs = this.document.cancelFullScreen || this.document.webkitCancelFullScreen
      || this.document.mozCancelFullScreen || this.document.exitFullScreen;
    cfs ? cfs.call(document) : this.sendF11();
    if (fn.isFun(didExit)) {
      let timer: any;
      timer = fn.interval(100, () => {
        if (!this.isFullScreen()) clearInterval(timer), fn.defer(didExit);
      });
    }
  }

  sendF11() {
    if (this.window.ActiveXObject) {
      const ws = new this.window.ActiveXObject('WScript.Shell');
      if (ws) ws.SendKeys('{F11}');
    }
  }

  /**
   * [fn.isFullScreen] 检测是否全屏状态
   */
  isFullScreen() {
    return !!(this.document.fullscreenElement || this.document.msFullscreenElement ||
      this.document.mozFullScreenElement || this.document.webkitFullscreenElement);
  }

  /**
   * [fn.fullScreenChange] 全屏状态变化事件
   * @param callback function
   */
  fullScreenChange(callback: any) {
    if (fn.isFun(callback)) {
      const eventId = fn.randomId(32);
      this.fsChangeEvents[eventId] = callback;
      fn.forEach(this.fsEvents, e => {
        this.document.addEventListener(e, this.fsChangeEvents[eventId]);
      });
      return { 'remove': () => { this.rmFsChangeEvent(eventId); } };
    }
  }

  rmFsChangeEvent(eventId: string) {
    fn.forEach(this.fsEvents, e => {
      this.document.removeEventListener(e, this.fsChangeEvents[eventId]);
    });
    delete this.fsChangeEvents[eventId];
  }
}