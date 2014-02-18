/// <reference path="fayde.d.ts" />

module Fayde.Text {
    export class Clipboard {
        static SetText(data: string) : void {
            var didSucceed = window.clipboardData.setData('Text', data);
        }
        static GetText() : string {
            var clipText = window.clipboardData.getData('Text');
            return clipText;
        }
    }
    Fayde.RegisterType(Clipboard, "Fayde.Text", Fayde.XMLNS);
} 