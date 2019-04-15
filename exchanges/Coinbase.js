module.exports = {
    "ticker": {
        "url": "https://api.pro.coinbase.com/products/{pair}/ticker",
        "getData": function(response, pair) {
            const result = {};
            result.price = response.price;
            result.volume = response.volume;
            return result;
        }
    },
    "orderbook": {
        "url": "https://api.pro.coinbase.com/products/{pair}/book?level=3",
        "getData": function(response, pair) {
            return response;
        }
    },
    "product": {
        "url": "https://api.pro.coinbase.com/products",
        "getData": function(response) {
            const result = [];
            for (let i in response) {
                let currentPairKey = response[i]["base_currency"] + "_" + response[i]["quote_currency"];
                result.push(currentPairKey);
            }
            return result;
        }
    },
    "trade": {
        "url": "https://api.pro.coinbase.com/products/{pair}/trades",
        "getData": function(response, pair) {
            let allTrades = response.reverse();
            let result = [];
            for (var i = 0; i < allTrades.length; i++) {

                let tradeData = allTrades[i];
                let tradeFlags = tradeData['side'] === 'sell' ? 'sell' : 'buy';

                let tradeObject = {
                    F: tradeFlags,
                    ID: tradeData['trade_id'],
                    TS: Math.round(Date.parse(tradeData['time']) / 1000),
                    Q: parseFloat(tradeData['size']),
                    P: parseFloat(tradeData['price'])
                };
                
                result.push(tradeObject);
            }
            return result;
        }
    },
    "convertURLPair": function(pair) {
        return pair.replace('_', '-');
    }
};