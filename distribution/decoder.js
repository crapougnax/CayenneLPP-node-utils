'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LPPDecoder = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LPPDecoder = exports.LPPDecoder = function () {
    function LPPDecoder(buffer) {
        _classCallCheck(this, LPPDecoder);

        this.maxsize = 51;

        if (buffer) {
            this.decode(buffer);
        }
    }

    _createClass(LPPDecoder, [{
        key: 'prepare',
        value: function prepare() {
            this.cursor = 0;
            this.channels = {};
            this.current = null; // current channel
        }

        /**
         * Try to decode a Cayenne LPP payload in buffer
         */

    }, {
        key: 'decode',
        value: function decode(buffer) {
            var _this = this;

            if (buffer) {
                this.buffer = buffer;
            }
            this.prepare();
            while (this.cursor < this.buffer.length) {
                if (this.current !== null) {
                    // channel part is defined
                    var m = void 0;
                    if ((m = Object.entries(_common2.default).find(function (_ref) {
                        var _ref2 = _slicedToArray(_ref, 2),
                            n = _ref2[0],
                            a = _ref2[1];

                        return a.ID == _this.buffer[_this.cursor];
                    })) !== null) {
                        var opts = [];
                        for (var i = 0; i < m[1].OPTS.length; i++) {
                            opts.push((0, _utils.fromBytes)(this.buffer.slice(this.cursor + 1, this.cursor + 1 + m[1].OPTS[i][0])) / m[1].OPTS[i][1]);
                            this.cursor += m[1].OPTS[i][0];
                        }
                        this.channels[this.current][m[0].toLowerCase()] = opts.length == 1 ? opts[0] : opts;
                    } else {
                        console.log("Unsupported data type: " + this.buffer[this.cursor]);
                    }
                    this.cursor++;
                    this.current = null;
                } else {
                    // new channel detection
                    this.current = this.buffer[this.cursor++];
                    // create the channel if not already declared
                    if (!this.channels[this.current]) {
                        this.channels[this.current] = {};
                        //    console.log(`Declared channel #${this.current}`)
                    }
                }
            }
        }

        /**
         * Return all parsed channels
         * @return object
         */

    }, {
        key: 'getChannels',
        value: function getChannels() {
            return this.channels;
        }

        /**
         * Return the given channel data or false if it doesn't exist
         * @param {integer} key
         * @returns object|boolean
         */

    }, {
        key: 'getChannel',
        value: function getChannel(key) {
            return this.channels[key] || false;
        }
    }, {
        key: 'getChannelData',
        value: function getChannelData(key, data) {
            return this.channels[key][data] != undefined ? this.channels[key][data] : null;
        }
    }]);

    return LPPDecoder;
}();