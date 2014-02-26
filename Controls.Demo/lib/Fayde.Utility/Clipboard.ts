/// <reference path="../fayde/fayde.d.ts" />
module Fayde.Utility {
    export class Clipboard {
        static SetText(data: string): void {
            var didSucceed = window.clipboardData.setData('Text', data);
        }
        static GetText(): string {
            var clipText = window.clipboardData.getData('Text');
            return clipText;
        }
    }
    Fayde.RegisterType(Clipboard, "Fayde.Utility", Fayde.XMLNS);
} 