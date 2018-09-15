import { Injectable, EventEmitter } from '@angular/core';
import { HintInfo } from './shared-interface';

@Injectable()
export class SharedBroadcastService {
  private loadingEmiter: EventEmitter<boolean> = new EventEmitter;
  private hintEmiter: EventEmitter<any> = new EventEmitter;
  private editorEmiter: EventEmitter<any> = new EventEmitter;

  loadingStream: any = this.loadingEmiter.asObservable();
  hintStream: any = this.hintEmiter.asObservable();
  editorStream: any = this.editorEmiter.asObservable();

  constructor() { }

  showLoading = (time?: number) => {
    this.loadingEmiter.emit(true);
    if (fn.typeVal(time, 'num') >= 0) {
      fn.timeout('zjs-loading-timer', time, () => this.hideLoading());
    }
  }
  hideLoading = () => this.loadingEmiter.emit(false);
  showHint = (hintInfo: HintInfo) => this.hintEmiter.emit(hintInfo);
  editorReadyUp = () => this.editorEmiter.emit();
}
