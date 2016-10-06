'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Async = function () {
    function Async(id) {
        _classCallCheck(this, Async);

        this.id = id;
    }

    _createClass(Async, [{
        key: 'add',
        value: function add(url, callback) {

            var doc = document,
                id = this.id;
            // underscore function check

            if (doc.getElementById(this.id)) {
                return;
            }

            var fjs = doc.getElementsByTagName('script')[0],
                js = doc.createElement('script');

            js.src = url;
            js.async = true;
            id && (js.id = id);

            // Do callback, using underscore function check
            if (!!(callback && callback.constructor && callback.call && callback.apply)) {
                try {
                    js.addEventListener('load', function () {
                        callback(js, [id]);
                    });
                } catch (err) {
                    console.log(err.message);
                }
            }

            fjs.parentNode.insertBefore(js, fjs);
        }
    }]);

    return Async;
}();
