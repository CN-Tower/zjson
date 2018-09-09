import { Injectable, EventEmitter } from '@angular/core';
import { HintInfo } from './shared-interface';

@Injectable()
export class SharedMQService {
  hintEmiter: EventEmitter<any> = new EventEmitter;
  hintStream: any = this.hintEmiter.asObservable();

  constructor() { }

  showHint(hintInfo: HintInfo) {
    this.hintEmiter.emit(hintInfo);
  }
}
