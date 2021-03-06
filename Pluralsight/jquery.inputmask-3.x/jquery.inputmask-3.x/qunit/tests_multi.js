define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask",
	"../dist/inputmask/inputmask.date.extensions",
	"../dist/inputmask/inputmask.extensions",
	"../dist/inputmask/inputmask.numeric.extensions",
	"../dist/inputmask/inputmask.phone.extensions",
	"../dist/inputmask/inputmask.regex.extensions",
	"prototypeExtensions",
	"simulator"
], function(qunit, $, Inputmask) {

	qunit.module("multi masks");
	qunit.test("inputmask({ mask: [\"99-99\", \"999-99\"]}) - input 12345", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99-99", "999-99"]
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12345");
		setTimeout(function() {
			assert.equal(testmask.value, "123-45", "Result " + testmask.value);
			done();

		}, 0);
	});
	qunit.test("inputmask({ mask: [\"999.999.999-99\", \"99.999.999/9999-99\"]}) - input 12312312312", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["999.999.999-99", "99.999.999/9999-99"]
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12312312312");
		setTimeout(function() {
			assert.equal(testmask.value, "123.123.123-12", "Result " + testmask.value);
			done();

		}, 0);
	});
	qunit.test("inputmask({ mask: [\"999.999.999-99\", \"99.999.999/9999-99\"]}) - input 12.123123123412", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["999.999.999-99", "99.999.999/9999-99"]
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12.123123123412");
		setTimeout(function() {
			assert.equal(testmask.value, "12.123.123/1234-12", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 12345 greedy + blur", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99999", "99999-9999"]
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12345");
		testmask.blur();
		setTimeout(function() {
			assert.equal(testmask.inputmask._valueGet(), "12345", "Result " + testmask.inputmask._valueGet());
			done();

		}, 0);
	});
	qunit.test("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 12345 not greedy", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99999", "99999-9999"],
			greedy: false,
			keepStatic: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12345");
		setTimeout(function() {
			assert.equal(testmask.value, "12345", "Result " + testmask.value);
			done();

		}, 0);
	});
	qunit.test("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 12345-1234", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99999", "99999-9999"]
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12345-1234");
		setTimeout(function() {
			assert.equal(testmask.value, "12345-1234", "Result " + testmask.value);
			done();

		}, 0);
	});
	qunit.test("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 123451234", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99999", "99999-9999"]
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123451234");
		setTimeout(function() {
			assert.equal(testmask.value, "12345-1234", "Result " + testmask.value);
			done();

		}, 0);
	});
	qunit.test("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 1234512", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99999", "99999-9999"]
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("1234512");
		setTimeout(function() {
			assert.equal(testmask.value, "12345-12__", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 1234561234", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99999", "99999-9999", "999999-9999"]
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("1234561234");
		setTimeout(function() {
			assert.equal(testmask.value, "123456-1234", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 12345-6", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99999", "99999-9999", "999999-9999"]
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12345-6");
		setTimeout(function() {
			assert.equal(testmask.value, "12345-6___", "Result " + testmask.value);
			done();

		}, 0);
	});
	qunit.test("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"], keepStatic: false}) - input 123456", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99999", "99999-9999", "999999-9999"],
			keepStatic: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456");
		setTimeout(function() {
			assert.equal(testmask.value, "123456-____", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"] , keepStatic: true}) - input 123456", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99999", "99999-9999", "999999-9999"],
			keepStatic: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456");
		setTimeout(function() {
			assert.equal(testmask.value, "12345-6___", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 123456 (rtl)", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" dir="rtl" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99999", "99999-9999", "999999-9999"]
		}).mask(testmask);

		testmask.focus();
		setTimeout(function() { //needed to pass on ie
			$("#testmask").Type("123456");
			setTimeout(function() {
				assert.equal(testmask.value, "___6-54321", "Result " + testmask.value);
				done();
			}, 0);
		}, 0);
	});

	qunit.test("inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] }) ", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ['9 AAA-AAA', 'A 999-999']
		}).mask(testmask);

		$("#testmask").Type("1abc");
		setTimeout(function() {
			assert.equal(testmask.value, "1 ABC-___", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] }) ", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ['9 AAA-AAA', 'A 999-999']
		}).mask(testmask);

		$("#testmask").Type("a123");
		setTimeout(function() {
			assert.equal(testmask.value, "A 123-___", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: ['99.9', 'X'}) - annames", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: ["99.9", "X", "abc"],
			definitions: {
				"X": {
					validator: "[xX]",
					cardinality: 1,
					casing: "upper"
				}
			}
		}).mask(testmask);

		$("#testmask").Type("x");
		assert.equal(testmask.value, "X", "Result " + testmask.value);

	});

	qunit.test("inputmask({ mask: [{ \"mask\": \"###-##-####\" }]) - lynxlive", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		var ssns = [{
			"mask": "###-##-####"
		}];
		Inputmask({
			mask: ssns,
			greedy: false,
			definitions: {
				'#': {
					validator: "[0-9]",
					cardinality: 1
				}
			}
		}).mask(testmask);

		$("#testmask").Type("123121234");
		assert.equal(testmask.value, "123-12-1234", "Result " + testmask.value);

	});

});
