'use strict';

var test = require('tape');

var hasNames = require('../');

test('named functions', function (t) {
	function f() {} // eslint-disable-line func-style
	var g = function h() {};

	t.equal(typeof hasNames, 'function', 'is a function');
	t.equal(hasNames(), f.name === 'f' && g.name === 'h', 'functions have names or not as expected');

	t.end();
});

test('functionsHaveConfigurableNames', function (t) {
	t.equal(typeof hasNames.functionsHaveConfigurableNames, 'function', 'is a function');

	if (hasNames()) {
		var fn = function f() {};
		if (Object.defineProperty) {
			Object.defineProperty(fn, 'name', { configurable: true, value: 'foo' });
			if (fn.name === 'f') {
				t.equal(hasNames.functionsHaveConfigurableNames(), false, 'function names are not configurable');
			} else if (fn.name === 'foo') {
				t.equal(hasNames.functionsHaveConfigurableNames(), true, 'function names are not configurable');
			} else {
				t.fail('functions have names, but something surprising has happened. Please report this!');
			}
		} else {
			t.equal(hasNames.functionsHaveConfigurableNames(), false, 'function names are not configurable');
		}
	} else {
		t.equal(hasNames.functionsHaveConfigurableNames(), false, 'functions do not have names');
	}

	t.end();
});
