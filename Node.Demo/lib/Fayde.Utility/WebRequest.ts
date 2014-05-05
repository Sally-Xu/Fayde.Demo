class WebRequest {
    static SendAsync(url: string, method: string, data?: any, timeout?: number): IAsyncRequest<string> {
        var req = new XMLHttpRequest();
        req.open(method, url);
        var d = defer();
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    d.resolve(req.responseText);
                } else {
                    d.reject("HTTP " + req.status);
                }
            }
        };
        if (data != null) {
            var cache = [];
            var sdata = JSON.stringify(data, function (key, value) {
                if ((typeof value === 'object' || typeof value === 'function') && value !== null) {
                    if (cache.indexOf(key) !== -1) {
                        // Circular reference found, discard key
                        return;
                    }
                    // Store value in our collection
                    cache.push(key);
                }
                return value;
            });
            cache = null; 
            req.send(sdata);
        }
        else
            req.send();
        return d.request;
    }
}
export = WebRequest;   