module.exports = {
    "ticker": {
        "url": "https://poloniex.com/public?command=returnTicker&currencyPair={pair}",
        "getData": function (response, pair) {
            let result = {
                "price": response[pair]["last"], 
                "volume": response[pair]["quoteVolume"]
            };
            return result;
        }
    },
    "orderbook": {
        "url": "https://poloniex.com/public?command=returnOrderBook&currencyPair={pair}",
        "getData": function (response, pair) {
            let result = {};
            result.bids = response.bids;
            result.asks = response.asks;
            return result;
        }
    },
    "product": {
        "url": "https://poloniex.com/public?command=returnTicker",
        "getData": function (response) {
            return Object.keys(response)
        }
    },
    "trade": {
        "url": "https://poloniex.com/public?command=returnTradeHistory&currencyPair={pair}",
        "getData": function (response, pair) {
            let allTrades = response.reverse();
            let result = [];
            for (var i = 0; i < allTrades.length; i++) {

                let tradeData = allTrades[i];

                let tradeObject = {
                    F: tradeData['type'],
                    ID: tradeData['tradeID'],
                    TS: Math.round(Date.parse(tradeData['date'])/1000),
                    Q: parseFloat(tradeData['amount']),
                    P: parseFloat(tradeData['rate'])
                };

                result.push(tradeObject);
            }
            return result;
        }
    },
    "convertURLPair": function (pair) {
        let symbols = pair.split('_');
        return symbols[0] + '_' + symbols[1];
    }
};