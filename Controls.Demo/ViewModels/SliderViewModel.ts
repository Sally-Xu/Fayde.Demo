/// <reference path="../lib/Fayde/Fayde.d.ts" />

class SliderViewModel extends Fayde.MVVM.ViewModelBase {


    private _progress: number;

    get Progress() {
        return this._progress;
    }
    set Progress(val: number)
    {
        if (val != this._progress) {
            this._progress = val;
            this.OnPropertyChanged("Progress");
        }        
    }
    constructor() {
        super();
        this.Load();
    }
    Load() {
        this._progress = 30;
    }   
}
export = SliderViewModel    