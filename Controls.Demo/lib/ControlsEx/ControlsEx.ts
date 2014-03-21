/// <reference path="../Fayde.Controls/Fayde.Controls.d.ts" />
/// <reference path="../Fayde/Fayde.d.ts" />
/// <reference path="Helper/Position.ts" />
module ControlsEx {

    class OrientedSize {

        Direct: number;
        Indirect: number;

        get Width(): number {
            return this.Orientation === Fayde.Orientation.Horizontal ? this.Direct : this.Indirect;
        }
        set Width(value: number) {
            if (this.Orientation === Fayde.Orientation.Horizontal) {
                this.Direct = value;
            } else {
                this.Indirect = value;
            }
        }

        get Height(): number {
            return this.Orientation !== Fayde.Orientation.Horizontal ? this.Direct : this.Indirect;
        }
        set Height(value: number) {
            if (this.Orientation !== Fayde.Orientation.Horizontal) {
                this.Direct = value;
            } else {
                this.Indirect = value;
            }
        }
        constructor(public Orientation: Fayde.Orientation, width?: number, height?: number) {
            this.Width = width;
            this.Height = height;
        }

    }

    export class DraggableControl extends Fayde.Controls.ContentControl {

        PositionChanged = new MulticastEvent<EventArgs>();
        Resized = new MulticastEvent<EventArgs>();

        public static MaxZIndex: number = 1;

        private _Transform: Fayde.Media.TranslateTransform = new Fayde.Media.TranslateTransform();

        private _CurrentPoint: Point = null;
        private _SizingDirection: string = "";

        static CanResizeProperty: DependencyProperty = DependencyProperty.Register("CanResize", () => Boolean, DraggableControl, null);

        get CanResize(): boolean {
            return this.GetValue(DraggableControl.CanResizeProperty);
        }
        set CanResize(value: boolean) {
            this.SetValue(DraggableControl.CanResizeProperty, value);
        }

        static OffsetXProperty: DependencyProperty = DependencyProperty.
            Register("OffsetX", () => Number, DraggableControl, 0, (d, args) => (<DraggableControl>d).OnOffsetXChanged(args.OldValue, args.NewValue));
        static OffsetYProperty: DependencyProperty = DependencyProperty.
            Register("OffsetY", () => Number, DraggableControl, 0, (d, args) => (<DraggableControl>d).OnOffsetYChanged(args.OldValue, args.NewValue));

        OffsetX: number = 0;
        OffsetY: number = 0;

        private OnOffsetXChanged(oldValue: number, newValue: number) {
            if (oldValue !== newValue) {
                this._Transform.X = newValue;
            }
        }
        private OnOffsetYChanged(oldValue: number, newValue: number) {
            if (oldValue !== newValue) {
                this._Transform.Y = newValue;
            }
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.RenderTransform = this._Transform;
        }

        OnMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonDown(e);
            if (e.Handled) {
                return;
            }
            this.CaptureMouse();
            this._CurrentPoint = e.GetPosition(null);

            this.Opacity *= 0.8;
            this.CaptureMouse();
            var zIndex = this.GetValue(Fayde.Controls.Canvas.ZIndexProperty);
            if (zIndex > DraggableControl.MaxZIndex) {
                DraggableControl.MaxZIndex = zIndex + 1;
            } else if (zIndex < DraggableControl.MaxZIndex) {
                DraggableControl.MaxZIndex++;
            }
            this.SetValue(Fayde.Controls.Canvas.ZIndexProperty, DraggableControl.MaxZIndex);
        }

        OnMouseLeftButtonUp(e: Fayde.Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonUp(e);
            if (this._CurrentPoint !== null) {
                this.Opacity = 1;
                this._CurrentPoint = null;
            }
            this.ReleaseMouseCapture();
            this._SizingDirection = "";
        }

