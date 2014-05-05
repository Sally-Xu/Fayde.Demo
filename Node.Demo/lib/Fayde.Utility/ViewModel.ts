class ViewModel extends Fayde.MVVM.ViewModelBase {

    Observe(obj: any, p: string) {
        if (typeof (obj) !== "object")
            return;
        var vm = this;
        if (!obj.properties) {
            Object.defineProperty(obj, '__properties__', {
                __proto__: null,
                configurable: false,
                enumerable: false,
                value: {},
                writable: false
            });
        }
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (!obj.__properties__[prop]) obj.__properties__[prop] = {
                    value: null,
                    dependents: {},
                    listeners: []
                };
                if (obj[prop].__dependencies__) {
                    for (var i = 0; i < obj[prop].__dependencies__.length; ++i) {
                        obj.__properties__[obj[prop].__dependencies__[i]].dependents[prop] = true;
                    }
                    delete obj[prop].__dependencies__;
                }
                obj.__properties__[prop].value = obj[prop];
                delete obj[prop];
                (function (prop) {
                    Object.defineProperty(obj, prop, {
                        get: function () {
                            return obj.__properties__[prop].value;
                        },
                        set: function (newValue) {
                            var oldValue = obj.__properties__[prop].value;
                            if (oldValue !== newValue) {
                                obj.OnPropertyChanged(prop);
                                var oldDepValues = {};
                                for (var dep in obj.__properties__[prop].dependents) {
                                    if (obj.__properties__[prop].dependents.hasOwnProperty(dep)) {
                                        oldDepValues[dep] = obj.__properties__[dep].value();
                                    }
                                }
                                obj.__properties__[prop].value = newValue;
                                for (var i = 0; i < obj.__properties__[prop].listeners.length; ++i) {
                                    obj.__properties__[prop].listeners[i](oldValue, newValue);
                                }
                                for (dep in obj.__properties__[prop].dependents) {
                                    if (obj.__properties__[prop].dependents.hasOwnProperty(dep)) {
                                        var newDepValue = obj.__properties__[dep].value();
                                        for (i = 0; i < obj.__properties__[dep].listeners.length; ++i) {
                                            obj.__properties__[dep].listeners[i](oldDepValues[dep], newDepValue);
                                        }
                                    }
                                }
                            }
                        }
                    });
                })(prop);
            }
        }
        obj.OnPropertyChanged = function (propertyName: string) {
            obj.PropertyChanged.RaiseAsync(this, new Fayde.PropertyChangedEventArgs(propertyName));
            vm.PropertyChanged.RaiseAsync(this, new Fayde.PropertyChangedEventArgs(p));
        };
        obj.PropertyChanged = new MulticastEvent<Fayde.PropertyChangedEventArgs>();
    }
}
export = ViewModel;