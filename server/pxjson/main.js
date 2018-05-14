(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/animations/toggle-slid.ts":
/*!*******************************************!*\
  !*** ./src/app/animations/toggle-slid.ts ***!
  \*******************************************/
/*! exports provided: toggleSlid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleSlid", function() { return toggleSlid; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");

var toggleSlid = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('toggleSlid', [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ right: '-100%', display: 'none' })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('show', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ right: 0, display: 'block' })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('hide', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ right: '-100%', display: 'none' })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => show', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease')
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => hide', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease')
    ])
]);


/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"px-json\">\r\n  <header>\r\n    <h4 class=\"fl\">Visit Count: <strong>{{visitCount}}</strong></h4>\r\n    <h2 class=\"ct px-json-hd\">\r\n      PX JSON <h5 class=\"px-sub-hd\">[ V3.0.2 ]</h5>\r\n    </h2>\r\n  </header>\r\n  <section id=\"alerts\" [@toggleSlid]=\"isShowAlerts\">\r\n    <div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\r\n      <button type=\"button\" class=\"close\" (click)=\"isShowAlerts='hide'\"><span aria-hidden=\"true\">&times;</span></button>\r\n      <strong>Error!</strong> Invalid Json or JsObj string!\r\n    </div>\r\n  </section>\r\n  \r\n  <section id=\"configs\">\r\n    <div class=\"panel panel-primary\">\r\n      <div class=\"panel-heading\">\r\n        <h3 class=\"panel-title\">Config</h3>\r\n      </div>\r\n      <div class=\"panel-body row\">\r\n        <div class=\"conf-item fl\">\r\n          <h4 class=\"conf-tt fl\">Model</h4>\r\n          <div class=\"conf-con fl\">\r\n            <div class=\"radio\">\r\n              <label>\r\n                <input type=\"radio\" name=\"model\"\r\n                        id=\"model1\" value=\"expand\"\r\n                        [(ngModel)]=\"conf.model\" checked>Expand\r\n              </label>\r\n            </div>\r\n            <div class=\"radio\">\r\n              <label>\r\n                <input type=\"radio\" name=\"model\"\r\n                        id=\"model2\" value=\"combine\"\r\n                        [(ngModel)]=\"conf.model\">Combine\r\n              </label>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"conf-item fl\">\r\n          <h4 class=\"conf-tt fl\">Type</h4>\r\n          <div class=\"conf-con fl\">\r\n            <div class=\"radio\">\r\n              <label>\r\n                <input type=\"radio\" name=\"type\"\r\n                        id=\"type1\" value=\"json\"\r\n                        [(ngModel)]=\"conf.type\" checked>Json\r\n              </label>\r\n            </div>\r\n            <div class=\"radio\">\r\n              <label>\r\n                <input type=\"radio\" name=\"type\"\r\n                        id=\"type2\" value=\"jsobj\"\r\n                        [(ngModel)]=\"conf.type\">JsObj\r\n              </label>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"conf-item fl\">\r\n          <h4 class=\"conf-tt fl\">Indent</h4>\r\n          <div class=\"conf-con fl\">\r\n            <div class=\"dropdown px-drop px-indent-drop\">\r\n              <button class=\"btn btn-default dropdown-toggle\"\r\n                      [disabled]=\"conf.model!='expand'\" (click)=\"toggleOptions('indent')\" type=\"button\">\r\n                {{conf.indent}} Space <span class=\"caret\"></span>\r\n              </button>\r\n              <ul class=\"dropdown-menu px-indent-opts\">\r\n                <li><a href=\"javascript:;\" (click)=\"conf.indent=1\">1 Space</a></li>\r\n                <li><a href=\"javascript:;\" (click)=\"conf.indent=2\">2 Space</a></li>\r\n                <li><a href=\"javascript:;\" (click)=\"conf.indent=3\">3 Space</a></li>\r\n                <li><a href=\"javascript:;\" (click)=\"conf.indent=4\">4 Space</a></li>\r\n                <li><a href=\"javascript:;\" (click)=\"conf.indent=5\">5 Space</a></li>\r\n                <li><a href=\"javascript:;\" (click)=\"conf.indent=6\">6 Space</a></li>\r\n                <li><a href=\"javascript:;\" (click)=\"conf.indent=7\">7 Space</a></li>\r\n                <li><a href=\"javascript:;\" (click)=\"conf.indent=8\">8 Space</a></li>\r\n              </ul>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"conf-item fl\">\r\n          <div class=\"fl conf-theme-tt\">\r\n            <h4 class=\"conf-tt\">Theme</h4>\r\n            <div class=\"sub-conf-tt\">( In Time )</div>\r\n          </div>\r\n          <div class=\"conf-con fl\">\r\n            <div class=\"dropdown px-drop px-theme-drop\">\r\n              <button class=\"btn btn-default dropdown-toggle\" (click)=\"toggleOptions('theme')\" type=\"button\">\r\n                  {{themeTts[theme]}} <span class=\"caret\"></span>\r\n              </button>\r\n              <ul class=\"dropdown-menu px-theme-opts\">\r\n                <li><a href=\"javascript:;\" (click)=\"theme='default'\">{{themeTts['default']}}</a></li>\r\n                <li><a href=\"javascript:;\" (click)=\"theme='nocolor'\">{{themeTts['nocolor']}}</a></li>\r\n                <!-- <li><a href=\"javascript:;\" (click)=\"theme='darktheme'\">{{themeTts['darktheme']}}</a></li>\r\n                <li><a href=\"javascript:;\" (click)=\"theme='lighttheme'\">{{themeTts['lighttheme']}}</a></li> -->\r\n              </ul>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n  \r\n  <section id=\"operate\">\r\n    <div class=\"fl\">\r\n      <button type=\"button\" class=\"btn btn-danger src-op-btn\" (click)=\"clearSourc()\">Clear Source</button>\r\n      <button type=\"button\" class=\"btn btn-primary src-op-btn\" (click)=\"doFormate()\">Formatting</button>\r\n    </div>\r\n\r\n    <div class=\"px-fmt-alts\" [ngSwitch]=\"alertType\">\r\n        \r\n      <div class=\"alert alert-success alert-dismissible\" *ngSwitchCase=\"'success'\">\r\n        <strong class=\"fl alt-tt\">Congratulations:</strong> {{alertMsg}}\r\n      </div>\r\n  \r\n      <div class=\"alert alert-warning alert-dismissible\" *ngSwitchCase=\"'warning'\">\r\n        <strong class=\"fl alt-tt\">Warn:</strong> {{alertMsg}}\r\n      </div>\r\n  \r\n      <div class=\"alert alert-danger alert-dismissible\" *ngSwitchCase=\"'danger'\">\r\n        <strong class=\"fl alt-tt\">Error:</strong> {{alertMsg}}\r\n      </div>\r\n\r\n      <div class=\"alert alert-info alert-dismissible\" *ngSwitchDefault>\r\n        <strong class=\"fl alt-tt\">Welcome:</strong> {{greeting}}\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"btn-group fr\">\r\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"copyFmted()\">\r\n        <i class=\"fa fa-copy\"></i>&nbsp;Copy\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"clearFmted()\">\r\n          <i class=\"fa fa-eraser\"></i>&nbsp;Clear\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"expandAll()\">Expand All</button>\r\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"collapseAll()\">Collapse All</button>\r\n    </div>\r\n  </section>\r\n  \r\n  <section id=\"worker\">\r\n    <div class=\"source\">\r\n      <div class=\"panel panel-primary\">\r\n        <div class=\"panel-heading\">\r\n          <h3 class=\"panel-title\">Source</h3>\r\n        </div>\r\n        <div class=\"panel-body\">\r\n          <textarea class=\"form-control src-text\" rows=\"20\" placeholder=\"{{srcPlaceHolder}}\" [(ngModel)]=\"sourcest\"></textarea>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"pxjson\">\r\n      <div class=\"panel panel-primary\">\r\n        <div class=\"panel-heading\">\r\n          <h3 class=\"panel-title\">Formated</h3>\r\n        </div>\r\n        <div class=\"panel-body\">\r\n          <div id=\"pxj-container\">\r\n            <div id=\"pxj-stage\" [class.fullWidth]=\"!isModelExpand\">\r\n              <div id=\"pxj-index\" [style.height]=\"setRowIdxWpHeight()\"></div>\r\n              <pre *ngIf=\"isModelExpand\" class=\"pxj-canvas theme-{{theme}}\" [attr.contenteditable]=\"isFmtedEditAb\"></pre>\r\n              <div *ngIf=\"!isModelExpand\" class=\"pxj-canvas theme-{{theme}} pxj-colp\" [attr.contenteditable]=\"isFmtedEditAb\"></div> \r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.less":
/*!************************************!*\
  !*** ./src/app/app.component.less ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#px-json header {\n  padding: 0 20px;\n}\n#px-json header strong {\n  color: #ac2925;\n}\n#px-json header h2.px-json-hd {\n  padding-right: 88px;\n}\n#px-json header h5.px-sub-hd {\n  display: inline;\n}\n#px-json section {\n  padding: 10px 20px;\n  clear: both;\n}\n#px-json #alerts {\n  position: fixed;\n  top: 0;\n}\n#px-json #configs .conf-item {\n  width: 22%;\n  margin-bottom: 0;\n  margin-left: 2.4%;\n  padding: 10px 20px;\n  box-sizing: border-box;\n  border: 1px solid #ccc;\n}\n#px-json #configs .conf-item .conf-theme-tt {\n  color: #ac2925;\n}\n#px-json #configs .conf-item .conf-theme-tt .conf-tt {\n  margin-bottom: 0;\n}\n#px-json #configs .conf-item .conf-con {\n  height: 65px;\n  margin-left: 28px;\n}\n#px-json #configs .conf-item .conf-con .px-drop {\n  margin-top: 10px;\n}\n#px-json #operate {\n  height: 55px;\n  position: relative;\n}\n#px-json #operate .src-op-btn:nth-child(1) {\n  margin-right: 4px;\n}\n#px-json #operate .px-fmt-alts {\n  position: absolute;\n  left: 0;\n  right: 0;\n  width: 480px;\n  margin: auto;\n}\n#px-json #operate .px-fmt-alts .alert {\n  position: relative;\n  height: 50px;\n  margin-top: -16px;\n  padding: 0 0 0 20px;\n  text-align: center;\n  line-height: 50px;\n}\n#px-json #operate .px-fmt-alts .alert .alt-tt {\n  position: absolute;\n  left: 20px;\n}\n#px-json #worker {\n  overflow: hidden;\n}\n#px-json #worker > div {\n  width: 49.5%;\n  box-sizing: border-box;\n  float: left;\n}\n#px-json #worker > div:nth-child(1) {\n  margin-right: 1%;\n}\n#px-json #worker > div textarea.src-text {\n  height: 410px;\n  resize: none;\n}\n#px-json #worker > div .panel {\n  min-height: 480px;\n}\n#px-json #worker > div #pxj-container {\n  width: 100%;\n  height: 410px;\n  overflow: auto;\n  border: 1px solid #ccc;\n  position: relative;\n  font-size: 14px;\n  line-height: 18px;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n#px-json #worker > div #pxj-container #pxj-stage {\n  position: absolute;\n  min-height: 100%;\n  top: 0;\n  font-size: 14px;\n  line-height: 18px;\n  z-index: 1;\n}\n#px-json #worker > div #pxj-container #pxj-stage.fullWidth {\n  width: 100%;\n}\n#px-json #worker > div #pxj-container #pxj-stage #pxj-index {\n  width: 40px;\n  min-height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  padding: 6px 4px 6px 0;\n  background: #eee;\n  z-index: 2;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index {\n  position: absolute;\n  width: 40px;\n  left: -2px;\n  color: #555;\n  text-align: right;\n  z-index: 3;\n  -webkit-user-select: none;\n          user-select: none;\n  font-weight: bold;\n  -webkit-touch-callout: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-hint-caret {\n  position: absolute;\n  right: -7px;\n  font-size: 18px;\n  color: red;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-idxes-wp .px-idxes {\n  display: inline-block;\n  width: 9px;\n  height: 16px;\n  background-size: auto 14px !important;\n  background-image: url(data:image/png;base64,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);\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-idxes-wp .px-idxes.px-idx-0 {\n  background-position: -2px 1px;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-idxes-wp .px-idxes.px-idx-1 {\n  background-position: -18px 1px;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-idxes-wp .px-idxes.px-idx-2 {\n  background-position: -35px 1px;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-idxes-wp .px-idxes.px-idx-3 {\n  background-position: -51px 1px;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-idxes-wp .px-idxes.px-idx-4 {\n  background-position: -67px 1px;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-idxes-wp .px-idxes.px-idx-5 {\n  background-position: -83px 1px;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-idxes-wp .px-idxes.px-idx-6 {\n  background-position: -100px 1px;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-idxes-wp .px-idxes.px-idx-7 {\n  background-position: -117px 1px;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-idxes-wp .px-idxes.px-idx-8 {\n  background-position: -133px 1px;\n}\n#px-json #worker > div #pxj-container #pxj-stage .px-row-index .px-idxes-wp .px-idxes.px-idx-9 {\n  background-position: -149px 1px;\n}\n#px-json #worker > div #pxj-container #pxj-stage .operator {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  left: 44px;\n  margin-top: 4px;\n  cursor: pointer;\n  background-size: 11px 11px !important;\n}\n#px-json #worker > div #pxj-container #pxj-stage .operator.collapsed {\n  background-image: url(data:image/png;base64,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);\n  background-position: center center;\n}\n#px-json #worker > div #pxj-container #pxj-stage .operator.expanded {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAG+0lEQVRYhc2ZW1fryBGFq69uGYINJmsBOfOQyf//LZPHMI+QtzGLZAbLcquqdh66JRswxB6OM9EyWvKVr3fdtiQDgP6ftufnZyLyRCSqIhBVFhVVVSgw7k9HYK2xxox7Z613thd1xngiEkHuedNLZt70IqI9K4uwKIueDss76531zgVvnbOT4KL3PSt5W9Xa9NJu8nrTt12fWXLPuZdycDqsGHz0LgZXDqYpNBMVVmeNJyIWzczrTf9bu3lpc5f7deZu03eZu9yfDivFkKJPk9BEn2IQVSIyqkF31er6lzb/62Xddrnt+tUmt13fdvl0WNMUpymcTeI0hWmKROSsjRYa4IlIFSKaWbrct10Whff23MQmhvl5Oh2Ws9ZZ45wVRdvlFH3DwToovCciBXrW3PM6c9v13lvvbIoheOudPR0W79TWJmuT+KxnT0Z1UItFci/dpl9t8rmJKYbzJp438ayZnA5rtd68rPPLOm8yrzb5bBNzL9FahVa1uAaR265vYgjenjfxana2uJieDuvp15aINj2Lou36LnNmYU+7amnuueTW/Dx5Z8+ayeJiend9cTosItpk/veqE9W2y13uc88chiB+sIEIZTQZ830ggPKzRACIoALo3um3Hwuoj52fIyJ8nQ/A8Icy3gC8J/tELXqv1hfH+haiHKgCSkCV8HOsQepxDQC+VxwLkEILlEAVpO9X+6FaBW5UC/g+EUSJHopRGSN4UBAxMpXvFLV+VwRR9yAQVCuNqqoKixQfdXhuYVzZ8Pz3xLEqAYBAgKiqVk8nqsKiUorx7Rc/qsQBSrGT78fLBYB0qD4VqVQioqLHqTWEkIY82L51rGCoLaBWnIqIKItKfRSuQ3OLhpR6u45j9aoLUwUE0MrEJXrKo0k/vBJLjyBC27Ztu14PuyOxik61bcYYY5zESYxxEmMkKEhL8h2IhaHLoW3bp6en5XK5XD49PT0diQUacws6m8/ms/l8PpvN5jH4sZe+j8GnXR4gYN2ulstfHh4eHx8eHx7/eRTW0Pnq/vbm5vb2hvk2BD+7OCcc0+W3zYaoqLVcLh8fHv5x//P9/c/HYtG2hPHbj78y9zGG2cWfKhMBdHDK75ChbVdPy+XD4+P9/f1PP/39SKxXG/ccgp/PLm5v/gwIQamq9Xb7ePgMldg0zdVi8e3bt9VqtS3M/9LEaosZPltf+duPf/3L3d3l5WVKCUPGlRlwENb4YYCaplksrn744VtB3CLtJ9sFwuCOKsLd7c3d3c3VgFU/N5qwz7HGD5cFpaZZLBYANc30+vr6zTzZB1WXj1HwekDz+cXl/OJyPmtSosHk7FX9s5lY/m/TNFdXi5SaxeKqbb+Nk2S73NdLwk6a62irQKpIk5AmYTKJaRJG3r2qfxzEIb2apilx3PJCq7vcgzUGjQrQSKYKKKsyRFQZylXyA9UahnQdW2N5bx3Ylmy3tl+5x/qeviKDFiCBikKqDdxXjB/5rYrFLK+N1w4TgartwZBPY77X4tNxJA5Yxd0Agu01qz2a7U/5wauJVD+EcT9kgw4nIWPu76b7cH6zza1ilWssy8mF6GguDg2ilgsTzDI6E62CD8MVIBpkG2tzDCiIqKq1XdSrs51qm/VAtYhIFVr9kKhKCWnZF2HMCEeoM6S8sicbXmHVk56aJ2N+HhTEog2rWGFb/G2JqUIIMINOo8sYmN5hjc5027+G+UGAGK2re2sv96mFWjIqVtiUiixGV1UIamoQ1Yy5tZNer39pKIehP9UOUtQSCzUD0yuyj3NLRCUrV6LB4ha1dGDSndGxr19vu9i7QyJVhVqoJdgDsAhQgZIwhMuJgIgIi4goQQ2pqWqNF6I/6ov0ZmzvDG6C2CEpDkl5KECl5wmbAUhYhEW2UkENvnQdWsVpDeLbi3ueiKw13tkYfIphmmLwBKKstMpEBFGIkCiJGhFLIEOGoAaG3qXqUdtaPJM31ofgp9anGGLw3llbrjRbY7yz0bsU/TQFb0FGs+AlI3NpfyRqVI2qIbIEGDIEEL50CZOpYIVovQk+RR+928GyxjsXg0uTcDaJRAJIFskMQ7W7KAgwCmu2xm1P6R21GeuNDeR8sCHakCYhBuedscZWtYK3Mfgm+mkKPZueKTOYtWetPRhmaMamPv8KERERheCj9cGGEEIMoYk+Bu8dtmq5GsQwTbHtqGdklTZT2+3qYd6U8Re3qfUm+GhDDGGaYooheuctbLnn46ydBDdN9T5Cir5JfLaJ/+O7GOfTOE3BKFe1vLPR+2aiBbHhcPaH3fMJktVZ45+fn3vRnlVYjWq0sA6eTLSWPXH4nlF7sw13yIx38BZGWbJeX81j8J6InDHkrbMmqNUAhdfijPT09xOtscbu3FI0MXjnzH8AvmEp4ei6R9wAAAAASUVORK5CYII=);\n  background-position: center center;\n}\n#px-json #worker > div #pxj-container #pxj-stage .pxj-canvas {\n  border: none;\n  min-height: 100%;\n  padding: 6px 12px 6px 56px;\n  margin: 0;\n  box-sizing: border-box;\n  font-size: 14px;\n  line-height: 18px;\n  color: #555;\n  background: transparent;\n}\n#px-json #worker > div #pxj-container #pxj-stage .pxj-canvas:focus {\n  border: none;\n  outline: none;\n}\n#px-json #worker > div #pxj-container #pxj-stage .pxj-canvas.pxj-colp {\n  word-break: break-all;\n  word-wrap: break-word;\n}\n#px-json #worker > div #pxj-container #pxj-stage .pxj-canvas .px-brace .px-ellipsis {\n  display: none;\n  width: 16px;\n  height: 10px;\n  cursor: pointer;\n  background-size: 22px 14px !important;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAVCAIAAACor3u9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA60lEQVQ4je1UPwtBURw9z2hSlseERRb1elYWFtc3YPQxfAAGPgE+gYyk+AaUUsiCDLKIxb+iY5Duex6lZLunO/x+p9M5957haiTxT7j+6q4CVIAK+BhwQ7uEUAw+gcpA0ucJcgJaDJkSpkfJL3rIpKAlkKthf3O40YF5gzDlae5IkhcW4pI0qk/1isIiznde3d68YLO2rdMlAGBvu/VwhM1j2qJtEddnX1Sk+21rJAAA8CDilqQRhf6YvBAWcT7ssHNWxCtbRQZN6mmW+5I+jZlNEyZFkZODpdIuRZKIM1vl7vpqpqnvWgX8jDsgcLxfvOui8gAAAABJRU5ErkJggg==);\n  background-position: center center;\n}\n#px-json #worker > div #pxj-container #pxj-stage .pxj-canvas .px-brace.collapsed .px-obj-val {\n  display: none;\n}\n#px-json #worker > div #pxj-container #pxj-stage .pxj-canvas .px-brace.collapsed .px-ellipsis {\n  display: inline-block;\n}\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.service */ "./src/app/app.service.ts");
