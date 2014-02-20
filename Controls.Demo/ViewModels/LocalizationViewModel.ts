/// <reference path="../lib/fayde.utility/resourcemanager.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />
import TestData = require("Models/TestData");

class LocalizationViewModel extends Fayde.MVVM.ViewModelBase {

    private _languages: Fayde.Collections.ObservableCollection<TestData> = new Fayde.Collections.ObservableCollection<TestData>();
    get Languages() {
        return this._languages;
    }    

    private _selectedLanguage: string;
    get SelectedLanguage(){
        return this._selectedLanguage;
    }
    set SelectedLanguage(val: string) {
        if (this._selectedLanguage != val) {
            this._selectedLanguage = val;
            this.OnPropertyChanged("SelectedLanguage");
        }       
    }
    constructor() {
        super();
        this.Load();
    }
    Load() {
        this._languages.Add(new TestData("en", "English"));
        this._languages.Add(new TestData("fr", "French"));
        this._languages.Add(new TestData("gr", "German"));
        this._languages.Add(new TestData("cn", "中文"));     
    }

    OnPropertyChanged(prop: string ) {
        if (prop == "SelectedLanguage") {              
            //var dict = Fayde.Xaml.XamlDocument.GetAsync("Resources/en/AppRC.resx");
            //alert("here");        
        }
    }

    
}
export = LocalizationViewModel  