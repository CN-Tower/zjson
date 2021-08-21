import { Component} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService, HintInfo } from '../@shared/index';

@Component({
  selector: 'zjs-hint',
  template: `
    <div id="zjs-hint" class="alert alert-{{hintType}} alert-dismissible" role="alert" [@toggleSlid]="hintCtrl">
      <button type="button" class="close" (click)="hideHint()">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>{{'warning' | translate}}</strong>&nbsp;&nbsp;{{hintMsg}}
    </div>`,
  styleUrls: ['./zjs-attachments.less'],
  animations: [
    trigger('toggleSlid', [
      state('void', style({right: '-100%', display: 'none'})),
      state('show', style({right: 0, display: 'block'})),
      state('hide', style({right: '-100%', display: 'none'})),
      transition('* => show', [
        animate('0.5s ease')
      ]),
      transition('* => hide', [
        animate('0.5s ease')
      ])
    ])
  ],
})
export class ZjsHintComponent {
  hintCtrl: 'show' | 'hide' = 'hide';
  hintMsg: string;
  hintType: string;

  constructor(private messageService: MessageService) {
    messageService.hintStream.subscribe((hintInfo: HintInfo) => {
      this.hintCtrl = 'show';
      this.hintMsg = hintInfo.hintMsg;
      this.hintType = hintInfo.hintType || 'success';
      fn.timeout('zjs-hint', 2500, () => this.hintCtrl = 'hide');
    });
  }

  hideHint() {
    this.hintCtrl = 'hide';
    fn.timeout('zjs-hint', false);
  }
}
