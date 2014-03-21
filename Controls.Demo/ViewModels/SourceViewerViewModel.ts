/// <reference path="../lib/Fayde/Fayde.d.ts" />

class SourceViewerViewModel  extends Fayde.MVVM.ViewModelBase {

    private _xamlSource : string;
    get XAMLSource() {
        return this._xamlSource;
    } 

    private _viewModelSource : string;
    get ViewModelSource() {
        return this._viewModelSource;
    } 

    private _pageName : string;
    get PageName(): string{
        return this._pageName;
    }
    set PageName(value: string) {
        if (this._pageName !== value) {
            this._pageName = value;
            this.Load();
        }
    }
    constructor() {
        super();
        this.PageName = "home";
    }

    Load() {
        var d = defer();
        if (this.PageName !== undefined) {
            var url = "text!Views/" + this.PageName + ".fayde";
            var _self = this;
            require([url], function (doc) {
                _self._xamlSource = doc;
                _self.OnPropertyChanged("XAMLSource");
            });  
        }
        //url = "text!ViewModels/" + this.PageName + "ViewModel.ts";
        //require([url], function (doc) {
        //    _self._viewModelSource = doc;
        //    _self.OnPropertyChanged("ViewModelSource");
        //});         
    }
}
export = SourceViewerViewModel 