const expect = require("chai").expect;
const assert = require("chai").assert;
const axios = require('axios');
const config = require('./config');

var product;
var exchanges = []

if (process.env.exchange === "all" || process.env.exchange === undefined) {
    exchanges = Object.keys(config.exchangesMap);
}
else {
    exchanges[0] = process.env.exchange;
}

exchanges.forEach(function (exchange) {
    describe(exchange + ": tests for exchange endpoint", function (name) {
        before(function (done) {

            axios.get('http://localhost:3000/' + exchange + "/product/a").then(function (res) {
                product = res;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it("should check all products are in the correct format ", function () {
            let correctFormat = true;
            for (let i = 0; i < product.data.length; i++) {
                if (product.data[i] !== product.data[i].toUpperCase() || product.data[i].indexOf('_') == -1) {
                    correctFormat = false;
                }
            }
            expect(correctFormat).to.equal(true);
        });
        it("should check ticker api for price and vol", function (done) {
            axios.get('http://localhost:3000/' + exchange + "/ticker/" + product.data[0]).then(function (res) {
                expect((typeof (res.data.price))).to.equal("string");
                expect((typeof (res.data.volume))).to.equal("string");
                done();
            }).catch(err => {
                done(err);
            });
        });

        it("should check orderbook for bid and ask in an array", function (done) {
            axios.get('http://localhost:3000/' + exchange + "/orderbook/" + product.data[0]).then(function (res) {
                expect(Array.isArray(res.data.bids)).to.equal(true);
                expect(Array.isArray(res.data.asks)).to.equal(true);
                done();
            }).catch(err => {
                done(err);
            });
        });

        it("should check trade for correct types", function (done) {
            axios.get('http://localhost:3000/' + exchange + "/trade/" + product.data[0]).then(function (res) {
                if(res.data[0].F != undefined){
                    expect((typeof (res.data[0].F))).to.equal("string");
                }
                if(res.data[0].ID != undefined){
                    expect((typeof (res.data[0].ID))).to.equal("number");
                }
                expect((typeof (res.data[0].TS))).to.equal("number");
                expect((typeof (res.data[0].Q))).to.equal("number");
                expect((typeof (res.data[0].P))).to.equal("number");
                done();
            }).catch(err => {
                done(err);
            });
        });
    });
});
