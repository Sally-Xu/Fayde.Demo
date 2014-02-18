/// <reference path="../lib/Fayde/Fayde.d.ts" />
class Pen {
    Path: Fayde.Shapes.Path;
    private _Figure: Fayde.Media.PathFigure;

    constructor(public Width?: number, public PenColor?: Color) {   
        var path = this.Path = new Fayde.Shapes.Path();
        path.Stroke = Fayde.Media.SolidColorBrush.FromColor(PenColor? PenColor : Color.KnownColors.Black);
        path.StrokeThickness = Width? Width : 4.0;
        var geom = path.Data = new Fayde.Media.PathGeometry();
        geom.Figures.Add(this._Figure = new Fayde.Media.PathFigure());
    }

    Attach(pad: DrawingPad) {
        pad.Children.Add(this.Path);
    }

    Start(pos: Point) {
        this._Figure.StartPoint = pos;
    }
    Move(pos: Point) {
        var figure = this._Figure;
        var segment = new Fayde.Media.LineSegment();
        segment.Point = pos;
        figure.Segments.Add(segment);
    }    
}

class DrawingPad extends Fayde.Controls.Canvas {
    private _current: Pen;
    constructor() {
        super();
        this.Background = Fayde.Media.SolidColorBrush.FromColor(Color.KnownColors.Transparent);
    }
    
    OnMouseLeftButtonDown(e: Fayde.Input.MouseEventArgs) {
        this.CaptureMouse();
        this._current = new Pen(5, Color.KnownColors.Black);      
        this._current.Attach(this);
        this._current.Start(e.GetPosition(this));
    }

    OnMouseLeftButtonUp(e: Fayde.Input.MouseEventArgs) {
        this.ReleaseMouseCapture();
        if (this._current) {
            this._current.Move(e.GetPosition(this));
            this._current = null;
        }
    }

    OnMouseMove(e: Fayde.Input.MouseEventArgs) {
        if (this._current)
            this._current.Move(e.GetPosition(this));
    }

    OnTouchDown(e: Fayde.Input.TouchEventArgs) {
        var tp = e.GetTouchPoint(this);
        this._current = new Pen();      
        this._current.Attach(this);  
        console.log(tp.Position.toString());
        this._current.Start(tp.Position);      
    }

    OnTouchUp(e: Fayde.Input.TouchEventArgs) {
        var tp = e.GetTouchPoint(this);
        if (this._current) {           
            console.log(tp.Position.toString());
            this._current.Move(tp.Position);
            this._current = null;
        }
    }

    OnTouchMove(e: Fayde.Input.TouchEventArgs) {        
        if (this._current) {
            var tp = e.GetTouchPoint(this);
            console.log(tp.Position.toString());
            this._current.Move(tp.Position);
        }
    }
    OnTouchEnter(e: Fayde.Input.TouchEventArgs) {
    }
    OnTouchLeave(e: Fayde.Input.TouchEventArgs) {
    }
}
export = DrawingPad;