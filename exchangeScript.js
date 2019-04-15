const config = require('./config');
const request = require('request');

let getAllExchanges = function () {
    return Object.keys(config.exchangesMap);
};

let getSupportedMethods = function () {
    return ["ticker", "product", "trade", "orderbook"];
};

let makeRequest = function (url, exchange, method, formatPair, callback) {
    console.log(url)
    request({
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
        },
        timeout: 10000
    }, function (err, response, body) {
        let newresult = {}
        let parsedResponse = ''
        if (err) {
            console.log("Error getting data for " + formatPair + " on " + exchange + ": " + err);
            return callback(err, null);
        } else {
            try {
                let parsedResponse = JSON.parse(body);
                newresult = config.exchangesMap[exchange][method].getData(parsedResponse, formatPair);
            }
            catch (error) {
                return callback(error, null);
            }
            return callback(null, newresult);
        }
    }, function (result) {
       return callback(null, result);
    });
}

let getExchangeData = function (exchange, method, pair, callback) {
    let url;
    let formatPair;
    if (method !== "product") {
            formatPair = config.exchangesMap[exchange].convertURLPair(pair, method);
            url = config.exchangesMap[exchange][method].url.replace("{pair}", formatPair)
            makeRequest(url, exchange, method, formatPair, function (err, result) {
                if(err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
    }
    else {
        url = config.exchangesMap[exchange]["product"].url;
        makeRequest(url, exchange, method, formatPair, function (err, result) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

function getPairUrl(exchange, method, pair) {
    if (config.exchangesMap[exchange] === undefined) {
        throw Error("Exchange does not exist");
    }
    if (config.exchangesMap[exchange][method] === undefined) {
        throw Error("Method does not exist for exchange");
    }
    if (method === 'product') {
        return  config.exchangesMap[exchange][method].url;
    }
    let formatPair = config.exchangesMap[exchange].convertURLPair(pair, method);
    let url = config.exchangesMap[exchange][method].url.replace("{pair}", formatPair);
    return url;
}

module.exports = {
    getExchangeData: getExchangeData,
    getAllExchanges: getAllExchanges,
    getSupportedMethods: getSupportedMethods,
    getPairUrl: getPairUrl
};