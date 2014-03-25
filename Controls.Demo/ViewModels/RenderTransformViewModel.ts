/// <reference path="../lib/Fayde/Fayde.d.ts" />

class RenderTransformViewModel extends Fayde.MVVM.ViewModelBase {

    X: number = 100;
    Y: number = 100;

    private _moveCommand: Fayde.Input.ICommand = null;   
    get MoveCommand(): Fayde.Input.ICommand {
        if (this._moveCommand === null) {
            this._moveCommand = new Fayde.MVVM.RelayCommand(
                () => this.Move(),
                () => { return true;});
        }
        return this._moveCommand;
    }

    private Move() {
        this.X = this.X + 10;
        this.Y = this.Y + 10;
        this.OnPropertyChanged("X");
        this.OnPropertyChanged("Y");
    } 
}
export = RenderTransformViewModel
