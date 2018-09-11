import {
  Component, OnInit, Input, Output, EventEmitter,
  ViewChild, ElementRef, forwardRef, NgZone
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MonacoEditorBase } from './monaco-editor.base';
import { SharedBroadcastService } from '../shared/shared-broadcast.service';

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
export class MonacoEditorComponent extends MonacoEditorBase implements OnInit, ControlValueAccessor {
  @ViewChild('editorContainer') _editorContainer: ElementRef;
  @Input('options')
  set options(options: any) {
    this._options = options;
    if (this._editor) {
      this._editor.dispose();
      this.initMonacoEditor();
    }
  }
  @Output() afterInit: EventEmitter<any> = new EventEmitter();

  private _options: any;
  private _editor: any;
  private _value: string = '';

  onTouched = () => {};
  propagateChange = (_: any) => {};
  registerOnChange = (fn: any) => this.propagateChange = fn;
  registerOnTouched = (fn: any) => this.onTouched = fn;

  constructor(private zone: NgZone, public broadcast: SharedBroadcastService) {
    super(broadcast);
  }

  ngOnInit() {
    this.broadcast.editorStream.subscribe(() => this.initMonacoEditor());
  }

  writeValue(value: any) {
    this._value = value || '';
    fn.defer(() => {
      if (this._editor) {
        this._editor.setValue(this._value);
      }
    });
  }

  initMonacoEditor() {
    const container = this._editorContainer.nativeElement;
    this._editor = win.monaco.editor.create(container, this._options);
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
