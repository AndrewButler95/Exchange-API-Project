module.exports = {
    "ticker": {
        "url": "https://api.exmo.com/v1/ticker/?pair={pair}",
        "getData": function(response, pair) {
            const result = {};
            result.price=response[pair].last_trade;
            result.volume = response[pair].vol;
            return result;
        }
    },
    "orderbook": {
        "url": "https://api.exmo.com/v1/order_book/?pair={pair}",
        "getData": function(response, pair) {
            let result = {bids: [], asks: []};
            let key = Object.keys(response)[0]
            let bids = response[pair].bid
            let asks = response[pair].ask;
            for (let i = 0; i < bids.length; i++) {
                result.bids.push([bids[i][0], bids[i][1]]);
            }
            for (let i = 0; i < asks.length; i++) {
                result.asks.push([asks[i][0], asks[i][1]]);
            }
            return result;
        }
    },
    "product": {
        "url": "https://api.exmo.com/v1/pair_settings/",
        "getData": function(response) {
            return Object.keys(response).map(function(pair) {
                return pair;
            });
        }
    },
    "trade": {
        "url": "https://api.exmo.com/v1/trades/?pair={pair}",
        "getData": function(response, pair) {
        
            let allTrades = response[pair];
            let result = [];
            for (var i = 0; i < allTrades.length; i++) {

                let tradeData = allTrades[i];
                let tradeFlags = tradeData['type'] === 'sell' ? 'sell' : 'buy';
                
                let tradeObject = {
                    F: tradeFlags,
                    ID :    tradeData['trade_id'],
                    TS: tradeData['date'],
                    Q: parseFloat(tradeData['quantity']),
                    P: parseFloat(tradeData['price']),
                    TOTAL : parseFloat(tradeData['amount'])
                };
                
                result.push(tradeObject);
            }
            
            return result;
        }
    },
    "convertURLPair": function(pair) {
       return pair;
    }
};