import { Component, OnInit} from '@angular/core';
import { SharedBroadcastService } from '../@shared/shared-broadcast.service';
import { style } from '@angular/animations';

@Component({
  selector: 'zjs-loading',
  template: `
    <div id="zjs-loading">
      <div class="loadingBg"></div>
      <div class="loadingText top45">
        <div class="loadingGif">
          <div class="loader ball-clip-rotate-multiple">
            <div></div><div></div>
          </div>
        </div>
      </div>
    </div>`,
  styles: [`
    #zjs-loading {
      display: none;
    }
  `]
})
export class ZjsLoadingComponent implements OnInit {

  constructor(private broadcast: SharedBroadcastService) { }

  ngOnInit() {
    this.broadcast.loadingStream.subscribe(isShow => {
      $('#zjs-loading').css('display', isShow ? 'block' : 'none');
    });
  }
}