/* harmony import */ var _animations_toggle_slid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./animations/toggle-slid */ "./src/app/animations/toggle-slid.ts");
/* harmony import */ var _formatter_formatter_conf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formatter/formatter.conf */ "./src/app/formatter/formatter.conf.ts");
/* harmony import */ var _formatter_formatter_main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./formatter/formatter.main */ "./src/app/formatter/formatter.main.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = /** @class */ (function () {
    function AppComponent(appService) {
        var _this = this;
        this.appService = appService;
        this.sourcest = '';
        this.formated = '';
        this.theme = 'default';
        this.isShowAlerts = 'hide';
        this.isModelExpand = false;
        this.isFmtedEditAb = true;
        this.alertMsg = '';
        this.visitCount = NaN;
        this.alertType = 'info';
        this.srcPlaceHolder = this.appService.srcPlaceHolder;
        this.greeting = this.appService.getGreeting();
        this.themeTts = this.appService.getThemeTitles();
        this.conf = new _formatter_formatter_conf__WEBPACK_IMPORTED_MODULE_3__["Configs"]();
        this.eles = new _formatter_formatter_conf__WEBPACK_IMPORTED_MODULE_3__["FmterEles"]();
        this.fmtSt = new _formatter_formatter_conf__WEBPACK_IMPORTED_MODULE_3__["FmtStatus"]();
        this.formatter = new _formatter_formatter_main__WEBPACK_IMPORTED_MODULE_4__["Formatter"]();
        this.clearSourc = function () { return _this.sourcest = ''; };
        this.setRowIdxWpHeight = function () { return $('.pxj-canvas').height() + 12 + 'px'; };
        this.clearFmted = function () {
            $('.pxj-canvas').html('');
            _this.alertType = 'info';
        };
        this.expandAll = function () {
            if ($('.pxj-canvas').html()) {
                _this.doFormate();
            }
        };
        this.collapseAll = function () {
            var $firstOpBtn = $('.operator').eq(0);
            if ($firstOpBtn.hasClass('expanded')) {
                $firstOpBtn.click();
            }
        };
        this.copyFmted = function () {
            if ($('.pxj-canvas').html()) {
                var $tmpIpt = $('<textarea></textarea>');
                $('body').append($tmpIpt);
                $tmpIpt.val(_this.formated).select();
                document.execCommand('Copy');
                $tmpIpt.remove();
            }
        };
        this.toggleOptions = function (tp) {
            var $opts = $(".px-" + tp + "-opts");
            if ($opts.hasClass('show')) {
                $opts.removeClass('show');
            }
            else {
                $opts.addClass('show');
                setTimeout(function () { return $(document).one('click', function () { return $opts.removeClass('show'); }); }, 0);
            }
        };
        var userId = this.appService.getUserId() || 'px-id';
        this.appService.getVistCount(userId).subscribe(function (vst) {
            _this.visitCount = vst.nb;
            _this.appService.setUserId(vst.id);
        });
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var that = this;
        $('#pxj-container').scroll(function (e) {
            $('#pxj-index').css('left', this.scrollLeft + 'px');
            $('.px-row-index').css('left', (this.scrollLeft - 2) + 'px');
        });
    };
    /**
     * 描述: 格式化Json对象
     */
    AppComponent.prototype.doFormate = function () {
        var _this = this;
        this.formatter.init(this.sourcest, this.conf, function (html, json, fmtSt) {
            // this.isShowAlerts = status ? 'hide' : 'show';
            _this.formated = json;
            _this.fmtSt = fmtSt;
            if (html) {
                _this.alertType = _this.fmtSt.altType;
                _this.alertMsg = _this.fmtSt.altMesg;
            }
            _this.isModelExpand = _this.conf.model === 'expand';
            setTimeout(function () {
                var $pxjCanvas = $('.pxj-canvas');
                $pxjCanvas.html(html);
                _this.trigglerEvents();
            }, 0);
        });
    };
    /**
     * 描述: 折叠和展开的按钮事件
     */
    AppComponent.prototype.trigglerEvents = function () {
        var _this = this;
        var $oprs = $('.operator').click(function () {
            var $this = $(this);
            if ($this.hasClass('expanded')) {
                $this.removeClass('expanded').addClass('collapsed');
                $("#" + $this.data('id')).removeClass('expanded').addClass('collapsed');
            }
            else {
                $this.removeClass('collapsed').addClass('expanded');
                $("#" + $this.data('id')).removeClass('collapsed').addClass('expanded');
            }
        });
        var $elps = $('.px-ellipsis').click(function () {
            $(this)
                .parent().removeClass('collapsed').addClass('expanded')
                .prev().removeClass('collapsed').addClass('expanded');
        });
        [$oprs, $elps, $('.px-row-index')].forEach(function ($ele) {
            $ele.hover(function () { return _this.isFmtedEditAb = false; }, function () { return _this.isFmtedEditAb = true; });
        });
        if (!this.fmtSt.isSrcValid) {
            var errIdx = this.fmtSt.errRowIdx;
            $('#pxj-container')[0].scrollTop = errIdx * 18 - 240;
            var caret_ = '<span class="px-hint-caret"><i class="fa fa-caret-right"></i><span>';
            var $errRow = $(".px-row-" + errIdx).append(caret_);
            var redNext_1 = function ($next) {
                if ($next.hasClass('px-code')) {
                    $next.addClass('bg-red');
                    redNext_1($next.next());
                }
            };
            redNext_1($errRow.next());
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.less */ "./src/app/app.component.less")],
            animations: [_animations_toggle_slid__WEBPACK_IMPORTED_MODULE_2__["toggleSlid"]],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.service */ "./src/app/app.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_4__["HttpModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"]
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]
            ],
            providers: [
                _app_service__WEBPACK_IMPORTED_MODULE_6__["AppService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.service.ts":
/*!********************************!*\
  !*** ./src/app/app.service.ts ***!
  \********************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppService = /** @class */ (function () {
    function AppService(http) {
        this.http = http;
        this.srcPlaceHolder = 'Paste your source code to here!';
    }
    AppService.prototype.getThemeTitles = function () {
        return {
            default: 'Default',
            nocolor: 'No Color',
            darktheme: 'Dark Theme',
            lighttheme: 'Light Theme'
        };
    };
    AppService.prototype.getGreeting = function () {
        var greetings = [
            'Have a nice day!',
            'Nice to meet you!',
            'You\'ll have good luck!',
            'God bless you!'
        ];
        return greetings[fn.random(greetings.length)];
    };
    AppService.prototype.getUserId = function () {
        return window.localStorage['userId'];
    };
    AppService.prototype.setUserId = function (id) {
        if (id) {
            window.localStorage['userId'] = id;
        }
    };
    AppService.prototype.getVistCount = function (id) {
        return this.http.get("/api/visitCount/" + id).map(function (res) { return res.json(); });
    };
    AppService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], AppService);
    return AppService;
}());



