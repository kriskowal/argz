'use strict';

var test = require('tape');
var parse = require('../usage');

function cases(tests) {
    return function t(assert) {

        for (var index = 0; index < tests.length; index++) {
            var test = tests[index];
            var result = parse(test.usage);
            if (result.err) {
                assert.ifError(result.err);
                continue;
            }
            assert.deepEquals(result.value, test.parsed, 'parses ' + test.usage);
        }

        assert.end();
    };
}

test('positive cases', cases([

    {
        usage: '',
        parsed: {
            name: null,
            flags: [],
            arg: null,
            command: null,
            help: '',
            collectorType: null,
            converterType: null,
            validatorType: null,
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '-f',
        parsed: {
            name: null,
            flags: [{flag: '-f', short: true}],
            arg: null,
            command: null,
            help: '',
            collectorType: null,
            converterType: null,
            validatorType: null,
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '-f|--flag',
        parsed: {
            name: null,
            flags: [{flag: '-f', short: true}, {flag: '--flag', long: true}],
            arg: null,
            command: null,
            help: '',
            collectorType: null,
            converterType: null,
            validatorType: null,
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '-f <flag>',
        parsed: {
            name: null,
            flags: [{flag: '-f', short: true}],
            arg: 'flag',
            command: null,
            help: '',
            collectorType: null,
            converterType: null,
            validatorType: null,
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '<arg>',
        parsed: {
            name: null,
            flags: [],
            arg: 'arg',
            command: null,
            help: '',
            collectorType: null,
            converterType: null,
            validatorType: null,
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '[<arg>]',
        parsed: {
            name: null,
            flags: [],
            arg: 'arg',
            command: null,
            help: '',
            collectorType: null,
            converterType: null,
            validatorType: null,
            required: false, // optional
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '[-f|--flag <arg>]',
        parsed: {
            name: null,
            flags: [{flag: '-f', short: true}, {flag: '--flag', long: true}],
            arg: 'arg',
            command: null,
            help: '',
            collectorType: null,
            converterType: null,
            validatorType: null,
            required: false, // optional
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '-f|--flag <arg>',
        parsed: {
            name: null,
            flags: [{flag: '-f', short: true}, {flag: '--flag', long: true}],
            arg: 'arg',
            command: null,
            help: '',
            collectorType: null,
            converterType: null,
            validatorType: null,
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '-f|--flag <arg> This is a flag',
        parsed: {
            name: null,
            flags: [{flag: '-f', short: true}, {flag: '--flag', long: true}],
            arg: 'arg',
            command: null,
            help: 'This is a flag',
            collectorType: null,
            converterType: null,
            validatorType: null,
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '<command>...',
        parsed: {
            name: null,
            flags: [],
            arg: 'command',
            command: null,
            help: '',
            collectorType: 'array',
            converterType: null,
            validatorType: null,
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '... All remaining arguments',
        parsed: {
            name: null,
            flags: [],
            arg: null,
            command: null,
            help: 'All remaining arguments',
            collectorType: 'array',
            converterType: null,
            validatorType: null,
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '<arg>{2..3}',
        parsed: {
            name: null,
            flags: [],
            arg: 'arg',
            command: null,
            help: '',
            collectorType: 'array',
            converterType: null,
            validatorType: null,
            required: true,
            minLength: 2,
            maxLength: 3,
            default: null
        }
    },

    {
        usage: '<arg>{2..}',
        parsed: {
            name: null,
            flags: [],
            arg: 'arg',
            command: null,
            help: '',
            collectorType: 'array',
            converterType: null,
            validatorType: null,
            required: true,
            minLength: 2,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '<arg>{4}',
        parsed: {
            name: null,
            flags: [],
            arg: 'arg',
            command: null,
            help: '',
            collectorType: 'array',
            converterType: null,
            validatorType: null,
            required: true,
            minLength: 4,
            maxLength: 4,
            default: null
        }
    },

    {
        usage: '<burritos> :quantity Number of burritos desired',
        parsed: {
            name: null,
            flags: [],
            arg: 'burritos',
            command: null,
            help: 'Number of burritos desired',
            collectorType: null,
            converterType: 'number',
            validatorType: 'positive',
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '-a=alpha*|-b=beta',
        parsed: {
            name: null,
            flags: [
                {flag: '-a', short: true, value: 'alpha', default: true},
                {flag: '-b', short: true, value: 'beta'}
            ],
            arg: null,
            command: null,
            help: '',
            collectorType: null,
            converterType: null,
            validatorType: null,
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '-t=true*|-f=false :boolean',
        parsed: {
            name: null,
            flags: [
                {flag: '-t', short: true, value: 'true', default: true},
                {flag: '-f', short: true, value: 'false'}
            ],
            arg: null,
            command: null,
            help: '',
            collectorType: null,
            converterType: 'boolean',
            validatorType: 'boolean',
            required: true,
            minLength: null,
            maxLength: null,
            default: null
        }
    },

    {
        usage: '[--no-flag=false|-F=false]',
        parsed: {
            name: null,
            flags: [
                {flag: '--no-flag', long: true, value: 'false'},
                {flag: '-F', short: true, value: 'false'}
            ],
            arg: null,
            command: null,
            help: '',
            collectorType: null,
            converterType: null,
            validatorType: null,
            required: false,
            minLength: null,
            maxLength: null,
            default: null
        }
    }

]));