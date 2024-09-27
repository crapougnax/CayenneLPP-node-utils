import LPP_TYPE from './common'
import { fromBytes } from './utils'

export class LPPDecoder {

    constructor(buffer) {
        this.maxsize = 51

        if (buffer) {
            this.decode(buffer)
        }
    }

    prepare() {
        this.cursor = 0
        this.channels = {}
        this.current = null  // current channel
    }

    /**
     * Try to decode a Cayenne LPP payload in buffer
     */
    decode(buffer) {
        if (buffer) {
            this.buffer = buffer
        }
        this.prepare()
        while (this.cursor < this.buffer.length) {
            if (this.current !== null) {
                // channel part is defined
                let m;
                if ((m = Object.entries(LPP_TYPE).find(([n,a])=>a.ID == this.buffer[this.cursor])) !== null) {
                    let opts = [];
                    for (let i=0;i<m[1].OPTS.length;i++) {
                        opts.push(fromBytes(this.buffer.slice(this.cursor + 1, this.cursor + 1 + m[1].OPTS[i][0])) / m[1].OPTS[i][1]);
                        this.cursor += m[1].OPTS[i][0]
                    }
                    this.channels[this.current][m[0].toLowerCase()] = (opts.length == 1) ? opts[0] : opts;
                } else {
                    console.log("Unsupported data type: " + this.buffer[this.cursor])
                }
                this.cursor++
                this.current = null
            } else {
                // new channel detection
                this.current = this.buffer[this.cursor++]
                // create the channel if not already declared
                if (! this.channels[this.current]) {
                    this.channels[this.current] = {}
                //    console.log(`Declared channel #${this.current}`)
                }
            }
        }
    }

    /**
     * Return all parsed channels
     * @return object
     */
    getChannels() {
        return this.channels
    }

    /**
     * Return the given channel data or false if it doesn't exist
     * @param {integer} key
     * @returns object|boolean
     */
    getChannel(key) {
        return this.channels[key] || false
    }

    getChannelData(key, data) {
        return this.channels[key][data] != undefined ? this.channels[key][data] : null
    }
}
