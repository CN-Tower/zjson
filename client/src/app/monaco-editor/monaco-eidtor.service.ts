import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { SharedBroadcastService } from '../shared/shared-broadcast.service';

@Injectable()
export class MonacoEditorService {
  constructor (
    private appService: AppService,
    private broadcast: SharedBroadcastService
  ) { }

  updateEditorTheme(...minimapEditors: any[]) {
    fn.defer(() => {
      const theme = this.appService.getEditorTheme(this.appService.getAppTheme());
      if (win.monaco) win.monaco.editor.setTheme(theme);
      const isEnableMinimap = ['vs', 'vs-dark'].includes(theme);
      minimapEditors.forEach(editor => {
        if (editor) editor.updateOptions({ minimap: { enabled: isEnableMinimap} });
      });
    });
  }

  updateEditorTabsize(...editors: any[]) {
    editors.forEach(editor => {
      if (editor) {
        const model = editor.getModel();
        model.updateOptions({tabSize: this.broadcast.tabsize});
      }
    });
  }

  checkIsScrolled(editor: any) {
    if (!editor) return false;
    return Math.ceil(-editor.getScrolledVisiblePosition({}).top / 19) > 5;
  }

  goToPosition(lineIdx: number, editor: any) {
    if (editor) {
      editor.revealPositionInCenter({ lineNumber: lineIdx, column: 1 });
    }
  }
}