/***/ }),

/***/ "./src/app/formatter/formatter.conf.ts":
/*!*********************************************!*\
  !*** ./src/app/formatter/formatter.conf.ts ***!
  \*********************************************/
/*! exports provided: Configs, FmtData, FmtStatus, FmtChecker, FmterEles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Configs", function() { return Configs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FmtData", function() { return FmtData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FmtStatus", function() { return FmtStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FmtChecker", function() { return FmtChecker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FmterEles", function() { return FmterEles; });
/* harmony import */ var _formatter_help__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatter.help */ "./src/app/formatter/formatter.help.ts");

var Configs = /** @class */ (function () {
    function Configs(conf) {
        var _this = this;
        this.model = 'expand';
        this.type = 'json';
        this.indent = 2;
        this.sgIndent = ' ';
        this.quotes = '\'';
        this.isQuoteKey = false;
        if (conf) {
            Object.keys(this).forEach(function (prop) {
                if (conf.hasOwnProperty(prop)) {
                    _this[prop] = conf[prop];
                }
            });
        }
    }
    return Configs;
}());

var FmtData = /** @class */ (function () {
    function FmtData() {
        this.html = '';
        this.json = '';
        this.src = '';
    }
    return FmtData;
}());

var FmtStatus = /** @class */ (function () {
    function FmtStatus() {
        this.isSrcValid = true;
        this.fmtedRows = 0;
        this.errRowStr = 0;
        this.errRowIdx = 0;
        this.altMesg = '';
        this.fmtedLines = 0;
        this.altType = 'info';
        this.fmtedType = 'json';
    }
    return FmtStatus;
}());

