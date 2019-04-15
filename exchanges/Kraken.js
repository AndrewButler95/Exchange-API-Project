module.exports = {
    "ticker": {
        "url": "https://api.kraken.com/0/public/Ticker?pair={pair}",
        "getData": function(response, pair) {
            const result = {};
            const queryPair = Object.keys(response.result)[0];
            result.price = response.result[queryPair].p[1];
            result.volume = response.result[queryPair].v[1];
            return result;
        }
    },
    "orderbook": {
        "url": "https://api.kraken.com/0/public/Depth?pair={pair}",
        "getData": function(response, pair) {
            let result = { bids: [], asks: [] };
            for (let i = 0; i < response.result[pair].asks.length; i++) {
                result.asks.push([
                    response.result[pair].asks[i][0],
                    response.result[pair].asks[i][1]
                ]);
            }
            for (let i = 0; i < response.result[pair].bids.length; i++) {
                result.bids.push([
                    response.result[pair].bids[i][0],
                    response.result[pair].bids[i][1]
                ]);
            }
            return result;
        }
    },
    "product": {
        "url": "https://api.kraken.com/0/public/AssetPairs",
        "getData": function(response) {
            const result = [];
            for (let pairKey in response.result) {
                if (pairKey.slice(-2) != '.d') {
                    let wsname = response.result[pairKey].wsname.split('/');
                    let currentPairKey = wsname[0] + "_" + wsname[1];
                    result.push(currentPairKey);
                }
            }
            return result;
        }
    },
    "trade": {
        "url": "https://api.kraken.com/0/public/Trades?pair={pair}",
        "getData": function(response, pair) {
            let allTrades = response.result[pair];
            let result = [];
            for (var i = 0; i < allTrades.length; i++) {
                let tradeFlags = 0;
                let tradeData = allTrades[i];

                if (tradeData[3] === 'b') {
                    tradeFlags = "buy";
                }
                else if (tradeData[3] === 's') {
                    tradeFlags = "sell";
                }
                else {
                    tradeFlags = "unknown";
                }
                let tradeObject = {};
                tradeObject['TYPE'] = tradeFlags;
                tradeObject['TS'] = parseInt(tradeData[2], 10);
                tradeObject['Q'] = parseFloat(tradeData[1]);
                tradeObject['P'] = parseFloat(tradeData[0]);
                result.push(tradeObject);
            }
            return result;
        }
    },
    "convertURLPair": function(pair) {
        let symbols = pair.split('_');
        return symbols[0] + symbols[1];
    }
}