'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LPPEncoder = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LPPEncoder = exports.LPPEncoder = function () {
    function LPPEncoder() {
        _classCallCheck(this, LPPEncoder);

        this.maxsize = 19; // 13
        this.buffer = Buffer.alloc(this.maxsize);
        this.cursor = 0;
    }

    // reset payload


    _createClass(LPPEncoder, [{
        key: 'reset',
        value: function reset() {
            this.buffer = Buffer.alloc(this.maxsize);
            this.cursor = 0;
        }

        // Helper function

    }, {
        key: 'validate',
        value: function validate(channel, value) {
            if (channel > 99) {
                throw new Error('Channels above 100 are reserved.');
            }
        }

        // Helper function

    }, {
        key: 'addByType',
        value: function addByType(_type, channel, values) {
            if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) != 'object') values = [values];

            this.validate(channel, values[0]); // value doesnt matter here
            var type = _common2.default[_type];

            if (this.cursor + type.SIZE + 2 > this.maxsize) {
                return 0;
            }

            this.buffer.writeUInt8(channel, this.cursor++);
            this.buffer[this.cursor++] = type.ID;
            for (var i = 0; i < values.length; i++) {
                var opt = type.OPTS[i];
                var value = values[i];
                value *= opt[1]; // MULT
                if (opt.length > 2) value = (0, _lodash.floor)(value, opt[2]); // PREC
                value = (0, _utils.toBytes)(value, opt[0]);
                for (var j = 0; j < value.length; j++) {
                    this.buffer[this.cursor++] = value[j];
                }
            }

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
            return this.addByType("DIGITAL_INPUT", channel, value);
        }

        /**
        @description Creates a payload with type LPP_DIGITAL_OUTPUT.
        type = DataTypes.TYPE.DIGITAL_SENSOR
        unit = DataTypes.UNIT.DIGITAL
        @param {int} channel The channel for this sensor.
        @param {int} value The value, unsigned int8, should be 0 or 1.
        */

    }, {
        key: 'addDigitalOutput',
        value: function addDigitalOutput(channel, value) {
            return this.addByType("DIGITAL_OUTPUT", channel, value);
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
            return this.addByType("ANALOG_INPUT", channel, value);
        }

        /**
        @description Creates a payload with type LPP_ANALOG_OUTPUT.
        type = DataTypes.TYPE.ANALOG_SENSOR
        unit = DataTypes.UNIT.ANALOG
        @param {int} channel The channel for this sensor.
        @param {float} value A floating point number accurate to two decimal place. lodash.floor(value, 2)
        */

    }, {
        key: 'addAnalogOutput',
        value: function addAnalogOutput(channel, value) {
            return this.addByType("ANALOG_OUTPUT", channel, value);
        }

        // float

    }, {
        key: 'addGenericSensor',
        value: function addGenericSensor(channel, value) {
            return this.addByType("GENERIC_SENSOR", channel, value);
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
            return this.addByType("LUMINOSITY", channel, value);
        }

        /**
        @description Creates a payload with type LPP_PRESENCE.
        type = DataTypes.TYPE.PRESENCE
        unit = DataTypes.UNIT.BOOL
        @param {int} channel The channel for this sensor.
        @param {int|bool} value An 1 or 0
        */

    }, {
        key: 'addPresence',
        value: function addPresence(channel, value) {
            return this.addByType("PRESENCE", channel, value);
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
            return this.addByType("TEMPERATURE", channel, value);
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
            return this.addByType("RELATIVE_HUMIDITY", channel, value);
        }

        /**
        @description Creates a payload with type LPP_ACCELEROMETER.
        type = DataTypes.TYPE.
        unit = DataTypes.UNIT.FLOAT
        @param {int} channel The channel for this sensor.
        @param {float} x X Movement
        @param {float} y Y Movement
        @param {float} z Z Movement
        */

    }, {
        key: 'addAccelerometer',
        value: function addAccelerometer(channel, x, y, z) {
            return this.addByType("ACCELEROMETER", channel, [x, y, z]);
        }

        /**
        @description Creates a payload with type LPP_HUMIDITY.
        type = DataTypes.TYPE.RELATIVE_HUMIDITY
        unit = DataTypes.UNIT.PERCENT
        @param {int} channel The channel for this sensor.
        @param {float} value A floating point number (%) accurate to one decimal place in 0.5 increments. Math.floor10(value, -1)
        */

    }, {
        key: 'addBarometricPressure',
        value: function addBarometricPressure(channel, value) {
            return this.addByType("BAROMETRIC_PRESSURE", channel, value);
        }

        // float

    }, {
        key: 'addVoltage',
        value: function addVoltage(channel, value) {
            return this.addByType("VOLTAGE", channel, value);
        }

        // float

    }, {
        key: 'addCurrent',
        value: function addCurrent(channel, value) {
            return this.addByType("CURRENT", channel, value);
        }

        // uint32_t

    }, {
        key: 'addFrequency',
        value: function addFrequency(channel, value) {
            return this.addByType("FREQUENCY", channel, value);
        }

        // uint32_t

    }, {
        key: 'addPercentage',
        value: function addPercentage(channel, value) {
            return this.addByType("PERCENTAGE", channel, value);
        }

        // float

    }, {
        key: 'addAltitude',
        value: function addAltitude(channel, value) {
            return this.addByType("ALTITUDE", channel, value);
        }

        // uint32_t

    }, {
        key: 'addConcentration',
        value: function addConcentration(channel, value) {
            return this.addByType("CONCENTRATION", channel, value);
        }

        // uint32_t

    }, {
        key: 'addPower',
        value: function addPower(channel, value) {
            return this.addByType("POWER", channel, value);
        }

        // float

    }, {
        key: 'addDistance',
        value: function addDistance(channel, value) {
            return this.addByType("DISTANCE", channel, value);
        }

        // float

    }, {
        key: 'addEnergy',
        value: function addEnergy(channel, value) {
            return this.addByType("ENERGY", channel, value);
        }

        // float

    }, {
        key: 'addDirection',
        value: function addDirection(channel, value) {
            return this.addByType("DIRECTION", channel, value);
        }

        /**
        @description Creates a payload with type LPP_UNIX_TIME.
        type = DataTypes.TYPE.UNIX_TIME
        unit = DataTypes.UNIT.INT
        @param {int} channel The channel for this sensor.
        @param {int} value Unix timestamp
        */

    }, {
        key: 'addUnixTime',
        value: function addUnixTime(channel, value) {
            return this.addByType("UNIX_TIME", channel, value);
        }

        /**
        @description Creates a payload with type LPP_GYROMETER.
        type = DataTypes.TYPE.
        unit = DataTypes.UNIT.FLOAT
        @param {int} channel The channel for this sensor.
        @param {float} x X Movement
        @param {float} y Y Movement
        @param {float} z Z Movement
        */

    }, {
        key: 'addGyrometer',
        value: function addGyrometer(channel, x, y, z) {
            return this.addByType("GYROMETER", channel, [x, y, z]);
        }

        /**
        @description Creates a payload with type LPP_COLOUR.
        type = 
        unit = DataTypes.UNIT.INT
        @param {int} channel The channel for this sensor.
        @param {int} r The red
        @param {int} g The green
        @param {int} b The blue
        */

    }, {
        key: 'addColour',
        value: function addColour(channel, r, g, b) {
            return this.addByType("COLOUR", channel, [r, g, b]);
        }

        /**
        @description Creates a payload with type LPP_GPS.
        type = DataTypes.TYPE.LATITUDE, DataTypes.TYPE.LONGITUDE, DataTypes.TYPE.ALTITUDE,
        unit = DataTypes.UNIT.FLOAT
        @param {int} channel The channel for this sensor.
        @param {float} latitude The latitude
        @param {float} longitude The longitude
        @param {float} altitude The altitude
        */

    }, {
        key: 'addGPS',
        value: function addGPS(channel, latitude, longitude, altitude) {
            return this.addByType("GPS", channel, [latitude, longitude, altitude]);
        }
    }, {
        key: 'addSwitch',
        value: function addSwitch(channel, value) {
            return this.addByType("SWITCH", channel, value);
        }
    }, {
        key: 'addPolyline',
        value: function addPolyline(channel, coords) {
            var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
            var simplification = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "DouglasPeucker";

            return 0; // NOT DONE
        }

        // Kinda helper function

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