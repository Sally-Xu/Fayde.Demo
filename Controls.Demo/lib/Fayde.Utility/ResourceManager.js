/// <reference path="../fayde/fayde.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Utility) {
        var Dictionary = (function (_super) {
            __extends(Dictionary, _super);
            function Dictionary() {
                _super.apply(this, arguments);
            }
            Dictionary.Load = function (doc) {
                return new Fayde.Collections.ObservableCollection();
            };
            return Dictionary;
        })(Fayde.Collections.ObservableCollection);
        Utility.Dictionary = Dictionary;
        Fayde.RegisterType(Dictionary, "Fayde.Utility", Fayde.XMLNS);

        var ResourceManager = (function () {
            function ResourceManager() {
            }
            ResourceManager.GetAsync = function (url) {
                var d = defer();
                Fayde.Xaml.XamlDocument.GetAsync(url).success(function (xd) {
                    TimelineProfile.Parse(true, "Dictionary");

                    //var dict = Dictionary.Load(xd.Document);
                    TimelineProfile.Parse(false, "Dictionary");
                    //if (!(dict instanceof Dictionary))
                    //    d.reject("Xaml must be a Dictionary.");
                    //else
                    //    d.resolve(dict);
                }).error(d.reject);
                return d.request;
            };
            return ResourceManager;
        })();
        Utility.ResourceManager = ResourceManager;

        Fayde.RegisterType(ResourceManager, "Fayde.Utility", Fayde.XMLNS);
    })(Fayde.Utility || (Fayde.Utility = {}));
    var Utility = Fayde.Utility;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=ResourceManager.js.map
