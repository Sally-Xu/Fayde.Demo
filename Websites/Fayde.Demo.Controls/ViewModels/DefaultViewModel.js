var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Models/TreeData"], function(require, exports, MenuItem) {
    var DefaultViewModel = (function (_super) {
        __extends(DefaultViewModel, _super);
        function DefaultViewModel() {
            _super.call(this);
            this.Menu = new Fayde.Collections.ObservableCollection();
            this.Load();
        }
        DefaultViewModel.prototype.Load = function () {
            var item = new MenuItem("Controls");
            this.Menu.Add(item);
            item.Children.Add(new MenuItem("Input Controls", "Input"));
            item.Children.Add(new MenuItem("Drawing Pad", "DrawingPad"));
            item.Children.Add(new MenuItem("ItemsControl", "ItemsControl"));
            item.Children.Add(new MenuItem("DatePicker", "DatePicker"));
            item.Children.Add(new MenuItem("Calendar", "Calendar"));
            item.Children.Add(new MenuItem("GridSpliter", "GridSpliter"));
            item.Children.Add(new MenuItem("TreeView", "TreeView"));
            item.Children.Add(new MenuItem("Tab Control", "Tab"));
            item.Children.Add(new MenuItem("Accordion", "Accordion"));

            var item = new MenuItem("Layout Panels");
            this.Menu.Add(item);
            item.Children.Add(new MenuItem("Grid", "TreeView"));
            item.Children.Add(new MenuItem("StackPanel", "Home"));
            item.Children.Add(new MenuItem("DockPanel", "TreeView"));
            item.Children.Add(new MenuItem("WrapPanel", "Home"));

            var item = new MenuItem("DataVisualization");
            this.Menu.Add(item);
            item.Children.Add(new MenuItem("Area Series", "TreeView"));
            item.Children.Add(new MenuItem("Bar Series", "TreeView"));
            item.Children.Add(new MenuItem("Bubble Series", "TreeView"));
            item.Children.Add(new MenuItem("Column Series", "TreeView"));
            item.Children.Add(new MenuItem("Line Series", "TreeView"));
            item.Children.Add(new MenuItem("Pie Series", "TreeView"));
            item.Children.Add(new MenuItem("Scatter Series", "TreeView"));
            item.Children.Add(new MenuItem("Stacked Series", "TreeView"));
            item.Children.Add(new MenuItem("TreeMap", "TreeView"));

            var item = new MenuItem("Navigation", "Navigation");
            this.Menu.Add(item);

            var item = new MenuItem("Theming", "Theming");
            this.Menu.Add(item);
        };
        return DefaultViewModel;
    })(Fayde.MVVM.ViewModelBase);

    
    return DefaultViewModel;
});
