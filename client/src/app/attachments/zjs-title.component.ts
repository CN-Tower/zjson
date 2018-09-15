import { Component} from '@angular/core';

@Component({
  selector: 'zjs-title',
  template: `
    <h2 id="zjs-title" class="ct">
      {{'zjson' | translate}}
      <h5 class="z-sub-hd">{{'dotNet' | translate}}</h5>
      <zjs-info></zjs-info>
    </h2>`,
  styleUrls: ['./zjs-attachments.less']
})
export class ZjsTitleComponent {
  constructor() { }
}
