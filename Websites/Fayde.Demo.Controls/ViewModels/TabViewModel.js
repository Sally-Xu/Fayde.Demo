var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var TabViewModel = (function (_super) {
        __extends(TabViewModel, _super);
        function TabViewModel() {
            _super.call(this);
            this.Tabs = new Fayde.Collections.ObservableCollection();
            this._addTabCommand = null;
            this.Load();
        }
        Object.defineProperty(TabViewModel.prototype, "AddTabCommand", {
            get: function () {
                var _this = this;
                if (this._addTabCommand === null) {
                    this._addTabCommand = new Fayde.MVVM.RelayCommand(function () {
                        return _this.AddTab();
                    }, function () {
                        return _this.CanAddTab();
                    });
                }
                return this._addTabCommand;
            },
            enumerable: true,
            configurable: true
        });

        TabViewModel.prototype.AddTab = function () {
            var index = this.Tabs.Count + 1;
            var item = new Fayde.Controls.TabItem();
            item.Header = "Tab" + index;
            item.Content = "Content in Tab" + index;
            this.Tabs.Add(item);
        };
        TabViewModel.prototype.CanAddTab = function () {
            return this.Tabs.Count < 10;
        };

        TabViewModel.prototype.Load = function () {
            this.AddTab();
            this.AddTab();
        };
        return TabViewModel;
    })(Fayde.MVVM.ViewModelBase);
    
    return TabViewModel;
});
