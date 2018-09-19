import { Component, OnInit} from '@angular/core';
import { SharedBroadcastService } from '../shared/shared-broadcast.service';

@Component({
  selector: 'zjs-loading',
  template: `
    <div *ngIf="isShowLoading" class="z-loading">
      <div class="loadingBg"></div>
      <div class="loadingText top45">
        <div class="loadingGif">
          <div class="loader ball-clip-rotate-multiple">
            <div></div><div></div>
          </div>
        </div>
      </div>
    </div>`
})
export class ZjsLoadingComponent implements OnInit {
  isShowLoading: boolean = true;

  constructor(private broadcast: SharedBroadcastService) { }

  ngOnInit() {
    this.broadcast.loadingStream.subscribe(isShow => {
      this.isShowLoading = isShow;
    });
  }
}
