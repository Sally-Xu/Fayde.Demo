var Fayde;
(function (Fayde) {
    (function (Text) {
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
        Text.Clipboard = Clipboard;
        Fayde.RegisterType(Clipboard, "Fayde.Text", Fayde.XMLNS);
    })(Fayde.Text || (Fayde.Text = {}));
    var Text = Fayde.Text;
})(Fayde || (Fayde = {}));