var FmtChecker = /** @class */ (function () {
    function FmtChecker() {
        this.exceptVal = '';
        this.exceptType = '';
        this.deepIdxCon = '';
        this.isSrcJson = true;
        this.srcAcType = '';
    }
    return FmtChecker;
}());

var FmterEles = /** @class */ (function () {
    function FmterEles() {
        var _this = this;
        this.dt = new FmtData();
        this.st = new FmtStatus();
        this.ck = new FmtChecker();
        this.help = new _formatter_help__WEBPACK_IMPORTED_MODULE_0__["FmtHelp"]();
        this.level = 0;
        this.rowIdx = 1;
        this.isExpand = true;
        this.baseIndent = '';
        this.colon = '<span class="px-code px-colon-sign">:</span>';
        this.colon_ = '<span class="px-code px-colon-sign">: </span>';
        this.comma = '<span class="px-code px-comma-sign">,</span>';
        this.backslash = '<span class="px-code px-backslash">\\</span>';
        this.propFmt = function (val) { return "<span class=\"px-code px-prop-val\">" + val + "</span>"; };
        this.striFmt = function (val) { return "<span class=\"px-code px-stri-val\">" + val + "</span>"; };
        this.funcFmt = function (val) { return "<span class=\"px-code px-func-val\">" + val + "</span>"; };
        this.numbFmt = function (val) { return "<span class=\"px-code px-numb-val\">" + val + "</span>"; };
        this.boolFmt = function (val) { return "<span class=\"px-code px-bool-val\">" + val + "</span>"; };
        this.nullFmt = function (val) { return "<span class=\"px-code px-null-val\">" + val + "</span>"; };
        this.brkline = function () { return "<span class=\"px-code px-break-sign\">\n</span>" + _this.rowIndex(++_this.rowIdx); };
        this.rowIndex = function (idx) {
            var rowIdxes = '<span class="px-idxes-wp fr">';
            String(idx).split('').forEach(function (i) {
                rowIdxes += "<span class=\"px-idxes px-idx-" + i + "\"></span>";
            });
            return "<span class=\"px-row-index px-row-" + idx + "\">" + rowIdxes + "</span></span>";
        };
        this.brcPre = function (sig, cls, isNotEmpty) {
            if (isNotEmpty === void 0) { isNotEmpty = false; }
            var id = isNotEmpty ? fn.uuid() : '';
            var eleId = id ? "id=\"" + id + "\"" : '';
            var expanded = id ? 'expandable expanded' : '';
            var operator = id ? "<span class=\"operator expanded\" data-id=\"" + id + "\"></span>" : '';
            return operator + "<span " + eleId + " class=\"px-code px-brace px-" + cls + "-brace " + expanded + "\">" + sig + "<span class=\"px-obj-val\">";
        };
        this.brcEnd = function (sig) { return "</span><span class=\"px-ellipsis\"></span>" + sig + "</span>"; };
        this.getExpInfo = function (type, brc) {
            var exps = {
                ost: { Tpe: 'danger', msg: "Expect a string in line: " + _this.rowIdx + "!!" },
                col: { Tpe: 'danger', msg: "Expect a colon in line: " + _this.rowIdx + "!!" },
                val: { Tpe: 'danger', msg: "Invalid value in line: " + _this.rowIdx + "!!" },
                end: { Tpe: 'danger', msg: "Expect a comma or a \"" + brc + "\" in line: " + _this.rowIdx + "!!" },
                war: { Tpe: 'warning', msg: 'Formate success, But the source is not a regular JSON!' },
                scc: { Tpe: 'success', msg: "Success formated " + _this.rowIdx + " lines!!" }
            };
            return exps[type];
        };
    }
    return FmterEles;
}());



