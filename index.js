let express = require('express');
const app = express();
const port = 3000;
let exchangeScript = require('./exchangeScript');
let exchanges = exchangeScript.getAllExchanges();
let supportedMethods = exchangeScript.getSupportedMethods();


app.get('/:exchange/:method/:pair', function (req, res) {
    if (exchanges.indexOf(req.params.exchange) < 0) {
        res.json({ error: "Exchange does not exist", exchanges: exchanges});
        return;
    }
    if (supportedMethods.indexOf(req.params.method) < 0) {
        res.json({ error: "method does not exist", supportedMethods: supportedMethods});
        return;
    }
    if (req.params.method !== "product" && (req.params.pair.length < 5 || req.params.pair.indexOf('_') < 0)){
        res.json({ error: "pair is invalid"});
        return;
    }

    exchangeScript.getExchangeData(req.params.exchange, req.params.method, req.params.pair, function (err, data) {
        res.send(data);
    })
});

app.get('/:exchange/product', function (req, res) {
    exchangeScript.getExchangeData(req.params.exchange, "product", "pair", function (err, data) {
        res.send(data);
    })
});

app.get('/exchanges', function (req, res) {
    res.json({exchanges: exchanges});
});

app.listen(port, () => console.log(`api listening on port ${port}!`));