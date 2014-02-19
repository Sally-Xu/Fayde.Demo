/// <reference path="../lib/Fayde/Fayde.d.ts" />

class LocalizationViewModel extends Fayde.MVVM.ViewModelBase {

    private _rc: Fayde.Collections.ObservableCollection<string> = new Fayde.Collections.ObservableCollection<string>();
    get RC() {
        return this._rc;
    }
    constructor() {
        super();
        this.Load();
    }
    Load() {
        this.RC['label1'] = "Test1";
        this.RC['label2'] = "Test1";
    }
}
export = LocalizationViewModel  