/***/ }),

/***/ "./src/app/formatter/formatter.help.ts":
/*!*********************************************!*\
  !*** ./src/app/formatter/formatter.help.ts ***!
  \*********************************************/
/*! exports provided: FmtHelp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FmtHelp", function() { return FmtHelp; });
var FmtHelp = /** @class */ (function () {
    function FmtHelp() {
        this.quoteVal = function (val, quo) { return quo + val + quo; };
        this.getSrcRest = function (src, num) {
            if (num === void 0) { num = 1; }
            return src.length > num ? src.substr(num) : '';
        };
    }
    /**
     * 描述: 设置基础缩进值
     * @param conf [Configs]
     */
    FmtHelp.prototype.setBaseIndent = function (conf) {
        var indent = '';
        for (var i = 0; i < conf.indent; i++) {
            indent += conf.sgIndent;
        }
        return indent;
    };
    /**
     * 描述: 根据层数获取缩进值
     * @arg indent [string] 原始缩进值
     * @arg level [number]
     * */
    FmtHelp.prototype.getCurIndent = function (indent, level) {
        var baseIndent = '';
        for (var i = 0; i < level; i++) {
            baseIndent += indent;
        }
        return baseIndent;
    };
    /**
     * 描述: 获取镜像括号
     * @param brc [string]
     */
    FmtHelp.prototype.getBraceMir = function (brc) {
        var pre = ['{', '[', '('];
        var end = ['}', ']', ')'];
        var preIdx = pre.indexOf(brc);
        var endIdx = end.indexOf(brc);
        return preIdx > -1 ? end[preIdx] : pre[endIdx];
    };
    return FmtHelp;
}());



