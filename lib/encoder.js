import { floor } from 'lodash'
import LPP_TYPES from './common'
import { toBytes } from './utils'

export class LPPEncoder {

    constructor() {
        this.maxsize = 19 // 13
        this.buffer = Buffer.alloc(this.maxsize)
        this.cursor = 0
    }

    // reset payload
    reset() {
        this.buffer = Buffer.alloc(this.maxsize)
        this.cursor = 0
    }

    // Helper function
    validate(channel, value) {
        if (channel > 99) {
            throw new Error('Channels above 100 are reserved.')
        }
    }

    // Helper function
    addByType(_type, channel, values) {
        if (typeof(values) != 'object') values = [values];

        this.validate(channel, values[0]) // value doesnt matter here
        const type = LPP_TYPES[_type];

        if ((this.cursor + type.SIZE + 2) > this.maxsize) {
            return 0
        }

        this.buffer.writeUInt8(channel, this.cursor++)
        this.buffer[this.cursor++] = type.ID;
        for (let i=0;i<values.length;i++) {
            const opt = type.OPTS[i];
            let value = values[i];
            value *= opt[1]; // MULT
            if (opt.length > 2) value = floor(value, opt[2]); // PREC
            value = toBytes(value, opt[0]);
            for (let j=0;j<value.length;j++)
              this.buffer[this.cursor++] = value[j]
        }

        return this.cursor
    }

    /**
    @description Creates a payload with type LPP_DIGITAL_INPUT.
    type = DataTypes.TYPE.DIGITAL_SENSOR
    unit = DataTypes.UNIT.DIGITAL
    @param {int} channel The channel for this sensor.
    @param {int} value The value, unsigned int8, should be 0 or 1.
    */
    addDigitalInput(channel, value) {
        return this.addByType("DIGITAL_INPUT", channel, value);
    }

    /**
    @description Creates a payload with type LPP_DIGITAL_OUTPUT.
    type = DataTypes.TYPE.DIGITAL_SENSOR
    unit = DataTypes.UNIT.DIGITAL
    @param {int} channel The channel for this sensor.
    @param {int} value The value, unsigned int8, should be 0 or 1.
    */
    addDigitalOutput(channel, value) {
        return this.addByType("DIGITAL_OUTPUT", channel, value);
    }

    /**
    @description Creates a payload with type LPP_ANALOG_INPUT.
    type = DataTypes.TYPE.ANALOG_SENSOR
    unit = DataTypes.UNIT.ANALOG
    @param {int} channel The channel for this sensor.
    @param {float} value A floating point number accurate to two decimal place. lodash.floor(value, 2)
    */
    addAnalogInput(channel, value) {
        return this.addByType("ANALOG_INPUT", channel, value);
    }

    /**
    @description Creates a payload with type LPP_ANALOG_OUTPUT.
    type = DataTypes.TYPE.ANALOG_SENSOR
    unit = DataTypes.UNIT.ANALOG
    @param {int} channel The channel for this sensor.
    @param {float} value A floating point number accurate to two decimal place. lodash.floor(value, 2)
    */
    addAnalogOutput(channel, value) {
        return this.addByType("ANALOG_OUTPUT", channel, value);
    }

    // float
    addGenericSensor(channel, value) {
        return this.addByType("GENERIC_SENSOR", channel, value);
    }

    /**
    @description Creates a payload with type LPP_LUMINOSITY.
    type = DataTypes.TYPE.LUMINOSITY
    unit = DataTypes.UNIT.LUX
    @param {int} channel The channel for this sensor.
    @param {float} value An unsigned int16 value. 0-65535.
    */
    addLuminosity(channel, value) {
        return this.addByType("LUMINOSITY", channel, value);
    }

    /**
    @description Creates a payload with type LPP_PRESENCE.
    type = DataTypes.TYPE.PRESENCE
    unit = DataTypes.UNIT.BOOL
    @param {int} channel The channel for this sensor.
    @param {int|bool} value An 1 or 0
    */
    addPresence(channel, value) {
        return this.addByType("PRESENCE", channel, value);
    }

    /**
    @description Creates a payload with type LPP_TEMPERATURE.
    type = DataTypes.TYPE.TEMPERATURE
    unit = DataTypes.UNIT.CELSIUS
    @param {int} channel The channel for this sensor.
    @param {float} value A floating point number accurate to one decimal place. lodash.floor(value, 1)
    */
    addTemperature(channel, value) {
        return this.addByType("TEMPERATURE", channel, value);
    }

    /**
    @description Creates a payload with type LPP_HUMIDITY.
    type = DataTypes.TYPE.RELATIVE_HUMIDITY
    unit = DataTypes.UNIT.PERCENT
    @param {int} channel The channel for this sensor.
    @param {float} value A floating point number (%) accurate to one decimal place in 0.5 increments. Math.floor10(value, -1)
    */
    addRelativeHumidity(channel, value) {
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
    addAccelerometer(channel, x, y, z) {
        return this.addByType("ACCELEROMETER", channel, [x, y, z]);
    }

    /**
    @description Creates a payload with type LPP_HUMIDITY.
    type = DataTypes.TYPE.RELATIVE_HUMIDITY
    unit = DataTypes.UNIT.PERCENT
    @param {int} channel The channel for this sensor.
    @param {float} value A floating point number (%) accurate to one decimal place in 0.5 increments. Math.floor10(value, -1)
    */
    addBarometricPressure(channel, value) {
        return this.addByType("BAROMETRIC_PRESSURE", channel, value);
    }

    // float
    addVoltage(channel, value) {
        return this.addByType("VOLTAGE", channel, value);
    }

    // float
    addCurrent(channel, value) {
        return this.addByType("CURRENT", channel, value);
    }

    // uint32_t
    addFrequency(channel, value) {
        return this.addByType("FREQUENCY", channel, value);
    }

    // uint32_t
    addPercentage(channel, value) {
        return this.addByType("PERCENTAGE", channel, value);
    }

    // float
    addAltitude(channel, value) {
        return this.addByType("ALTITUDE", channel, value);
    }

    // uint32_t
    addConcentration(channel, value) {
        return this.addByType("CONCENTRATION", channel, value);
    }

    // uint32_t
    addPower(channel, value) {
        return this.addByType("POWER", channel, value);
    }

    // float
    addDistance(channel, value) {
        return this.addByType("DISTANCE", channel, value);
    }

    // float
    addEnergy(channel, value) {
        return this.addByType("ENERGY", channel, value);
    }

    // float
    addDirection(channel, value) {
        return this.addByType("DIRECTION", channel, value);
    }

    /**
    @description Creates a payload with type LPP_UNIX_TIME.
    type = DataTypes.TYPE.UNIX_TIME
    unit = DataTypes.UNIT.INT
    @param {int} channel The channel for this sensor.
    @param {int} value Unix timestamp
    */
    addUnixTime(channel, value) {
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
    addGyrometer(channel, x, y, z) {
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
    addColour(channel, r, g, b) {
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
    addGPS(channel, latitude, longitude, altitude) {
        return this.addByType("GPS", channel, [latitude, longitude, altitude]);
    }

    addSwitch(channel, value) {
        return this.addByType("SWITCH", channel, value);
    }

    addPolyline(channel, coords, precision = 10000, simplification = "DouglasPeucker") {
        return 0; // NOT DONE
    }

    // Kinda helper function
    getPayload() {
        var buff = this.buffer.slice(0, this.cursor)
        return buff
    }
}

export default LPPEncoder
