class Async {
    constructor(id) {
        this.id = id;
    }
    add(url, callback) {

        let doc = document,
            id = this.id;
        // underscore function check

        if (doc.getElementById(this.id)) {return;}

        let fjs = doc.getElementsByTagName('script')[0],
            js = doc.createElement('script');

        js.src = url;
        js.async = "async";
        id && (js.id = id);

        // Do callback, using underscore function check
        if(!!(callback && callback.constructor && callback.call && callback.apply)) {
            try {
                js.addEventListener('load', function() {
                    callback(js,[id]);
                });
            }
            catch(err) {
                console.log(err.message);
            }
        }

        fjs.parentNode.insertBefore(js, fjs);
    };

}