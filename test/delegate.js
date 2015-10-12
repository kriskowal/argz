'use strict';

var Parser = require('../parser');
var Cursor = require('../cursor');
var Iterator = require('../iterator');

function Delegate(assert, expected) {
    this.assert = assert;
    this.expected = expected;
    this.index = 0;
}

Delegate.case = function (args, expected) {
    return function t(assert) {
        var parser = new Parser();
        var cursor = new Cursor(args, 0);
        var iterator = new Iterator(cursor);
        var delegate = new Delegate(assert, expected);
        parser.parse(iterator, delegate);
        delegate.end();
    }
};

Delegate.prototype.error = function error(message) {
    var key = 'error' + this.index++;
    this.assert.equals(message, this.expected[key], 'Logs ' + key + ': ' + message);
    delete this.expected[key];
};

Delegate.prototype.warn = function warn(message) {
    var key = 'warn' + this.index++;
    this.assert.equals(message, this.expected[key], 'Logs ' + key + ': ' + message);
    delete this.expected[key];
};

Delegate.prototype.cursor = function cursor() {
};

Delegate.prototype.end = function end() {
    for (var name in this.expected) {
        this.assert.fail('expected ' + name + ': ' + this.expected[name]);
    }
    this.assert.end();
};

module.exports = Delegate;
