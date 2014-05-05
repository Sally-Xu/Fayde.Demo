/// <reference path="../lib/fayde/fayde.d.ts" />
class TestData extends Fayde.MVVM.ObservableObject {
    constructor(public Id: string, public Name: string, public Description?: string) {
        super();
    }
}
export = TestData