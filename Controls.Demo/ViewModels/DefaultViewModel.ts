/// <reference path="../lib/Fayde/Fayde.d.ts" />

import MenuItem = require("Models/TreeData");
import SourceViewerViewModel = require("ViewModels/SourceViewerViewModel");

class DefaultViewModel extends Fayde.MVVM.ViewModelBase {
    Menu: Fayde.Collections.ObservableCollection<MenuItem> = new Fayde.Collections.ObservableCollection<MenuItem>();

    constructor() {
        super();
        this.Load();
    }

    private _currentItem: MenuItem;
    get CurrentItem() : MenuItem{
        return this._currentItem;
    }
    set CurrentItem(value: MenuItem) {
        this._currentItem = value;
        this.SourceVM.PageName = value.Url;
    }

    private _sourceViewModel: SourceViewerViewModel = new SourceViewerViewModel();
    get SourceVM(): SourceViewerViewModel {
        return this._sourceViewModel;
    }

    Load() {
        var item = new MenuItem("Controls");
        this.Menu.Add(item);
        item.Children.Add(new MenuItem("Input Controls", "Input"));
        item.Children.Add(new MenuItem("Drawing Pad", "DrawingPad"));
        item.Children.Add(new MenuItem("ItemsControl", "ItemsControl"));
        item.Children.Add(new MenuItem("Slider and Progress Bar", "Slider"));
        item.Children.Add(new MenuItem("DatePicker", "DatePicker"));
        item.Children.Add(new MenuItem("Calendar", "Calendar"));
        item.Children.Add(new MenuItem("TreeView", "TreeView"));
        item.Children.Add(new MenuItem("Tab Control", "Tab"));
        item.Children.Add(new MenuItem("HeaderedItemsControl", "HeaderedItemsControl"));
        item.Children.Add(new MenuItem("Child Window", "ChildWindow"));
        item.Children.Add(new MenuItem("ContextMenu", "ContextMenu"));
        item.Children.Add(new MenuItem("Drag and Drop Control", "DragDropControl"));

        item = new MenuItem("Layout");
        this.Menu.Add(item);
        item.Children.Add(new MenuItem("Grid", "TreeView"));
        item.Children.Add(new MenuItem("StackPanel", "StackPanel"));
        item.Children.Add(new MenuItem("TabPanel", "TabPanel"));
        item.Children.Add(new MenuItem("WrapPanel", "WrapPanel"));
        item.Children.Add(new MenuItem("DockPanel", "DockPanel"));
        item.Children.Add(new MenuItem("GridSplitter", "GridSplitter"));
        item.Children.Add(new MenuItem("RenderTransform", "RenderTransform"));

        item = new MenuItem("Shapes");
        this.Menu.Add(item);
        item.Children.Add(new MenuItem("Shapes", "Shapes"));
        item.Children.Add(new MenuItem("Map", "Map"));
        item.Children.Add(new MenuItem("Mesh", "Mesh"));

        item = new MenuItem("DataVisualization");
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

        item = new MenuItem("Navigation", "Navigation");
        this.Menu.Add(item);

        item = new MenuItem("Localization", "Localization");
        this.Menu.Add(item);
    }
}

export = DefaultViewModel;