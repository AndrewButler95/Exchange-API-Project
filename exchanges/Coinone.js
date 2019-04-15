module.exports = {
    "ticker": {
        "url": "https://api.coinone.co.kr/ticker/?format=json&currency={pair}",
        "getData": function (response, pair) {
            let result = { "price": response["last"], "volume": response["volume"] }
            return result;
        }
    },
    "orderbook": {
        "url": "https://api.coinone.co.kr/orderbook/?format=json&currency={pair}",
        "getData": function (response, pair) {
            let result = {bids: [], asks: []};
            for (let i = 0; i < response.bid.length; i++) {
                result.bids[i] = [response.bid[i].price, response.bid[i].qty];
            }
            for (let i = 0; i < response.ask.length; i++) {
                result.asks[i] = [response.ask[i].price, response.ask[i].qty];
            }

            return result;
        }
    },
    "product": {
        "url": "https://api.coinone.co.kr/ticker?currency=all",
        "getData": function (response) {
            const result = [];
            var tsym = 'KRW';
           
            for (let i in response) {
                result.push(i.toUpperCase() + '_' + tsym);
            }
            return result;
        }
    },
    "trade": {
        "url": "https://api.coinone.co.kr/trades/?format=json&currency={pair}",
        "getData": function (response, pair) {
            let allTrades = response.completeOrders;
            let result = [];
            
            for (var i = 0; i < allTrades.length; i++) {
                let tradeData = allTrades[i];
                let tradeFlags = tradeData['is_ask'] === "1" ? 'sell' : 'buy';
                let tradeObject = {
                    F: tradeFlags,
                    ID: parseInt(tradeData['id'], 10),
                    TS: tradeData['timestamp'],
                    Q: parseFloat(tradeData['qty']),
                    P: parseFloat(tradeData['price'])
                };

                result.push(tradeObject);
            }
            return result;
        }
    },
    "convertURLPair": function (pair) {
        let symbols = pair.split('_')
        return symbols[0].toLowerCase();
    }
};