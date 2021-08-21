import {
  Component, OnInit, OnDestroy, Input, Output, EventEmitter,
  ViewChild, ElementRef, forwardRef, NgZone
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MonacoEditorBase } from './monaco-editor.base';
import { MessageService } from '../@shared/message.service';

@Component({
  selector: 'monaco-editor',
  template: `<div class="editor-container" #editorContainer></div>`,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    .editor-container {
      height: 100%;
    }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonacoEditorComponent),
    multi: true
  }]
})
export class MonacoEditorComponent extends MonacoEditorBase implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('editorContainer') _editorContainer: ElementRef;
  @Input() options: any;
  @Output() afterInit: EventEmitter<any> = new EventEmitter();

  private sub: any;
  private _editor: any;
  private _value: string = '';

  onTouched = () => {};
  propagateChange = (_: any) => {};
  registerOnChange = (fn: any) => this.propagateChange = fn;
  registerOnTouched = (fn: any) => this.onTouched = fn;

  constructor(private zone: NgZone, public messageService: MessageService) {
    super(messageService);
  }

  ngOnInit() {
    if (this.messageService.isEditorLoaded) {
      this.initMonacoEditor();
    } else {
      this.sub = this.messageService.editorStream.subscribe(() => this.initMonacoEditor());
    }
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  writeValue(value: any) {
    this._value = value || '';
    fn.defer(() => {
      if (this._editor) this._editor.setValue(this._value);
    });
  }

  initMonacoEditor() {
    const container = this._editorContainer.nativeElement;
    if (this._editor) this._editor.dispose();
    this._editor = win.monaco.editor.create(container, this.options);
    this._editor.setValue(this._value);
    this._editor.onDidChangeModelContent(() => {
      const value = this._editor.getValue();
      this.propagateChange(value);
      this.zone.run(() => this._value = value);
    });
    this._editor.onDidBlurEditorWidget(() => this.onTouched());
    this.afterInit.emit(this._editor);
  }
}
