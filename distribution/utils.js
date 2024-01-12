"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toBytes = toBytes;
exports.fromBytes = fromBytes;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function toBytes(val, buflen) {
	var buf = new Uint8Array(buflen);
	for (var i = 0; i < buflen; i++) {
		var shift = (buflen - i - 1) * 8;
		buf[i] = val >> shift & 0xff;
	}
	return buf;
}

function fromBytes(buf) {
	var buflen = buf.length;
	var val = 0;
	for (var i = 0; i < buflen; i++) {
		var shift = (buflen - i - 1) * 8;
		val |= buf[i] << shift;
	}
	return val;
}

var Type = exports.Type = function Type(id, size, opts) {
	_classCallCheck(this, Type);

	this.ID = id;
	this.SIZE = size;
	this.OPTS = opts;
};