import { AfterViewInit } from '@angular/core';
import { SharedBroadcastService } from '../shared';
import { MONACO_THEMES } from './monaco-editor.themes';

export class MonacoEditorBase implements AfterViewInit {

  constructor(public broadcast: SharedBroadcastService) {}

  ngAfterViewInit() {
    if (this.broadcast.isEditorLoaded) {
      const editor = fn.get(win, 'monaco/editor');
      if (editor) this.broadcast.editorReadyUp();
    } else {
      /**==================== electron ignore sta ====================*/
      const loaderScript: HTMLScriptElement = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = 'assets/lib/monaco-editor/vs/loader.js';
      loaderScript.addEventListener('load', () => {
        win.require.config({paths: {'vs': 'assets/lib/monaco-editor/vs'}});
        win.require(['vs/editor/editor.main'], () => {
          this.defineEditorThemes();
          this.broadcast.editorReadyUp();
          this.broadcast.isEditorLoaded = true;
        });
      });
      document.body.appendChild(loaderScript);
      /**==================== electron ignore end ====================*/
      /**==================== electron enable sta ====================
      fn.defer(() => win.loadMonacoEditor(() => {
        this.defineEditorThemes();
        this.broadcast.editorReadyUp();
        this.broadcast.isEditorLoaded = true;
      }));
      ======================= electron enable end ====================*/
    }
  }

  defineEditorThemes() {
    fn.forIn(MONACO_THEMES, (themeName, themeDetail) => win.monaco.editor.defineTheme(themeName, themeDetail));
  }
}
