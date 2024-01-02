const mocha = require('mocha')
const assert = require('assert');

const user = require("router/user.js")


describe('router/user.js', () => {

    describe('register api', () => {
        before(function () {
            console.log('before:');
        });

        after(function () {
            console.log('after.');
        });

        beforeEach(function () {
            console.log('  beforeEach:');
        });

        afterEach(function () {
            console.log('  afterEach.');
        });

        it('Registered user already exists', () => {

            assert.strictEqual(sum(), 0);
        });

        it('Registered user successfully', () => {

            assert.strictEqual(sum(1), 1);
        });
    });
});