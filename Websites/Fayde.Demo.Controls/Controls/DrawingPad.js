var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Pen = (function () {
        function Pen(Width, PenColor) {
            this.Width = Width;
            this.PenColor = PenColor;
            var path = this.Path = new Fayde.Shapes.Path();
            path.Stroke = Fayde.Media.SolidColorBrush.FromColor(PenColor ? PenColor : Color.KnownColors.Black);
            path.StrokeThickness = Width ? Width : 4.0;
            var geom = path.Data = new Fayde.Media.PathGeometry();
            geom.Figures.Add(this._Figure = new Fayde.Media.PathFigure());
        }
        Pen.prototype.Attach = function (pad) {
            pad.Children.Add(this.Path);
        };

        Pen.prototype.Start = function (pos) {
            this._Figure.StartPoint = pos;
        };
        Pen.prototype.Move = function (pos) {
            var figure = this._Figure;
            var segment = new Fayde.Media.LineSegment();
            segment.Point = pos;
            figure.Segments.Add(segment);
        };
        return Pen;
    })();

    var DrawingPad = (function (_super) {
        __extends(DrawingPad, _super);
        function DrawingPad() {
            _super.call(this);
            this.Background = Fayde.Media.SolidColorBrush.FromColor(Color.KnownColors.Transparent);
        }
        DrawingPad.prototype.OnMouseLeftButtonDown = function (e) {
            this.CaptureMouse();
            this._current = new Pen(5, Color.KnownColors.Black);
            this._current.Attach(this);
            this._current.Start(e.GetPosition(this));
        };

        DrawingPad.prototype.OnMouseLeftButtonUp = function (e) {
            this.ReleaseMouseCapture();
            if (this._current) {
                this._current.Move(e.GetPosition(this));
                this._current = null;
            }
        };

        DrawingPad.prototype.OnMouseMove = function (e) {
            if (this._current)
                this._current.Move(e.GetPosition(this));
        };

        DrawingPad.prototype.OnTouchDown = function (e) {
            var tp = e.GetTouchPoint(this);
            this._current = new Pen();
            this._current.Attach(this);
            console.log(tp.Position.toString());
            this._current.Start(tp.Position);
        };

        DrawingPad.prototype.OnTouchUp = function (e) {
            var tp = e.GetTouchPoint(this);
            if (this._current) {
                console.log(tp.Position.toString());
                this._current.Move(tp.Position);
                this._current = null;
            }
        };

        DrawingPad.prototype.OnTouchMove = function (e) {
            if (this._current) {
                var tp = e.GetTouchPoint(this);
                console.log(tp.Position.toString());
                this._current.Move(tp.Position);
            }
        };
        DrawingPad.prototype.OnTouchEnter = function (e) {
        };
        DrawingPad.prototype.OnTouchLeave = function (e) {
        };
        return DrawingPad;
    })(Fayde.Controls.Canvas);
    
    return DrawingPad;
});
