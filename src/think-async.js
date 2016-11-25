export class Async {
    constructor() {
        this.scripts = {};
    }
    add(id, url, callback) {

        let async = this,
            asyncId = id+'-js',
            doc = document;


        // If script is present on the page, there is nothing to do here.
        if (doc.getElementById(asyncId)) { async.scripts[id].loaded = true; return; }

        async.scripts[asyncId] = {
                "url": url,
                "id": id,
                "callback": callback,
                "loaded": false,
                "triggered": false
        };

        let fjs = doc.getElementsByTagName('script')[0],
            js = doc.createElement('script');

        js.src = url;
        js.async = "async";
        id && (js.id = asyncId);

        console.log(js);

        // Do callback, using underscore function check

        js.addEventListener('load', function() {
            async.scripts[asyncId].loaded = true;
            if(!!(callback && callback.constructor && callback.call && callback.apply)) {
                async.scripts[asyncId].triggered = true;
                callback(js, [asyncId]);
            }
        });

        fjs.parentNode.insertBefore(js, fjs);

    };

}