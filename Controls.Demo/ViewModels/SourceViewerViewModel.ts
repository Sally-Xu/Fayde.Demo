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

    PageName: string;

    constructor() {
        super();
        this.Load();
    }
    Load() {
        this.PageName = "home";
        var d = defer();
        var url = "text!Views/" + this.PageName + ".fayde";
        var _self = this;
        require([url], function (doc) {
            _self._xamlSource = doc;
            _self.OnPropertyChanged("XAMLSource");
        });    
                    
        //var jsdoc = require("ViewModels/DefaultViewModel.js");
        //this._xamlSource = "<Grid/>";
        this._viewModelSource = "Test";
    }
}
export = SourceViewerViewModel 