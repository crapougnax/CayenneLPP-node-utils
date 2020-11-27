'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LPPEncoder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _common = require('./common');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LPPEncoder = exports.LPPEncoder = function () {
    function LPPEncoder() {
        _classCallCheck(this, LPPEncoder);

        // Data ID + Data Type + Data Size
        this.LPP_DIGITAL_INPUT_SIZE = 3; // 1 byte
        this.LPP_DIGITAL_OUTPUT_SIZE = 3; // 1 byte
        this.LPP_ANALOG_OUTPUT_SIZE = 4; // 2 bytes, 0.01 signed
        this.LPP_LUMINOSITY_SIZE = 4; // 2 bytes, 1 lux unsigned
        this.LPP_PRESENCE_SIZE = 3; // 1 byte, 1
        this.LPP_TEMPERATURE_SIZE = 4; // 2 bytes, 0.1°C signed
        this.LPP_RELATIVE_HUMIDITY_SIZE = 3; // 1 byte, 0.5% unsigned
        this.LPP_ACCELEROMETER_SIZE = 8; // 2 bytes per axis, 0.001G
        this.LPP_ANALOG_INPUT_SIZE = 4; // 2 bytes, 0.01 signed
        this.LPP_BAROMETRIC_PRESSURE_SIZE = 4; // 2 bytes 0.1 hPa Unsigned
        this.LPP_GYROMETER_SIZE = 8; // 2 bytes per axis, 0.01 °/s
        this.LPP_GPS_SIZE = 11; // 3 byte lon/lat 0.0001 °, 3 bytes alt 0.01 meter

        this.maxsize = 13;
        this.buffer = Buffer.alloc(this.maxsize);
        this.cursor = 0;
    }

    _createClass(LPPEncoder, [{
        key: 'validate',
        value: function validate(channel, value) {
            if (channel > 99) {
                throw new Error('Channels above 100 are reserved.');
            }
        }

        /**
        @description Creates a payload with type LPP_ANALOG_INPUT.
        type = DataTypes.TYPE.ANALOG_SENSOR
        unit = DataTypes.UNIT.ANALOG
        @param {int} channel The channel for this sensor.
        @param {float} value A floating point number accurate to two decimal place. lodash.floor(value, 2)
        */

    }, {
        key: 'addAnalogInput',
        value: function addAnalogInput(channel, value) {

            this.validate(channel, value);

            if (this.cursor + this.LPP_ANALOG_INPUT_SIZE > this.maxsize) {
                return 0;
            }

            var floorVal = (0, _lodash.floor)(value, 2) * 100;

            this.buffer.writeUInt8(channel, this.cursor++);
            this.buffer[this.cursor++] = _common.ANALOG_INPUT;
            this.buffer.writeInt16BE(floorVal, this.cursor);
            this.cursor += 2;

            return this.cursor;
        }

        /**
        @description Creates a payload with type LPP_DIGITAL_INPUT.
        type = DataTypes.TYPE.DIGITAL_SENSOR
        unit = DataTypes.UNIT.DIGITAL
        @param {int} channel The channel for this sensor.
        @param {int} value The value, unsigned int8, should be 0 or 1.
        */

    }, {
        key: 'addDigitalInput',
        value: function addDigitalInput(channel, value) {

            this.validate(channel, value);

            if (this.cursor + this.LPP_DIGITAL_INPUT_SIZE > this.maxsize) {
                return 0;
            }

            this.buffer.writeUInt8(channel, this.cursor++);
            this.buffer[this.cursor++] = _common.DIGITAL_INPUT;
            this.buffer.writeUInt8(value, this.cursor++);

            return this.cursor;
        }

        /**
        @description Creates a payload with type LPP_TEMPERATURE.
        type = DataTypes.TYPE.TEMPERATURE
        unit = DataTypes.UNIT.CELSIUS
        @param {int} channel The channel for this sensor.
        @param {float} value A floating point number accurate to one decimal place. lodash.floor(value, 1)
        */

    }, {
        key: 'addTemperature',
        value: function addTemperature(channel, value) {

            this.validate(channel, value);

            if (this.cursor + this.LPP_TEMPERATURE_SIZE > this.maxsize) {
                return 0;
            }
            var floorVal = (0, _lodash.floor)(value, 1) * 10;

            this.buffer.writeUInt8(channel, this.cursor++);
            this.buffer[this.cursor++] = _common.TEMPERATURE;
            this.buffer.writeInt16BE(floorVal, this.cursor);
            this.cursor += 2;

            return this.cursor;
        }

        /**
        @description Creates a payload with type LPP_LUMINOSITY.
        type = DataTypes.TYPE.LUMINOSITY
        unit = DataTypes.UNIT.LUX
        @param {int} channel The channel for this sensor.
        @param {float} value An unsigned int16 value. 0-65535.
        */

    }, {
        key: 'addLuminosity',
        value: function addLuminosity(channel, value) {

            this.validate(channel, value);

            if (this.cursor + this.LPP_LUMINOSITY_SIZE > this.maxsize) {
                return 0;
            }
            this.buffer.writeUInt8(channel, this.cursor++);
            this.buffer[this.cursor++] = _common.LUMINOSITY;
            this.buffer.writeUInt16BE(value, this.cursor);
            this.cursor += 2;

            return this.cursor;
        }

        /**
        @description Creates a payload with type LPP_HUMIDITY.
        type = DataTypes.TYPE.RELATIVE_HUMIDITY
        unit = DataTypes.UNIT.PERCENT
        @param {int} channel The channel for this sensor.
        @param {float} value A floating point number (%) accurate to one decimal place in 0.5 increments. Math.floor10(value, -1)
        */

    }, {
        key: 'addRelativeHumidity',
        value: function addRelativeHumidity(channel, value) {

            this.validate(channel, value);

            if (this.cursor + this.LPP_RELATIVE_HUMIDITY_SIZE > this.maxsize) {
                return 0;
            }
            //Multiply by 2 because codec resolution is set to 0.5 and precision 1
            var floorVal = (0, _lodash.floor)(value * 2);

            this.buffer.writeUInt8(channel, this.cursor++);
            this.buffer[this.cursor++] = _common.HUMIDITY;
            this.buffer.writeUInt8(floorVal, this.cursor++);

            return this.cursor;
        }
    }, {
        key: 'getPayload',
        value: function getPayload() {
            var buff = this.buffer.slice(0, this.cursor);
            return buff;
        }
    }]);

    return LPPEncoder;
}();

exports.default = LPPEncoder;