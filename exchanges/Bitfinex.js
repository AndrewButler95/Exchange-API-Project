module.exports = {
    "ticker": {
        "url": "https://api.bitfinex.com/v1/pubticker/{pair}",
        "getData": function (response, pair) {
            let result = {
                "price": response["last_price"],
                "volume": response["volume"]
            };
            return result;
        }
    },
    "orderbook": {
        "url": "https://api.bitfinex.com/v1/book/{pair}?limit_bids=2500&limit_asks=2500",
        "getData": function (response, pair) {
            let result = { bids: [], asks: [] };
            result.bids = response.bids.map(function (item) {
                let array = [item["price"], item["amount"]];
                return array;
            });
            result.asks = response.asks.map(function (item) {
                let array = [item["price"], item["amount"]];
                return array;
            });
            return result;
        }
    },
    "product": {
        "url": "https://api.bitfinex.com/v1/symbols",
        "getData": function (response) {

            const result = [];
            for (let i in response) {
                var symbols = [
                    response[i].substring(0, 3).toUpperCase(),
                    response[i].substring(3).toUpperCase()
                ];
                let currentPairKey = symbols[0] + "_" + symbols[1];
                result.push(currentPairKey);
            }
            return result;
        }
    },
    "trade": {
        "url": "https://api.bitfinex.com/v1/trades/{pair}?limit_trades=900",
        "getData": function (response, pair) {
            let allTrades = response;
            let result = [];
            for (var i = 0; i < allTrades.length; i++) {
                tradeData = allTrades[i];
                let tradeFlags = tradeData['type'] === 'sell' ? 'sell' : 'buy';
                tradeObject = {
                    F: tradeFlags,
                    ID: tradeData['tid'],
                    TS: tradeData['timestamp'],
                    Q: parseFloat(tradeData['amount']),
                    P: parseFloat(tradeData['price']),
                    TOTAL: parseFloat(tradeData['price']) * parseFloat(tradeData['amount'])
                };
                result.push(tradeObject)
            }
            return result;
        }
    },
    "convertURLPair": function (pair) {
        let symbols = pair.split('_');
        return symbols[0].toLowerCase() + symbols[1].toLowerCase();
    }
};