import { Component} from '@angular/core';

@Component({
  selector: 'zjs-header',
  template: `
    <h2 id="zjs-header" class="ct">
      {{'zjson' | translate}}
      <h5 class="z-sub-hd">{{'dotNet' | translate}}</h5>
    </h2>`,
  styleUrls: ['./zjs-attachments.less']
})
export class ZjsHeaderComponent {
  constructor() { }
}
