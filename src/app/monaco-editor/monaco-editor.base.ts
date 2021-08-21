import { AfterViewInit } from '@angular/core';
import { MessageService } from '../@shared';
import { MONACO_THEMES } from './monaco-editor.themes';

export class MonacoEditorBase implements AfterViewInit {

  constructor(public messageService: MessageService) {}

  ngAfterViewInit() {
    if (this.messageService.isEditorLoaded) {
      const editor = fn.get(win, 'monaco/editor');
      if (editor) this.messageService.editorReadyUp();
    } else {
      if (this.messageService.isEditorLoading) return;
      this.messageService.isEditorLoading = true;
      /**==================== electron ignore sta ====================*/
      const loaderScript: HTMLScriptElement = document.createElement('script');
      loaderScript.type = 'text/javascript';
      // -------------------- local monaco editor --------------------
      // loaderScript.src = 'assets/lib/monaco-editor/vs/loader.js';
      // loaderScript.addEventListener('load', () => {
      //   win.require.config({paths: {'vs': 'assets/lib/monaco-editor/vs'}});
      // -------------------------------------------------------------
      // --------------------------- cdn1 ----------------------------
      loaderScript.src = 'https://cdn.staticfile.org/monaco-editor/0.15.0/min/vs/loader.js';
      loaderScript.addEventListener('load', () => {
        win.require.config({paths: {'vs': 'https://cdn.staticfile.org/monaco-editor/0.15.0/min/vs'}});
        win.MonacoEnvironment = {
          getWorkerUrl: function(workerId, label) {
            return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
              self.MonacoEnvironment = {
                baseUrl: 'https://cdn.staticfile.org/monaco-editor/0.15.0/min/'
              };
              importScripts('https://cdn.staticfile.org/monaco-editor/0.15.0/min/vs/base/worker/workerMain.js');`
            )}`;
          }
        };
      // -------------------------------------------------------------
      // --------------------------- cdn2 ----------------------------
      // loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.0/min/vs/loader.js';
      // loaderScript.addEventListener('load', () => {
      //   win.require.config({paths: {'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.0/min/vs'}});
      //   win.MonacoEnvironment = {
      //     getWorkerUrl: function(workerId, label) {
      //       return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
      //         self.MonacoEnvironment = {
      //           baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.0/min/'
      //         };
      //         importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.0/min/vs/base/worker/workerMain.js');`
      //       )}`;
      //     }
      //   };
      // -------------------------------------------------------------
        win.require(['vs/editor/editor.main'], () => {
          this.defineEditorThemes();
          this.messageService.editorReadyUp();
          this.messageService.isEditorLoaded = true;
          this.messageService.isEditorLoading = false;
        });
      });
      document.body.appendChild(loaderScript);
      /**==================== electron ignore end ====================*/
      /**==================== electron enable sta ======================
      fn.defer(() => win.loadMonacoEditor(() => {
        this.defineEditorThemes();
        this.messageService.editorReadyUp();
        this.messageService.isEditorLoaded = true;
        this.messageService.isEditorLoading = false;
      }));
      ======================= electron enable end ====================*/
    }
  }

  defineEditorThemes() {
    fn.forIn(MONACO_THEMES, (themeName, themeDetail) => win.monaco.editor.defineTheme(themeName, themeDetail));
  }
}
