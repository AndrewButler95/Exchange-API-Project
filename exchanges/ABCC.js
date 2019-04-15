module.exports = {
    "ticker": {
        "url": "https://api.abcc.com/api/v2/tickers.json",
        "getData": function (response, pair) {
            for (let i = 0; i < Object.keys(response).length; i++) {
                if (Object.keys(response)[i] === pair) {
                    let result = { "price": response[pair]["ticker"]["last"], "volume": response[pair]["ticker"]["vol"] }
                    return result;
                }
            }
        }
    },
    "orderbook": {
        "url": "https://api.abcc.com/api/v2/depth?market={pair}",
        "getData": function (response, pair) {
            let result = { bids: [], asks: [] };
            result.bids = response.bids;
            result.asks = response.asks;
            return result;
        }
    },
    "product": {
        "url": "https://api.abcc.com/api/cc/v1/products",
        "getData": function(response) {
            const result = [];
            for (let i in response) {
                let currentPairKey = response[i]["fromSymbol"] + "_" + response[i]["toSymbol"];
                result.push(currentPairKey);
            }
            return result;
        }
    },
    "trade": {
        "url": "https://api.abcc.com/api/cc/v1/trades?pair={pair}",
        "getData": function(response, pair) {
            let allTrades = response;
            let result = [];
            for (var i = 0; i < allTrades.length; i++) {

                let tradeData = allTrades[i];
                let tradeFlags = tradeData['type'];

                let tradeObject = {
                    F:      tradeFlags.toString(16)
                  , ID :    parseInt(tradeData['id'], 10)
                  , TS :    Math.round(parseInt(tradeData['timestamp']))
                  , Q :     parseFloat(tradeData['amount'])
                  , P :     parseFloat(tradeData['price'])
              }
                result.push(tradeObject);
            }
            return result;
        }
    },
    "convertURLPair": function(pair) {
        let symbols = pair.split('_');
        return symbols[0].toLowerCase() + symbols[1].toLowerCase();
    }
};