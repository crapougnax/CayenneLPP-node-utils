'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LPPDecoder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./common');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LPPDecoder = exports.LPPDecoder = function () {
    function LPPDecoder(buffer) {
        _classCallCheck(this, LPPDecoder);

        this.maxsize = 51;
        this.buffer = buffer;
        this.cursor = 0;
        this.channels = {};
        this.current = null; // current channel
    }

    /**
     * Try to decode a Cayenne LPP payload in buffer
     */


    _createClass(LPPDecoder, [{
        key: 'decode',
        value: function decode() {
            while (this.cursor < this.buffer.length) {
                if (this.current !== null) {
                    // channel part is defined
                    switch (this.buffer[this.cursor]) {
                        case _common.ANALOG_INPUT:
                            this.channels[this.current]['analog'] = this.getAnalogInput();
                            break;

                        case _common.DIGITAL_INPUT:
                            this.channels[this.current]['digital'] = this.getDigitalInput();
                            break;

                        case _common.TEMPERATURE:
                            this.channels[this.current]['temperature'] = this.getTemperature();
                            break;

                        case _common.LUMINOSITY:
                            this.channels[this.current]['luminosity'] = this.getLuminosity();
                            break;

                        case _common.HUMIDITY:
                            this.channels[this.current]['humidity'] = this.getRelativeHumidity();
                            break;

                        default:
                            console.log("Unsupported data type: " + this.buffer[this.cursor]);
                            break;
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

        /**
         * Return a float value and
         * increment the buffer cursor
         * @return float
         */

    }, {
        key: 'getAnalogInput',
        value: function getAnalogInput() {
            var value = this.buffer.readInt16BE(++this.cursor);
            this.cursor++;

            return value / 100;
        }

        /**
         * Return an integer value
         * @return integer
         */

    }, {
        key: 'getDigitalInput',
        value: function getDigitalInput(channel, value) {
            return this.buffer[++this.cursor];
        }

        /**
         * Return a temperature and
         * increment the buffer cursor
         * @return float
         */

    }, {
        key: 'getTemperature',
        value: function getTemperature() {
            var value = this.buffer.readInt16BE(++this.cursor);
            this.cursor++;

            return value / 10;
        }

        /**
         * Return a luminosity in Lux and
         * increment the buffer cursor
         * @return integer
         */

    }, {
        key: 'getLuminosity',
        value: function getLuminosity() {
            var value = this.buffer.readInt16BE(++this.cursor);
            this.cursor++;

            return value;
        }

        /**
         * Return a relative humidity value in percents and
         * increment the buffer cursor
         * @returns float
         */

    }, {
        key: 'getRelativeHumidity',
        value: function getRelativeHumidity() {
            return this.buffer[++this.cursor] / 2;
        }
    }]);

    return LPPDecoder;
}();

exports.default = LPPDecoder;