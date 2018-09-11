import { AfterViewInit } from '@angular/core';
import { SharedBroadcastService } from '../shared/shared-broadcast.service';

let isEditorLoaded: boolean = false;

export class MonacoEditorBase implements AfterViewInit {
  constructor(public broadcast: SharedBroadcastService) {}

  ngAfterViewInit() {
    if (isEditorLoaded) {
      const editor = fn.get(win, 'monaco/editor');
      if (editor) this.broadcast.editorEmiter.emit(editor);
    } else {
      isEditorLoaded = true;
      this.addLoaderScript();
    }
  }

  addLoaderScript() {
    const loaderScript: HTMLScriptElement = document.createElement('script');
    loaderScript.type = 'text/javascript';
    loaderScript.src = 'assets/monaco/vs/loader.js';
    loaderScript.addEventListener('load', () => {
      win.require.config({paths: {'vs': 'assets/monaco/vs'}});
      win.require(['vs/editor/editor.main'], () => {
        this.broadcast.editorEmiter.emit(win.monaco.editor);
      });
    });
    document.body.appendChild(loaderScript);
  }
}
