import {Directive, Input, AfterViewInit, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[domRef]',
})
export class DomRefDirective implements AfterViewInit {
  @Input() domRef: any;
  constructor(
    private el: ElementRef,
    private rd2: Renderer2
  ) {}

  ngAfterViewInit() {
    const domRef = this.domRef;
    const ele = this.el.nativeElement;
    if (typeof domRef === 'function') {
      const rcv = domRef.length > 0 ? domRef(ele) : domRef();
      if (typeof rcv === 'function') {
        rcv.length > 0 ? rcv(ele) : rcv();
      }
    }
  }
}
