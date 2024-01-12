export function toBytes(val, buflen) {
	const buf = new Uint8Array(buflen)
	for (let i=0;i<buflen;i++) {
		const shift = (buflen - i - 1) * 8
		buf[i] = (val >> shift) & 0xff
	}
	return buf
}

export function fromBytes(buf) {
	const buflen = buf.length
	let val = 0
	for (let i=0;i<buflen;i++) {
		const shift = (buflen - i - 1) * 8
		val |= buf[i] << shift
	}
	return val
}

export class Type {
	constructor(id, size, opts) {
		this.ID = id
		this.SIZE = size
		this.OPTS = opts
	}
}