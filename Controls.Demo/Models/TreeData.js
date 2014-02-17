var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var TreeData = (function (_super) {
        __extends(TreeData, _super);
        function TreeData(Header, Url, imagePath, Index) {
            _super.call(this);
            this.Header = Header;
            this.Url = Url;
            this.imagePath = imagePath;
            this.Index = Index;
            this.Children = new Fayde.Collections.ObservableCollection();
        }
        return TreeData;
    })(Fayde.MVVM.ObservableObject);
    
    return TreeData;
});
//# sourceMappingURL=TreeData.js.map
