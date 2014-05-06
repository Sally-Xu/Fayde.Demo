import WebRequest = require("lib/Fayde.Utility/WebRequest");

class Rest {
    private static getJSON(method: string, url: string, data?: any, timeout?: number): IAsyncRequest<any> {
        var d = defer();
        WebRequest.SendAsync(url, method, data, timeout).success(function (res) {
            //alert(res);
            d.resolve(JSON.parse(res));
        }).error(function (err) {
            alert(err);
        });
        return d.request;
    }

    static GetSingleAsync(url: string, data?: any, timeout?: number): IAsyncRequest<any> {
        var d = defer();
        this.getJSON("GET", url, data, timeout).success(function (arry) {
            d.resolve(arry[0]);
        });
        return d.request;
    }

    static GetAsync(url: string, data?: any, timeout?: number): IAsyncRequest<any[]> {
        if(data == null)
            return this.getJSON("GET", url, data, timeout);
        else
            return this.getJSON("POST", url, data, timeout);
    }

    static PostAsync(url: string, data: any, timeout?: number): IAsyncRequest<any>  {
        return this.getJSON("POST", url, data, timeout);
    }
    static PutAsync(url: string, data: any, timeout?: number): IAsyncRequest<any>  {
        return this.getJSON("PUT", url, data, timeout);
    }
    static DeleteAsync(url: string, data: any, timeout?: number): IAsyncRequest<any> {
        return this.getJSON("DELETE", url, data, timeout);
    }
}
export = Rest; 