/***/ }),

/***/ "./src/app/formatter/formatter.main.ts":
/*!*********************************************!*\
  !*** ./src/app/formatter/formatter.main.ts ***!
  \*********************************************/
/*! exports provided: Formatter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Formatter", function() { return Formatter; });
/* harmony import */ var _formatter_conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatter.conf */ "./src/app/formatter/formatter.conf.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Formatter = /** @class */ (function (_super) {
    __extends(Formatter, _super);
    function Formatter() {
        return _super.call(this) || this;
    }
    /**
     * 描述: 初始化格式器
     * @arg source [string]
     * @arg conf [Configs] 配置参数
     * @arg onFmted [Function] 回调
     * */
    Formatter.prototype.init = function (source, conf, onFmted) {
        this.dt = new _formatter_conf__WEBPACK_IMPORTED_MODULE_0__["FmtData"]();
        this.st = new _formatter_conf__WEBPACK_IMPORTED_MODULE_0__["FmtStatus"]();
        this.ck = new _formatter_conf__WEBPACK_IMPORTED_MODULE_0__["FmtChecker"]();
        this.dt.src = source;
        this.dt.conf = conf;
        this.level = 0;
        this.rowIdx = 1;
        this.isExpand = conf.model === 'expand';
        this.baseIndent = this.help.setBaseIndent(conf);
        try {
            var obj = void 0;
            source === '' ? obj = source : eval("obj = " + source);
            if (['object', 'boolean'].includes(typeof obj) || obj === '') {
                this.dt.src = obj;
                this.doFormate1();
                this.st.isSrcValid = true;
                this.st.fmtedType = this.dt.conf.type;
            }
            else {
                this.doFormate2();
                this.st.fmtedType = this.ck.srcAcType;
            }
        }
        catch (e) {
            this.doFormate2();
            this.st.fmtedType = this.ck.srcAcType;
        }
        this.dt.html = this.dt.html === '' ? '' : this.rowIndex(1) + this.dt.html;
        if (this.st.isSrcValid) {
            if (this.ck.deepIdxCon) {
                var expBrc = this.help.getBraceMir(this.ck.deepIdxCon.substr(-1));
                this.expection('end', expBrc);
            }
            this.st.fmtedType === conf.type
                ? this.expection('scc')
                : this.expection('war');
        }
        this.st.fmtedLines = this.rowIdx;
        onFmted(this.dt.html, this.dt.json, this.st);
    };
    /**
     * 描述: 获取格式化的对象或Json对象字符串
     * @arg object [object]
     * @arg conf [object, opt.] 配置参数
     * */
    Formatter.prototype.doFormate1 = function () {
        var src = this.dt.src;
        var conf = this.dt.conf;
        switch (src) {
            case true:
            case false: return [this.boolFmt(src), src];
            case null: return [this.nullFmt(src), src];
            case '': return ['', ''];
        }
        var ps = {
            obj: null, conf: conf, html: '', json: '',
            isToJson: conf.type === 'json'
        };
        ps.obj = ps.isToJson ? JSON.parse(JSON.stringify(src)) : src;
        ps.obj instanceof Array
            ? this.arrayHandler(ps, function (rt) { return ps = rt; })
            : this.objectHandler(ps, function (rt) { return ps = rt; });
        this.dt.html = ps.html;
        this.dt.json = ps.json;
        return [ps.html, ps.json, true];
    };
    Formatter.prototype.arrayHandler = function (ps, onEnd) {
        var curIndent;
        if (ps.obj.length > 0) {
            ps.html += this.isExpand ? this.brcPre('[', 'arr', true) + this.brkline() : this.brcPre('[', 'arr');
            ps.json += this.isExpand ? '[\n' : '[';
            this.level++;
            for (var i = 0; i < ps.obj.length; i++) {
                curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
                var rtVal = this.valueHandler(ps.obj[i]);
                ps.html += curIndent;
                ps.html += rtVal[0];
                ps.html += this.isExpand
                    ? i < ps.obj.length - 1 ? this.comma + this.brkline() : this.brkline()
                    : i < ps.obj.length - 1 ? this.comma : '';
                ps.json += curIndent;
                ps.json += rtVal[1];
                ps.json += this.isExpand
                    ? i < ps.obj.length - 1 ? ',\n' : '\n'
                    : i < ps.obj.length - 1 ? ',' : '';
            }
            this.level--;
            curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
            ps.html += curIndent + this.brcEnd(']');
            ps.json += curIndent + ']';
        }
        else {
            ps.html += this.brcPre('[', 'arr') + this.brcEnd(']');
            ps.json += '[]';
        }
        onEnd(ps);
    };
    Formatter.prototype.objectHandler = function (ps, onEnd) {
        var curIndent;
        if (fn.objLen(ps.obj) > 0) {
            ps.html += this.isExpand ? this.brcPre('{', 'obj', true) + this.brkline() : this.brcPre('{', 'obj');
            ps.json += this.isExpand ? '{\n' : '{';
            this.level++;
            var idx = 0;
            var objLength = fn.objLen(ps.obj);
            for (var key in ps.obj) {
                if (ps.obj.hasOwnProperty(key)) {
                    idx++;
                    var prop = ps.isToJson
                        ? "\"" + key + "\""
                        : ps.conf.isQuoteKey ? this.help.quoteVal(key, ps.conf.quotes) : key;
                    curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
                    var rtVal = this.valueHandler(ps.obj[key]);
                    ps.html += curIndent;
                    ps.html += this.propFmt(prop);
                    ps.html += this.isExpand ? this.colon_ : this.colon;
                    ps.html += rtVal[0];
                    ps.html += this.isExpand
                        ? idx < objLength ? this.comma + this.brkline() : this.brkline()
                        : idx < objLength ? this.comma : '';
                    ps.json += curIndent;
                    ps.json += prop;
                    ps.json += this.isExpand ? ': ' : ':';
                    ps.json += rtVal[1];
                    ps.json += this.isExpand
                        ? idx < objLength ? ',\n' : '\n'
                        : idx < objLength ? ',' : '';
                }
            }
            this.level--;
            curIndent = this.isExpand ? this.help.getCurIndent(this.baseIndent, this.level) : '';
            ps.html += curIndent + this.brcEnd('}');
            ps.json += curIndent + '}';
        }
        else {
            ps.html += this.brcPre('{', 'obj') + this.brcEnd('}');
            ps.json += '{}';
        }
        onEnd(ps);
    };
    Formatter.prototype.valueHandler = function (value) {
        var conf = this.dt.conf;
        switch (typeof value) {
            case 'undefined':
                return [this.nullFmt(String(value)), String(value)];
            case 'function':
                return [this.funcFmt(String(value)), String(value)];
            case 'number':
                return [this.numbFmt(value), value];
            case 'boolean':
                return [this.boolFmt(value), value];
            case 'object':
                this.dt.src = value;
                return this.doFormate1();
            case 'string':
                var isToJson = conf && conf.hasOwnProperty('type') && conf.type === 'json';
                var strVal = isToJson ? "\"" + value.replace(/"/mg, '\\"') + "\"" : "'" + value.replace(/'/mg, '\\\'') + "'";
                var strValue = strVal.split('<').join('&lt;').split('>').join('&gt;');
                return [this.striFmt(strValue), strValue];
            default: return [this.nullFmt(value), value];
        }
    };
    /**
     * 描述: 格式化错误的JSON
     * @param src [string]
     * @param conf [Configs]
     */
    Formatter.prototype.doFormate2 = function () {
        this.dt.src = this.dt.src.replace(/^\s*/, '');
        if (this.dt.src.length > 0) {
            var conf = this.dt.conf;
            switch (this.dt.src[0]) {
                case '\'':
                case '"':
                    this.quotaHandler();
                    break;
                case ':':
                    this.colonHandler();
                    break;
                case ',':
                    this.commaHandler();
                    break;
                case '{':
                    this.objPreHandler();
                    break;
                case '}':
                    this.objEndHandler();
                    break;
                case '[':
                    this.arrPreHandler();
                    break;
                case ']':
                    this.arrEndHandler();
                    break;
                case '(':
                    this.tupPreHandler();
                    break;
                case ')':
                    this.tupEndHandler();
                    break;
            }
            var unicMts = this.dt.src.match(/^u'/);
            var unicMtd = this.dt.src.match(/^u"/);
            if (unicMts || unicMtd) {
                return this.unicHandler(unicMts);
            }
            var numbMt = this.dt.src.match(/^(-?[0-9]+\.?[0-9]*|0[xX][0-9a-fA-F]+)/);
            if (numbMt) {
                return this.numbHandler(numbMt);
            }
            var boolMt = this.dt.src.match(/^(true|false|True|False)/);
            if (boolMt) {
                return this.boolHandler(boolMt);
            }
            var nullMt = this.dt.src.match(/^(null|undefined|None|NaN)/);
            if (nullMt) {
                return this.nullHandler(nullMt);
            }
            this.otheHandler();
        }
    };
    Formatter.prototype.quotaHandler = function () {
        if (this.dt.src[0] === '\'') {
            this.ck.isSrcJson = false;
        }
        var rest = this.help.getSrcRest(this.dt.src);
        var restIdx = rest.indexOf(this.dt.src[0]);
        this.chkExpect(this.dt.src[0]);
        if (restIdx > -1) {
            if (this.ck.exceptVal === 'ost') {
                this.dt.html += this.propFmt(this.dt.src.substr(0, restIdx + 2));
            }
            else {
                this.dt.html += this.striFmt(this.dt.src.substr(0, restIdx + 2));
            }
            this.dt.json += this.dt.src.substr(0, restIdx + 2);
            this.setExpect(this.dt.src[0]);
            this.dt.src = this.help.getSrcRest(this.dt.src, restIdx + 2);
            this.doFormate2();
        }
        else {
            this.dt.html += this.striFmt(this.dt.src);
            this.dt.json += this.dt.src;
            this.setExpect('!');
            this.dt.src = '';
            this.doFormate2();
        }
    };
    Formatter.prototype.colonHandler = function () {
        this.dt.html += this.isExpand ? this.colon_ : this.colon;
        this.dt.json += this.isExpand ? ': ' : ':';
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        this.dt.src = this.help.getSrcRest(this.dt.src);
        this.doFormate2();
    };
    Formatter.prototype.commaHandler = function () {
        var curIndent = this.help.getCurIndent(this.baseIndent, this.level);
        var bklIdt = this.isExpand ? this.brkline() + curIndent : '';
        this.dt.html += this.comma + bklIdt;
        this.dt.json += this.isExpand ? ',\n' + curIndent : ',';
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        this.dt.src = this.help.getSrcRest(this.dt.src);
        this.doFormate2();
    };
    Formatter.prototype.objPreHandler = function () {
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        if (this.dt.src[1] && this.dt.src[1] === '}') {
            this.dt.html += this.brcPre('{', 'obj') + this.brcEnd('}');
            this.dt.json += '{}';
            this.setExpect('}');
            this.dt.src = this.help.getSrcRest(this.dt.src, 2);
            this.doFormate2();
        }
        else {
            this.level++;
            var curIndent = this.help.getCurIndent(this.baseIndent, this.level);
            this.dt.html += this.isExpand ? this.brcPre('{', 'obj', true) : this.brcPre('{', 'obj');
            this.dt.json += '{';
            this.dt.html += this.isExpand ? this.brkline() + curIndent : '';
            this.dt.json += this.isExpand ? '\n' + curIndent : '';
            this.dt.src = this.help.getSrcRest(this.dt.src);
            this.doFormate2();
        }
    };
    Formatter.prototype.objEndHandler = function () {
        this.level--;
        var curIndent = this.help.getCurIndent(this.baseIndent, this.level);
        var bklIdt = this.isExpand ? this.brkline() + curIndent : '';
        this.dt.html += bklIdt + this.brcEnd('}');
        this.dt.json += this.isExpand ? "\n" + curIndent + "}" : '';
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        this.dt.src = this.help.getSrcRest(this.dt.src);
        this.doFormate2();
    };
    Formatter.prototype.arrPreHandler = function () {
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        if (this.dt.src[1] && this.dt.src[1] === ']') {
            this.dt.html += this.brcPre('[', 'arr') + this.brcEnd(']');
            this.dt.json += '[]';
            this.setExpect(']');
            this.dt.src = this.help.getSrcRest(this.dt.src, 2);
            this.doFormate2();
        }
        else {
            this.level++;
            var curIndent = this.help.getCurIndent(this.baseIndent, this.level);
            this.dt.html += this.isExpand ? this.brcPre('[', 'arr', true) : this.brcPre('[', 'arr');
            this.dt.json += '[';
            this.dt.html += this.isExpand ? this.brkline() + curIndent : '';
            this.dt.json += this.isExpand ? '\n' + curIndent : '';
            this.dt.src = this.help.getSrcRest(this.dt.src);
            this.doFormate2();
        }
    };
    Formatter.prototype.arrEndHandler = function () {
        this.level--;
        var curIndent = this.help.getCurIndent(this.baseIndent, this.level);
        var bklIdt = this.isExpand ? this.brkline() + curIndent : '';
        this.dt.html += bklIdt + this.brcEnd(']');
        this.dt.json += this.isExpand ? "\n" + curIndent + "]" : '';
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        this.dt.src = this.help.getSrcRest(this.dt.src);
        this.doFormate2();
    };
    Formatter.prototype.tupPreHandler = function () {
        this.ck.srcAcType = this.ck.srcAcType || 'pyMap';
        this.chkExpect(this.dt.src[0]);
        if (this.dt.src[1] && this.dt.src[1] === ')') {
            this.dt.html += this.brcPre('(', 'arr') + this.brcEnd(')');
            this.dt.json += '()';
            this.setExpect(')');
            this.dt.src = this.help.getSrcRest(this.dt.src, 2);
            this.doFormate2();
        }
        else {
            this.level++;
            var curIndent = this.help.getCurIndent(this.baseIndent, this.level);
            this.dt.html += this.isExpand ? this.brcPre('(', 'arr', true) : this.brcPre('(', 'arr');
            this.dt.json += '(';
            this.dt.html += this.isExpand ? this.brkline() + curIndent : '';
            this.dt.json += this.isExpand ? '\n' + curIndent : '';
            this.dt.src = this.help.getSrcRest(this.dt.src);
            this.doFormate2();
        }
    };
    Formatter.prototype.tupEndHandler = function () {
        this.level--;
        var curIndent = this.help.getCurIndent(this.baseIndent, this.level);
        var bklIdt = this.isExpand ? this.brkline() + curIndent : '';
        this.dt.html += bklIdt + this.brcEnd(')');
        this.dt.json += this.isExpand ? "\n" + curIndent + ")" : '';
        this.chkExpect(this.dt.src[0]);
        this.setExpect(this.dt.src[0]);
        this.dt.src = this.help.getSrcRest(this.dt.src);
        this.doFormate2();
    };
    Formatter.prototype.unicHandler = function (unicMts) {
        this.ck.srcAcType = this.ck.srcAcType || 'pyMap';
        var rest = this.help.getSrcRest(this.dt.src, 2);
        var restIdx = unicMts ? rest.indexOf('\'') : rest.indexOf('"');
        this.chkExpect('u');
        if (restIdx > -1) {
            if (this.ck.exceptVal === 'ost') {
                this.dt.html += this.propFmt(this.dt.src.substr(0, restIdx + 3));
            }
            else {
                this.dt.html += this.striFmt(this.dt.src.substr(0, restIdx + 3));
            }
            this.dt.json += this.dt.src.substr(0, restIdx + 3);
            this.setExpect('u');
            this.dt.src = this.help.getSrcRest(this.dt.src, restIdx + 3);
            this.doFormate2();
        }
        else {
            this.dt.html += this.striFmt(this.dt.src);
            this.dt.json += this.dt.src;
            this.setExpect('!');
            this.dt.src = '';
            this.doFormate2();
        }
    };
    Formatter.prototype.numbHandler = function (numbMt) {
        this.dt.html += this.numbFmt(numbMt[0]);
        this.dt.json += numbMt[0];
        this.chkExpect('n');
        this.setExpect('n');
        this.dt.src = this.help.getSrcRest(this.dt.src, numbMt[0].length);
        this.doFormate2();
    };
    Formatter.prototype.boolHandler = function (boolMt) {
        this.ck.srcAcType = this.ck.srcAcType || (['True', 'False'].includes(boolMt[0]) ? 'pyMap' : 'jsObj');
        this.dt.html += this.boolFmt(boolMt[0]);
        this.dt.json += boolMt[0];
        this.chkExpect('b');
        this.setExpect('b');
        this.dt.src = this.help.getSrcRest(this.dt.src, boolMt[0].length);
        this.doFormate2();
    };
    Formatter.prototype.nullHandler = function (nullMt) {
        this.ck.srcAcType = this.ck.srcAcType || (['None'].includes(nullMt[0]) ? 'pyMap' : 'jsObj');
        this.dt.html += this.nullFmt(nullMt[0]);
        this.dt.json += nullMt[0];
        this.chkExpect('N');
        this.setExpect('N');
        this.dt.src = this.help.getSrcRest(this.dt.src, nullMt[0].length);
        this.doFormate2();
    };
    Formatter.prototype.otheHandler = function () {
        var strMatch = this.dt.src.match(/^[^\{\}\[\]:,]*/);
        var strMated = strMatch && strMatch[0] || '';
        if (strMated) {
            this.dt.html += this.nullFmt(strMated);
            this.dt.json += strMated;
            this.chkExpect('!');
            this.dt.src = this.help.getSrcRest(this.dt.src, strMated.length);
            this.doFormate2();
        }
    };
    Formatter.prototype.chkExpect = function (sig) {
        if (this.st.isSrcValid) {
            switch (this.ck.exceptVal) {
                case 'val':
                    if (':,}])!'.includes(sig)) {
                        this.expection('val');
                    }
                    break;
                case 'ost':
                    if (!'\'"unbN'.includes(sig)) {
                        this.expection('ost');
                    }
                    break;
                case 'end':
                    var endBrc = this.help.getBraceMir(this.ck.exceptType);
                    if (![',', endBrc].includes(sig)) {
                        this.expection('end', endBrc);
                    }
                    break;
                case 'col':
                    if (sig !== ':') {
                        this.expection('col');
                    }
                    break;
            }
        }
    };
    Formatter.prototype.setExpect = function (sig) {
        switch (sig) {
            case ':':
                this.ck.exceptVal = 'val';
                break;
            case ',':
                this.ck.exceptType === '{'
                    ? this.ck.exceptVal = 'ost'
                    : this.ck.exceptVal = 'val';
                break;
            case '{':
                this.ck.exceptType = sig;
                this.ck.deepIdxCon += sig;
                this.ck.exceptVal = 'ost';
                break;
            case '}':
                this.ck.deepIdxCon = this.ck.deepIdxCon.substr(0, this.ck.deepIdxCon.length - 1);
                this.ck.exceptType = this.ck.deepIdxCon.substr(-1);
                this.ck.exceptVal = 'end';
                break;
            case '[':
                this.ck.exceptType = sig;
                this.ck.deepIdxCon += sig;
                this.ck.exceptVal = 'val';
                break;
            case ']':
                this.ck.deepIdxCon = this.ck.deepIdxCon.substr(0, this.ck.deepIdxCon.length - 1);
                this.ck.exceptType = this.ck.deepIdxCon.substr(-1);
                this.ck.exceptVal = 'end';
                break;
            case '(':
                this.ck.exceptType = sig;
                this.ck.deepIdxCon += sig;
                this.ck.exceptVal = 'val';
                break;
            case ')':
                this.ck.deepIdxCon = this.ck.deepIdxCon.substr(0, this.ck.deepIdxCon.length - 1);
                this.ck.exceptType = this.ck.deepIdxCon.substr(-1);
                this.ck.exceptVal = 'end';
                break;
            case 'u':
            case 'n':
            case 'b':
            case 'N':
            case '"':
            case '\'':
                this.ck.exceptVal === 'ost'
                    ? this.ck.exceptVal = 'col'
                    : this.ck.exceptVal = 'end';
                break;
        }
    };
    Formatter.prototype.expection = function (type, brc) {
        if (brc === void 0) { brc = ''; }
        var expInfo = this.getExpInfo(type, brc);
        if (['ost', 'col', 'val', 'end'].includes(type)) {
            this.st.isSrcValid = false;
            this.st.errRowIdx = this.rowIdx;
        }
        this.st.altType = expInfo.Tpe;
        this.st.altMesg = expInfo.msg;
    };
    return Formatter;
}(_formatter_conf__WEBPACK_IMPORTED_MODULE_0__["FmterEles"]));



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Code\pxjson\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map