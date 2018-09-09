import { Component} from '@angular/core';

@Component({
  selector: 'zjs-notice',
  template: `
    <div class="z-loading">
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
export class ZjsNoticeComponent {
  constructor() { }
}
