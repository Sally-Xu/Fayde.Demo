/// <reference path="../fayde/fayde.d.ts" />
class Mesh extends Fayde.Controls.Grid {
    constructor() {
        super();
        this.Loaded.Subscribe(this._Load, this);
    }

    private _Load(sender, e: EventArgs) {
        var length = 500 / 10;
        var lineBrush = new Fayde.Media.SolidColorBrush();
        lineBrush.Color = Color.KnownColors.Black;
        var nodeBrush = new Fayde.Media.SolidColorBrush();
        nodeBrush.Color = Color.KnownColors.Red;
        for (var i = 0; i <= 10; i++) {
            var line = new Fayde.Shapes.Rectangle();
            line.VerticalAlignment = Fayde.VerticalAlignment.Stretch;
            line.HorizontalAlignment = Fayde.HorizontalAlignment.Left;
            line.Fill = lineBrush;
            line.Margin = new Thickness(i * length, 0);
            line.Width = 1;
            this.Children.Add(line);
        }


        for (var j = 0; j <= 10; j++) {
            var line = new Fayde.Shapes.Rectangle();
            line.VerticalAlignment = Fayde.VerticalAlignment.Top;
            line.HorizontalAlignment = Fayde.HorizontalAlignment.Stretch;
            line.Fill = lineBrush;
            line.Margin = new Thickness(0, j * length);
            line.Height = 1;
            this.Children.Add(line);
        }

        for (var i = 0; i <= 10; i++) {
            for (var j = 0; j <= 10; j++) {
                var point = new Fayde.Shapes.Ellipse();
                point.Stroke = nodeBrush;
                point.Fill = nodeBrush;
                point.StrokeThickness = 1;
                point.Width = 1;
                point.Height = 1;
                point.HorizontalAlignment = Fayde.HorizontalAlignment.Left;
                point.VerticalAlignment = Fayde.VerticalAlignment.Top;
                point.Margin = new Thickness(i * length, j * length);
                this.Children.Add(point);
            }
        }
    }
}
export = Mesh;  