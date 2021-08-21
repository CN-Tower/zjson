import { Component, Input, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppService } from '../app.service';
import { IgnoreInfo } from '../@shared';

@Component({
  selector: 'zjs-update',
  template: `
    <button id="updateBtn" class="hide" (click)="openModal(updateTpl)"></button>
    <ng-template #updateTpl>
      <div class="modal-body text-center z-info-modal">
        <h4>{{'isUpdate' | translate}}</h4>
        <div class="checkbox">
          <label>
            <input type="checkbox" [(ngModel)]="isNoShowUdate"> {{'noMoreShow' | translate}}
          </label>
        </div>
        <button type="button" class="btn btn-default" (click)="doUpdate()">
          {{'downloadNow' | translate}}
        </button>
        <button type="button" class="btn btn-primary divider-left" (click)="cancelUpdate()">
          {{'updateLater' | translate}}
        </button>
      </div>
    </ng-template>`
})
export class ZjsUpdateComponent {
  @Input() updateUrl: string;
  @Input() remoteVersion: string;
  modalRef: BsModalRef;
  isNoShowUdate: boolean = false;

  constructor(private appService: AppService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  cancelUpdate() {
    if (this.isNoShowUdate) {
      const ignoreInfo: IgnoreInfo = {ignoreTime: Date.now(), ignoreVersion: this.remoteVersion};
      this.appService.setIgnoreVersion(ignoreInfo);
    }
    this.modalRef.hide();
  }

  doUpdate() {
    win.electronUtils.openUrl(this.updateUrl);
    this.modalRef.hide();
  }
}
