import { Injectable, EventEmitter } from '@angular/core';
import { HintInfo } from './shared-interface';

@Injectable()
export class SharedBroadcastService {
  hintEmiter: EventEmitter<any> = new EventEmitter;
  editorEmiter: EventEmitter<any> = new EventEmitter;
  hintStream: any = this.hintEmiter.asObservable();
  editorStream: any = this.editorEmiter.asObservable();

  constructor() { }

  showHint(hintInfo: HintInfo) {
    this.hintEmiter.emit(hintInfo);
  }
}
