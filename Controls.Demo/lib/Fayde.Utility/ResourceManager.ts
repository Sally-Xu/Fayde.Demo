/// <reference path="../fayde/fayde.d.ts" />

module Fayde.Utility {
    export class Dictionary extends Fayde.Collections.ObservableCollection<string> {

        static Load(doc: Xaml.XamlDocument): Dictionary {
            return new Fayde.Collections.ObservableCollection<string>();
        }
    }
    Fayde.RegisterType(Dictionary, "Fayde.Utility", Fayde.XMLNS);

    export class ResourceManager {
        static GetAsync(url: string): IAsyncRequest<Dictionary> {
            var d = defer<Dictionary>();
            Xaml.XamlDocument.GetAsync(url)
                .success(xd => {
                    TimelineProfile.Parse(true, "Dictionary");
                    //var dict = Dictionary.Load(xd.Document);
                    TimelineProfile.Parse(false, "Dictionary");
                    //if (!(dict instanceof Dictionary))
                    //    d.reject("Xaml must be a Dictionary.");
                    //else
                    //    d.resolve(dict);
                })
                .error(d.reject);
            return d.request;                  
        }     
    }		
    
    Fayde.RegisterType(ResourceManager, "Fayde.Utility", Fayde.XMLNS);
} 