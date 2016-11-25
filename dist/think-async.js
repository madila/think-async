"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Async = exports.Async = function () {
        function Async() {
                _classCallCheck(this, Async);

                this.scripts = {};
        }

        _createClass(Async, [{
                key: "add",
                value: function add(id, url, callback) {

                        var async = this,
                            doc = document;

                        // If script is present on the page, there is nothing to do here.
                        if (doc.getElementById(id)) {
                                async.scripts[id].loaded = true;return;
                        }

                        async.scripts[id] = {
                                "url": url,
                                "callback": callback,
                                "loaded": false,
                                "triggered": false
                        };

                        var fjs = doc.getElementsByTagName('script')[0],
                            js = doc.createElement('script');

                        js.src = url;
                        js.async = "async";
                        id && (js.id = id);

                        console.log(js);

                        // Do callback, using underscore function check

                        js.addEventListener('load', function () {
                                async.scripts[id].loaded = true;
                                if (!!(callback && callback.constructor && callback.call && callback.apply)) {
                                        async.scripts[id].triggered = true;
                                        callback(js, [id]);
                                }
                        });

                        fjs.parentNode.insertBefore(js, fjs);
                }
        }]);

        return Async;
}();
//# sourceMappingURL=think-async.js.map