module Fayde {
    export enum Corner {
        LeftTop,
        LeftBottom,
        RightTop,
        RightBottom,
    }

    export class Position {
        static GetPosition(e: FrameworkElement, relativeTo: FrameworkElement = null, p: Corner = Corner.LeftTop): Point{
            var point = e.TransformToVisual(relativeTo).Transform(new Point(0, 0));
            if (p === Corner.LeftTop) {
                return point;
            } 
            if (p === Corner.LeftBottom) {
                return new Point(point.X, point.Y + e.ActualHeight);
            }
            if (p === Corner.RightTop) {
                return new Point(point.X + e.ActualWidth, point.Y);
            }
            if (p === Corner.RightBottom) {
                return new Point(point.X + e.ActualWidth, point.Y + e.ActualHeight);
            }
        }
    }
}