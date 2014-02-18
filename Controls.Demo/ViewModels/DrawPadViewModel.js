/// <reference path="../lib/Fayde/Fayde.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var DrawingPadViewModel = (function (_super) {
        __extends(DrawingPadViewModel, _super);
        function DrawingPadViewModel() {
            _super.call(this);
            this._clearCommand = null;
            this._commands = new Map();
            this.Load();
        }
        Object.defineProperty(DrawingPadViewModel.prototype, "Commands", {
            get: function () {
                return this._commands;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DrawingPadViewModel.prototype, "ClearCommand", {
            get: function () {
                var _this = this;
                if (this._clearCommand === null) {
                    this._clearCommand = new Fayde.MVVM.RelayCommand(function () {
                        return _this.AddTab();
                    }, function () {
                        return _this.CanAddTab();
                    });
                }
                return this._clearCommand;
            },
            enumerable: true,
            configurable: true
        });

        DrawingPadViewModel.prototype.AddTab = function () {
        };
        DrawingPadViewModel.prototype.CanAddTab = function () {
            return true;
        };

        DrawingPadViewModel.prototype.Load = function () {
        };
        return DrawingPadViewModel;
    })(Fayde.MVVM.ViewModelBase);
    
    return DrawingPadViewModel;
});
//# sourceMappingURL=DrawPadViewModel.js.map
