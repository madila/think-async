class ThinkAsync {
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

        let js = doc.createElement('script');

        js.src = url;
        js.async = "async";
        id && (js.id = asyncId);

        // Do callback, using underscore function check

        js.addEventListener('load', function() {
            async.scripts[asyncId].loaded = true;
            if(!!(callback && callback.constructor && callback.call && callback.apply)) {
                async.scripts[asyncId].triggered = true;
                callback(js, [asyncId]);
            }
        });

        document.getElementsByTagName('head')[0].appendChild(js);

    };

}

let Async = new ThinkAsync();