/// <reference path="../lib/Fayde/Fayde.d.ts" />
import TestData = require("Models/TestData");

import TreeData = require("Models/TreeData");

class ItemsControlViewModel extends Fayde.MVVM.ViewModelBase {

    private _list : Fayde.Collections.ObservableCollection<TestData> = new Fayde.Collections.ObservableCollection<TestData>();
  
    get List() {
        return this._list;
    }
  
    private _tree: Fayde.Collections.ObservableCollection<TreeData> = new Fayde.Collections.ObservableCollection<TreeData>();
    get Tree() {
        return this._tree;
    }

    private _selectedItem: TestData;
    get SelectedItem() {
        return this._selectedItem;
    }

    set SelectedItem(val : TestData) {
        this._selectedItem = val;
        this.OnPropertyChanged("SelectedItem");
    }

    SelectedItems : Fayde.Collections.ObservableCollection<TestData> = new Fayde.Collections.ObservableCollection<TestData>();

    constructor() {
        super();
        this.Load();
    }

    Load() {
        for (var i = 1; i < 10; i++)
            this._list.Add(new TestData(i + "", "Option " + i, "Some Description " + i));

        for (var i = 1; i < 5; i++){
            var item = new TreeData("Header " + i);
            this.Tree.Add(item);
            for (var j = 1; j < 5; j++)
                item.Children.Add(new TreeData("Child" + i + "_" + j, "Some Content " + i + "_" + j));
        }  
    }
}
export = ItemsControlViewModel 