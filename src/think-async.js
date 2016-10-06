class Async {
    constructor() {
        this.scripts = {};
    }
    add(id, url, callback) {

        let async = this,
            doc = document;

        // If script is present on the page, there is nothing to do here.
        if (doc.getElementById(id)) { async.scripts[id].loaded = true; return; }

        async.scripts[id] = {
                "url": url,
                "callback": callback,
                "loaded": false,
                "triggered": false
        };

        let fjs = doc.getElementsByTagName('script')[0],
            js = doc.createElement('script');

        js.src = url;
        js.async = "async";
        id && (js.id = id);

        // Do callback, using underscore function check

        js.addEventListener('load', function() {
            async.scripts[id].loaded = true;
            if(!!(callback && callback.constructor && callback.call && callback.apply)) {
                async.scripts[id].triggered = true;
                callback(js, [id]);
            }
        });


        fjs.parentNode.insertBefore(js, fjs);
    };

}