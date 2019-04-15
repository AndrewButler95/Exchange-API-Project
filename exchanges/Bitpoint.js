module.exports = {
    "ticker": {
        "url": "https://smartapi.bitpoint.co.jp/bpj-smart-api/api/ticker/24hr?symbol={pair}",
        "getData": function (response, pair) {
            let result = { "price": response["statistics"][0]["lastPrice"], "volume": response["statistics"][0]["volume"] }
            return result;
        }
    },
    "orderbook": {
        "url": "https://smartapi.bitpoint.co.jp/bpj-smart-api/api/depth?symbol={pair}&limit=20",
        "getData": function (response, pair) {
            let result = {bids: [], asks: []};

            for (var i = 0; i < response.bids.length; i++) {
                result.bids.push([
                    response.bids[i]['price'],
                    response.bids[i]['qty']
                ]);
            }
            for (var i = 0; i < response.asks.length; i++) {
                result.asks.push([
                    response.asks[i]['price'],
                    response.asks[i]['qty']
                ]);
            }
            return result;
        }
    },
    "product": {
        "url": "https://smartapi.bitpoint.co.jp/bpj-smart-api/api/exchangeInfo",
        "getData": function (response) {
            return response.symbols.map(function(pair) {
                return pair.baseAsset + "_" + pair.quoteAsset;
            });
        }
    },
    "trade": {
        "url": "https://smartapi.bitpoint.co.jp/bpj-smart-api/api/trades?symbol={pair}",
        "getData": function (response, pair) {
            let allTrades = response;
            let result = [];
            for (var i = 0; i < allTrades.length; i++) {

                let tradeData = allTrades[i];

                let tradeObject = {
                    TS:  Math.round(tradeData['time']/ 1000),
                    ID: tradeData['id'],
                    Q: parseFloat(tradeData['qty']),
                    P: parseFloat(tradeData['price'])
                };

                result.push(tradeObject);
            }
            return result;
        }
    },
    "convertURLPair": function (pair) {
        let symbols = pair.split('_');
        return symbols[0] + symbols[1];
    }
};