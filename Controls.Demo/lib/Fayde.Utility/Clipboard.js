var Fayde;
(function (Fayde) {
    /// <reference path="../fayde/fayde.d.ts" />
    (function (Utility) {
        var Clipboard = (function () {
            function Clipboard() {
            }
            Clipboard.SetText = function (data) {
                var didSucceed = window.clipboardData.setData('Text', data);
            };
            Clipboard.GetText = function () {
                var clipText = window.clipboardData.getData('Text');
                return clipText;
            };
            return Clipboard;
        })();
        Utility.Clipboard = Clipboard;
        Fayde.RegisterType(Clipboard, "Fayde.Utility", Fayde.XMLNS);
    })(Fayde.Utility || (Fayde.Utility = {}));
    var Utility = Fayde.Utility;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Clipboard.js.map
