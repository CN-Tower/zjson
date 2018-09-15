import { Component, Input, Output, ViewChild, EventEmitter, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { MonacoEditorBase } from './monaco-editor.base';
import { SharedBroadcastService } from '../shared/shared-broadcast.service';
import { AppService } from '../app.service';

@Component({
  selector: 'monaco-diff-editor',
  template: `<div class="editor-container" #editorContainer></div>`,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    .editor-container {
      height: 100%;
    }
  `]
})
export class MonacoDiffEditorComponent extends MonacoEditorBase implements OnInit, OnDestroy {
  @ViewChild('editorContainer') _editorContainer: ElementRef;
  @Input('originalModel')
  set originalModel(model: any) {
    this._originalModel = model;
    if (this._editor) {
      this._editor.dispose();
      this.initMonacoEditor();
    }
  }
  @Input('modifiedModel')
  set modifiedModel(model: any) {
    this._modifiedModel = model;
    if (this._editor) {
      this._editor.dispose();
      this.initMonacoEditor();
    }
  }
  @Output() afterInit: EventEmitter<any> = new EventEmitter();

  _originalModel: any;
  _modifiedModel: any;
  private _editor: any;
  options: any = {
    theme: '',
    language: 'json'
  };

  constructor(private appService: AppService, public broadcast: SharedBroadcastService) {
    super(broadcast);
  }

  ngOnInit() {
    this.broadcast.editorStream.subscribe(() => this.initMonacoEditor());
  }

  ngOnDestroy() {
    if (this._editor) {
      this._editor.dispose();
      this._editor = undefined;
    }
  }

  initMonacoEditor() {
    if (!this._originalModel || !this._modifiedModel) {
      throw new Error('originalModel or modifiedModel not found for ngx-monaco-diff-editor');
    }
    const theme = this.appService.getAppTheme();
    this.options.theme = this.appService.getEditorTheme(theme);

    this._originalModel.language = this.options.language;
    this._modifiedModel.language = this.options.language;

    this._editorContainer.nativeElement.innerHTML = '';

    const originalModel = win.monaco.editor.createModel(this._originalModel.code, this._originalModel.language);
    const modifiedModel = win.monaco.editor.createModel(this._modifiedModel.code, this._modifiedModel.language);

    this._editor = win.monaco.editor.createDiffEditor(this._editorContainer.nativeElement, this.options);
    this._editor.setModel({
      original: originalModel,
      modified: modifiedModel
    });
    this.afterInit.emit({editor: this._editor, editorModel: modifiedModel});
  }
}
