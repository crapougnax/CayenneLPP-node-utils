'use strict';

var _utils = require('./utils');

var LPP_TYPE = {};

//					(0xID, SIZE, OPTS: [bytes, MULT, prec]])
/* LPP_TYPE = IPSO_OBJECT_ID - 3200 */
LPP_TYPE.DIGITAL_INPUT = new _utils.Type(0x00, 1, [[1, 1]]); // 1 byte
LPP_TYPE.DIGITAL_OUTPUT = new _utils.Type(0x01, 1, [[1, 1]]); // 1 byte
LPP_TYPE.ANALOG_INPUT = new _utils.Type(0x02, 2, [[2, 100, 2]]); // 2 bytes, 0.01 signed
LPP_TYPE.ANALOG_OUTPUT = new _utils.Type(0x03, 2, [[2, 100, 2]]); // 2 bytes, 0.01 signed
LPP_TYPE.GENERIC_SENSOR = new _utils.Type(0x64, 4, [[4, 1]]); // 4 bytes, unsigned
LPP_TYPE.LUMINOSITY = new _utils.Type(0x65, 2, [[2, 1]]); // 2 bytes, 1 lux unsigned
LPP_TYPE.PRESENCE = new _utils.Type(0x66, 1, [[1, 1]]); // 1 byte, bool
LPP_TYPE.TEMPERATURE = new _utils.Type(0x67, 2, [[2, 10, 1]]); // 2 bytes, 0.1°C signed
LPP_TYPE.RELATIVE_HUMIDITY = new _utils.Type(0x68, 1, [[1, 2, 0]]); // 1 byte, 0.5% unsigned
LPP_TYPE.ACCELEROMETER = new _utils.Type(0x71, 6, [[3, 1000, 0], [3, 1000, 0], [3, 1000, 0]]); // 2 bytes per axis, 0.001G
LPP_TYPE.BAROMETRIC_PRESSURE = new _utils.Type(0x73, 2, [[2, 10]]); // 2 bytes 0.1hPa unsigned
LPP_TYPE.VOLTAGE = new _utils.Type(0x74, 2, [[2, 100]]); // 2 bytes 0.01V unsigned
LPP_TYPE.CURRENT = new _utils.Type(0x75, 2, [[2, 1000]]); // 2 bytes 0.001A unsigned
LPP_TYPE.FREQUENCY = new _utils.Type(0x76, 4, [[4, 1]]); // 4 bytes 1Hz unsigned
LPP_TYPE.PERCENTAGE = new _utils.Type(0x78, 1, [[1, 1]]); // 1 byte 1-100% unsigned
LPP_TYPE.ALTITUDE = new _utils.Type(0x79, 2, [[2, 1]]); // 2 byte 1m signed
LPP_TYPE.CONCENTRATION = new _utils.Type(0x7d, 2, [[2, 1]]); // 2 bytes, 1 ppm unsigned
LPP_TYPE.POWER = new _utils.Type(0x80, 2, [[2, 1]]); // 2 byte, 1W, unsigned
LPP_TYPE.DISTANCE = new _utils.Type(0x82, 4, [[4, 1000]]); // 4 byte, 0.001m, unsigned
LPP_TYPE.ENERGY = new _utils.Type(0x83, 4, [[4, 1000]]); // 4 byte, 0.001kWh, unsigned
LPP_TYPE.DIRECTION = new _utils.Type(0x84, 2, [[2, 1]]); // 2 bytes, 1deg, unsigned
LPP_TYPE.UNIXTIME = new _utils.Type(0x85, 4, [[4, 1]]); // 4 bytes, unsigned
LPP_TYPE.GYROMETER = new _utils.Type(0x86, 6, [[6, 100]]); // 2 bytes per axis, 0.01 °/s
LPP_TYPE.COLOUR = new _utils.Type(0x87, 3, [[1, 1], [1, 1], [1, 1]]); // 1 byte per RGB Color
LPP_TYPE.GPS = new _utils.Type(0x88, 9, [[3, 10000, 0], [3, 10000, 0], [3, 100, 0]]); // 3 byte lon/lat 0.0001 °, 3 bytes alt 0.01 meter
LPP_TYPE.SWITCH = new _utils.Type(0x8e, 1, [[1, 1]]); // 1 byte, 0/1
LPP_TYPE.POLYLINE = new _utils.Type(0xc8, 8, [[1, 1], [1, 1], [3, 10000, 0], [3, 10000, 0], [2, 1]]); // 1 byte size, 1 byte delta factor, 3 byte lon/lat 0.0001° * factor, n (size-8) bytes deltas

module.exports = LPP_TYPE;