        OnMouseMove(e: Fayde.Input.MouseButtonEventArgs) {
            super.OnMouseMove(e);
            var newPoint = e.GetPosition(null);
            if (this._CurrentPoint !== null) {
                var change = new Point(newPoint.X - this._CurrentPoint.X, newPoint.Y - this._CurrentPoint.Y);
                //Make sure the Point is withing Application.Current.RootVisual
                var p0 = Fayde.Position.GetPosition(this);
                var p1 = Fayde.Position.GetPosition(<Fayde.FrameworkElement>this.VisualParent, null, Fayde.Corner.RightBottom);
                if (this._SizingDirection === "") {// Moving the Panel
                    //if (this.OffsetX + change.X > p0.X &&
                    //    this.OffsetY + change.Y > p0.Y &&
                    //    this.OffsetX + change.X + this.ActualWidth < p1.X &&
                    //    this.OffsetY + change.Y + this.ActualHeight < p1.Y) {

                    this.OffsetX += change.X;
                    this.OffsetY += change.Y;
                    this.PositionChanged.Raise(this, null);
                    //}
                } else { // Resize
                    if (newPoint.X > p0.X && newPoint.Y > p0.Y && newPoint.X < p1.X && newPoint.Y < p1.Y) {

                        if (this._SizingDirection.indexOf("n") > -1 && this.ActualHeight - change.Y > 2 &&
                            (this.MaxHeight !== Number.NaN && this.ActualHeight < this.MaxHeight && change.Y < 0 ||
                            this.MinHeight !== Number.NaN && this.ActualHeight > this.MinHeight && change.Y > 0)) {//North
                            this.OffsetY += change.Y;
                            this.Height = this.ActualHeight + change.Y;
                            this.PositionChanged.Raise(this, null);
                            this.Resized.Raise(this, null);
                        }
                        if (this._SizingDirection.indexOf("s") > -1 && this.ActualHeight + change.Y > 2 &&
                            (this.MaxHeight !== Number.NaN && this.ActualHeight < this.MaxHeight && change.Y > 0 ||
                            this.MinHeight !== Number.NaN && this.ActualHeight > this.MinHeight && change.Y < 0)) {//Sorth
                            this.Height = this.ActualHeight + change.Y;
                            this.Resized.Raise(this, null);
                        }
                        if (this._SizingDirection.indexOf("w") > -1 && this.ActualWidth - change.X > 2 &&
                            (this.MaxWidth !== Number.NaN && this.ActualWidth < this.MaxWidth && change.X < 0 ||
                            this.MinWidth !== Number.NaN && this.ActualWidth > this.MinWidth && change.X > 0)) {//West
                            this.OffsetX += change.X;
                            this.Width = this.ActualWidth + change.X;
                            this.PositionChanged.Raise(this, null);
                            this.Resized.Raise(this, null);
                        }
                        if (this._SizingDirection.indexOf("e") > -1 && this.ActualWidth + change.X > 2 &&
                            (this.MaxWidth !== Number.NaN && this.ActualWidth < this.MaxWidth && change.X > 0 ||
                            this.MinWidth !== Number.NaN && this.ActualWidth > this.MinWidth && change.X < 0)) {//East
                            this.Width = this.ActualWidth + change.X;
                            this.Resized.Raise(this, null);
                        }
                    }
                }
                this._CurrentPoint = newPoint;
            } else {
                // Check to see if mouse is on a resize area
                if (this.CanResize) {
                    this.ResizeHitTest(newPoint);
                    this.SetCursor();
                }
            }
        }

        private ResizeHitTest(pt: Point) {
            var x0 = pt.X;
            var y0 = pt.Y;

            var P = Fayde.Position.GetPosition(this);

            var x1 = P.X;
            var y1 = P.Y;
            var x2 = x1 + this.ActualWidth;
            var y2 = y1 + this.ActualHeight;

            // Corners
            if (Math.abs(x0 - x1) < 6 && Math.abs(y0 - y1) < 6) {
                this._SizingDirection = "nw";
            } else if (Math.abs(x0 - x1) < 6 && Math.abs(y2 - y0) < 6) {
                this._SizingDirection = "sw";
            } else if(Math.abs(x2 - x0) < 6 && Math.abs(y2 - y0) < 6) {
                this._SizingDirection = "se";
            } else if (Math.abs(x2 - x0) < 6 && Math.abs(y0 - y1) < 6) {
                this._SizingDirection = "ne";
            // Sides
            } else if (Math.abs(y0 - y1) < 4) {
                this._SizingDirection = "n";
            } else if (Math.abs(x2 - x0) < 4) {
                this._SizingDirection = "e";
            } else if (Math.abs(y2 - y0) < 4) {
                this._SizingDirection = "s";
            } else if (Math.abs(x0 - x1) < 4) {
                this._SizingDirection = "w";
            } else {
                this._SizingDirection = "";
            }
        }

