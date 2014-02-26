/// <reference path="../lib/Fayde.Controls/Fayde.Controls.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />
import TestData = require("Models/TestData");
class ThemingViewModel extends Fayde.MVVM.ViewModelBase {

    private _themes: Fayde.Collections.ObservableCollection<string> = new Fayde.Collections.ObservableCollection<string>();
    get Themes() {
        return this._themes;
    }

    private _selectedTheme: string;
    get SelectedTheme() {
        return this._selectedTheme;
    }
    set SelectedTheme(val: string) {
        if (this._selectedTheme != val) {
            this._selectedTheme = val;
            this.OnPropertyChanged("SelectedTheme");
        }
    }
    constructor() {
        super();
        this.Load();
    }
    Load() {
        this._themes.Add("Default");
        this._themes.Add("Metro");   
        this._selectedTheme = Fayde.Application.Current.ThemeName;
    }

    OnPropertyChanged(prop: string) {
        if (prop == "SelectedTheme") {
            Fayde.Application.Current.ThemeName = this.SelectedTheme;      
        }
    }
}
export = ThemingViewModel   