/// <reference path="../lib/Fayde/Fayde.d.ts" />
import TestData = require("Models/TestData");


class ItemsControlViewModel extends Fayde.MVVM.ViewModelBase {

    private _radioButtonListSelection : Fayde.Collections.ObservableCollection<TestData> = new Fayde.Collections.ObservableCollection<TestData>();
    private _checkBoxListSelection : Fayde.Collections.ObservableCollection<TestData> = new Fayde.Collections.ObservableCollection<TestData>();
    get CheckBoxListSelection() {
        return this._checkBoxListSelection;
    }
    get RadioButtonListSelection() {
        return this._radioButtonListSelection;
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
        for (var i = 0; i < 5; i++)
            this.RadioButtonListSelection.Add(new TestData((i + 1) + "", "Option " + (i + 1)));

        for (var i = 0; i < 4; i++)
            this.CheckBoxListSelection.Add(new TestData((i + 1) + "", "Option " + (i + 1)));
    }
}
export = ItemsControlViewModel 