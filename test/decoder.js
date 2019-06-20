require('babel-register')

import { LPPDecoder as decoder } from '../lib/decoder'
import { assert } from 'chai'

function getDecoder() {
    const buffer = Buffer.from('016700E9026838036701040468530402014901020126', 'hex')
    const cyn = new decoder(buffer)
    cyn.decode()

    return cyn
}

describe('decoder', () => {

    const cyn = getDecoder()
    const channel1 = getDecoder().getChannel(1)
    const channel3 = getDecoder().getChannel(3)

    it('data should contain 4 channels', function() {
        assert.equal(4, Object.keys(cyn.getChannels()).length)
    })

    it('channel 1 & 3 should exist', function() {
        assert.typeOf(channel1, 'object')
        assert.typeOf(channel3, 'object')
    })

    it('channel 5 should not exist', function() {
        assert.isFalse(getDecoder().getChannel(5))
    })

    it('channel 1 should contain temperature and analog properties', function() {
        assert.hasAllKeys(channel1, ['temperature', 'analog'])
    })

    it('temperature on channel 1 should be 23.3', function() {
        assert.strictEqual(23.3, channel1.temperature)
    })
})
