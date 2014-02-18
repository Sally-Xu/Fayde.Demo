/// <reference path="../lib/Fayde/Fayde.d.ts" />

class DrawingPadViewModel extends Fayde.MVVM.ViewModelBase {
    private _commands: Map<string, Fayde.Input.ICommand>;
    get Commands() {
        return this._commands;
    }
    private _clearCommand: Fayde.Input.ICommand
    get ClearCommand() {
        if (!this._clearCommand) {
            this._clearCommand = new Fayde.MVVM.RelayCommand(
                () => this.Clear(),
                () => this.CanClear());
        }
        return this._clearCommand;
    }
   
    PenWidth: number;
    PenColor: Color;
    constructor() {
        super();       
        this.Load();
    }
       
    private Clear() {   
        var s = "test";     
    }
    private CanClear() {    
        return true;   
    }

    Load() {
      
    }
}
export = DrawingPadViewModel 