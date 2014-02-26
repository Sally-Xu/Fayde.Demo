/// <reference path="../lib/fayde/fayde.d.ts" />
import MouseEventArgs = Fayde.Input.MouseEventArgs;
class Map extends Fayde.Controls.Canvas {
    constructor() {
        super();
        this.Loaded.Subscribe(this._Load, this);
    }
    private _Load(sender, e: EventArgs) {
        var canvas = this;
        var enumerator = canvas.Children.GetEnumerator();
        while (enumerator.MoveNext()) {
            var cur = <Fayde.Shapes.Path>enumerator.Current;
            cur.MouseEnter.Subscribe(this._MouseEnter, this);
            cur.MouseLeave.Subscribe(this._MouseLeave, this);
        }
    }

    private _MouseEnter(sender, e: MouseEventArgs) {
        var path = <Fayde.Shapes.Path>sender;
        path.StrokeThickness = 10;
        Fayde.Controls.Canvas.SetZIndex(path, 9999);
    }
    private _MouseLeave(sender, e: MouseEventArgs) {
        var path = <Fayde.Shapes.Path>sender;
        path.StrokeThickness = 2;
        Fayde.Controls.Canvas.SetZIndex(path, 0);
    }
}
export = Map; 