        private SetCursor() {
            if (this._SizingDirection === "n" || this._SizingDirection === "s") {
                this.Cursor = Fayde.CursorType.SizeNS;
            } else if (this._SizingDirection === "w" || this._SizingDirection === "e") {
                this.Cursor = Fayde.CursorType.SizeWE;
            } else {
                this.Cursor = Fayde.CursorType.Default;
            }
        }
    }
    

    export class ChildWindow extends DraggableControl {
        private _ContentContainer: Fayde.Controls.Panel = null;
        private _ModalMask: Fayde.Shapes.Rectangle = null;
        private _CloseButton: Fayde.Controls.Button = null;
        private _MaximizeButton: Fayde.Controls.Primitives.ToggleButton = null;
        private _MinimizeButton: Fayde.Controls.Button = null;

        private _size0: size;
        private _p0 : Point;

        static HeaderProperty = DependencyProperty.Register("Header", () => Object, ChildWindow, undefined, (d, args) => (<ChildWindow>d).OnHeaderChanged(args.OldValue, args.NewValue));
        Header: any;
        private OnHeaderChanged(oldHeader: any, newHeader: any) {
        }

        static HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", () => Fayde.DataTemplate, ChildWindow, undefined, (d, args) => (<ChildWindow>d).OnHeaderTemplateChanged(args.OldValue, args.NewValue));
        HeaderTemplate: Fayde.DataTemplate;
        private OnHeaderTemplateChanged(oldHeaderTemplate: Fayde.DataTemplate, newHeaderTemplate: Fayde.DataTemplate) {
        }

        static IsModalProperty: DependencyProperty = DependencyProperty.Register("IsModal", () => Boolean, ChildWindow, false, null);
        IsModal: boolean;

        static ShowMaximizeButtonProperty: DependencyProperty = DependencyProperty.
            Register("ShowMaximizeButton", () => Boolean, ChildWindow, false, null);
        ShowMaximizeButton: boolean;

        static ShowMinimizeButtonProperty: DependencyProperty = DependencyProperty.
            Register("ShowMinimizeButton", () => Boolean, ChildWindow, false, null);
        ShowMinimizeButton: boolean;

        static IsOpenProperty: DependencyProperty = DependencyProperty.
            Register("IsOpen", () => Boolean, ChildWindow, true, (d, args) => (<ChildWindow>d).OnIsOpenChanged(args.OldValue, args.NewValue));
        IsOpen: boolean;
        private OnIsOpenChanged(oldValue: boolean, newValue: boolean) {
            if (oldValue !== newValue) {
                if (newValue === true) {
                    this.Visibility = Fayde.Visibility.Visible;
                    if (this.IsModal) {
                        if (this._ModalMask == null) {
                            this.AddMask();
                        }
                        this._ModalMask.Visibility = Fayde.Visibility.Visible;
                    }
                } else {
                    this.Visibility = Fayde.Visibility.Collapsed;
                    if (this.IsModal) {
                        this._ModalMask.Visibility = Fayde.Visibility.Collapsed;
                    }
                }
            }
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {

            if (this.IsModal) {
                this.ShowMaximizeButton = false;
                this.ShowMinimizeButton = false;
            } else if(this.CanResize) {
                this.ShowMaximizeButton = true;
                this.ShowMinimizeButton = true;
            }
            this._CloseButton = <Fayde.Controls.Button>this.GetTemplateChild("CloseButton", Fayde.Controls.Button);
            if (this._CloseButton !== null) {
                this._CloseButton.Click.Subscribe(this._OnClose, this);
            }
            this._MinimizeButton = <Fayde.Controls.Button>this.GetTemplateChild("MinimizeButton", Fayde.Controls.Button);
            if (this._MinimizeButton !== null) {
                if (this.ShowMinimizeButton) {
                    this._MinimizeButton.Click.Subscribe(this._OnMinimize, this);
                } else {
                    this._MinimizeButton.Visibility = Fayde.Visibility.Collapsed;
                }
            }
            this._MaximizeButton = <Fayde.Controls.Primitives.ToggleButton>this.GetTemplateChild("MaximizeButton", Fayde.Controls.Primitives.ToggleButton);
            if (this._MaximizeButton !== null) {
                if (this.ShowMaximizeButton) {
                    this._MaximizeButton.Click.Subscribe(this._OnMaximize, this);
                } else {
                    this._MaximizeButton.Visibility = Fayde.Visibility.Collapsed;
                }
            }
             
            this._ContentContainer = <Fayde.Controls.Panel>this.GetTemplateChild("ContentContainer", Fayde.Controls.Panel);
            if (this._ContentContainer !== null) {
                this._ContentContainer.MouseLeftButtonDown.Subscribe((sender: any, e: Fayde.Input.MouseButtonEventArgs) => { e.Handled = true; }, this);
            }
            if (this.IsModal && this.IsOpen) {
                this.AddMask();
            }
            super.OnApplyTemplate();
        }

        private _OnClose(sender, e) {
            this.IsOpen = false;
        }

        private _OnDone(sender, e) {
            this.IsOpen = false;
        }

        private _OnMinimize(sender, e) {
            this.Visibility = Fayde.Visibility.Collapsed;
        }

        private _OnMaximize(sender, e) {
            var b = <Fayde.Controls.Primitives.ToggleButton>sender;
            if (b.IsChecked === true) {
                this._size0 = new size();
                this._size0.Width = this.ActualWidth;
                this._size0.Height = this.ActualHeight;
                this._p0 = new Point(this.OffsetX, this.OffsetY);
                this.OffsetX = 0;
                this.OffsetY = 0;
                var p = <Fayde.Controls.Panel>this.VisualParent;
                this.Width = p.ActualWidth;
                this.Height = p.ActualHeight;
                this.Margin = new Thickness(0);
                //if (Maximized != null)
                //    Maximized(this, null);
            } else {
                this.Restore();
            }
        }

        Open() {
            this.IsOpen = true;
        }
        Close() {
            this.IsOpen = false;
        }

        Restore() {
            if (this._size0 != null) {
                this.Width = this._size0.Width;
                this.Height = this._size0.Height;
            }
            if (this._p0 != null) {
                this.OffsetX = this._p0.X;
                this.OffsetY = this._p0.Y;
            }
        }

        private AddMask() {
            var p = <Fayde.Controls.Panel>this.VisualParent;
            if (p == null) {
                this._ModalMask = <Fayde.Shapes.Rectangle>this.GetChildControl("ModelMask", Fayde.Shapes.Rectangle);
            } else {
                this._ModalMask = <Fayde.Shapes.Rectangle>this.GetChildControl("ModelMask", Fayde.Shapes.Rectangle, p);
            }
            this._ModalMask.VerticalAlignment = Fayde.VerticalAlignment.Stretch;
            this._ModalMask.HorizontalAlignment = Fayde.HorizontalAlignment.Stretch;
            this._ModalMask.Fill = new Fayde.Media.SolidColorBrush(Color.KnownColors.DimGray);
            this._ModalMask.Opacity = 0.4;
            this._ModalMask.SetValue(Fayde.Controls.Canvas.ZIndexProperty, ChildWindow.MaxZIndex);
            ChildWindow.MaxZIndex++;
            this.SetValue(Fayde.Controls.Canvas.ZIndexProperty, ChildWindow.MaxZIndex);
            ChildWindow.MaxZIndex++;
        }

        
        private GetChildControl(childName: string, type?: Function, parent?: Fayde.Controls.Panel) : Fayde.DependencyObject {
            if (parent == null) {
                parent = <Fayde.Controls.Panel>Fayde.Application.Current.RootVisual;
            }
            if (parent != null) {
                var xamlObject = parent.Children.FindName(name);
                if (xamlObject != null) {
                    var xobj = xamlObject.XamlNode.XObject;
                    if (!type || (xobj instanceof type)) {
                        return <Fayde.DependencyObject>xobj;
                    }
                }
                var control = new type.prototype.constructor();
                parent.Children.Add(<Fayde.UIElement>control);
                return control;
            } else {
                throw new Exception("LayoutRoot Panel in the MainWindow is missing. Make sure to name the Root Panel in the MainWindow as LayoutRoot.");
            }
        }
    }
    //TemplateParts(ChildWindow,
    //    { Name: "HorizontalTemplate", Type: FrameworkElement },
    //    { Name: "VerticalTemplate", Type: FrameworkElement });

    export class WrapPanel extends Fayde.Controls.Panel {
         
        static OrientationProperty = DependencyProperty.
            Register("Orientation", () => Fayde.Orientation, WrapPanel, Fayde.Orientation.Horizontal, (d, args) => (<WrapPanel>d).OnOrientationChanged(args.OldValue, args.NewValue));
        Orientation: Fayde.Orientation;
        private OnOrientationChanged(oldVal: Fayde.Orientation, newVal: Fayde.Orientation) {
            if (oldVal !== newVal) {
                this.InvalidateMeasure();
            }
        }

        static ItemWidthProperty = DependencyProperty.
            Register("ItemWidth", () => Number, WrapPanel, undefined, (d, args) => (<WrapPanel>d).OnItemWidthChanged(args.OldValue, args.NewValue));
        ItemWidth: number;
        private OnItemWidthChanged(oldVal: number, newVal: number) {
            if (oldVal !== newVal) {
                this.InvalidateMeasure();
            }
        }

        static ItemHeightProperty = DependencyProperty.
            Register("ItemHeight", () => Number, WrapPanel, undefined, (d, args) => (<WrapPanel>d).OnItemHeightChanged(args.OldValue, args.NewValue));
        ItemHeight: number;
        private OnItemHeightChanged(oldVal: number, newVal: number) {
            if (oldVal !== newVal) {
                this.InvalidateMeasure();
            }
        }

        ArrangeOverride(finalSize : size) : size {
            var orientation = this.Orientation;
            
            var size = new OrientedSize(orientation);

            var size2 = new OrientedSize(orientation, finalSize.Width, finalSize.Height);
            var itemWidth = this.ItemWidth;
            var itemHeight = this.ItemHeight;
            var flag = !isNaN(itemWidth);
            var flag2 = !isNaN(itemHeight);

            var indirectOffset = 0.0;

            var directDelta = (orientation === Fayde.Orientation.Horizontal) ? (flag ? itemWidth : null) : (flag2 ? itemHeight : null);
            var children = this.Children;
            var count = children.Count;
            var lineStart = 0;
            for (var i = 0; i < count; i++) {
                var element = children[i];
                var size3 = new OrientedSize(orientation, flag ? itemWidth : element.DesiredSize.Width, flag2 ? itemHeight : element.DesiredSize.Height);
            
                if (NumberEx.IsGreaterThanClose(size.Direct + size3.Direct, size2.Direct)) {
                    this.ArrangeLine(lineStart, i, directDelta, indirectOffset, size.Indirect);
                    indirectOffset += size.Indirect;
                    size = size3;
                    if (NumberEx.IsGreaterThanClose(size3.Direct, size2.Direct)) {
                        this.ArrangeLine(i, ++i, directDelta, indirectOffset, size3.Indirect);
                        indirectOffset += size.Indirect;
                        size = new OrientedSize(orientation);
                    }
                    lineStart = i;
                } else {
                    size.Direct += size3.Direct;
                    size.Indirect = Math.max(size.Indirect, size3.Indirect);
                }
            }
            if (lineStart < count) {
                this.ArrangeLine(lineStart, count, directDelta, indirectOffset, size.Indirect);
            }
            return finalSize;
        }

        MeasureOverride(constraint : size) : size {
            var orientation = this.Orientation;
            var size1 = new OrientedSize(orientation);
            var size2 = new OrientedSize(orientation);
            var size3 = new OrientedSize(orientation, constraint.Width, constraint.Height);

            var itemWidth = this.ItemWidth;
            var itemHeight = this.ItemHeight;

            var flag = !isNaN(itemWidth);

            var flag2 = !isNaN(itemHeight);

            var availableSize = size.fromRaw(flag ? itemWidth : constraint.Width, flag2 ? itemHeight : constraint.Height);

            for(var element in this.Children) {
                element.Measure(availableSize);
                var size5 = new OrientedSize(orientation, flag ? itemWidth : element.DesiredSize.Width, flag2 ? itemHeight : element.DesiredSize.Height);
                if (NumberEx.IsGreaterThanClose(size1.Direct + size5.Direct, size3.Direct)) {
                    size2.Direct = Math.max(size1.Direct, size2.Direct);
                    size2.Indirect += size1.Indirect;
                    size1 = size5;
                    if (NumberEx.IsGreaterThanClose(size5.Direct, size3.Direct)) {
                        size2.Direct = Math.max(size5.Direct, size2.Direct);
                        size2.Indirect += size5.Indirect;
                        size1 = new OrientedSize(orientation);
                    }
                } else {
                    size1.Direct += size5.Direct;
                    size1.Indirect = Math.max(size1.Indirect, size5.Indirect);
                }
            }
            size2.Direct = Math.max(size1.Direct, size2.Direct);
            size2.Indirect += size1.Indirect;
          
            return size.fromRaw(size2.Width, size2.Height);
        }

        private ArrangeLine(lineStart: number, lineEnd : number, directDelta : number, indirectOffset : number, indirectGrowth : number) {
            var x = 0.0;
            var orientation = this.Orientation;
            var flag = orientation === Fayde.Orientation.Horizontal;
            var children = this.Children;
            for (var i = lineStart; i < lineEnd; i++) {
                var element = children[i];
                var size1 = new OrientedSize(orientation, element.DesiredSize.Width, element.DesiredSize.Height);
                var width = directDelta != null ? directDelta : size1.Direct;
                var finalRect = flag ? rect.call(x, indirectOffset, width, indirectGrowth) : rect.call(indirectOffset, x, indirectGrowth, width);
                element.Arrange(finalRect);
                x += width;
            }
        }
    }
}
