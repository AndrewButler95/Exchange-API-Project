
const exchangesMap = {};

exchangesMap["ABCC"] = require('./exchanges/ABCC.js')
exchangesMap["Bitpoint"] = require('./exchanges/Bitpoint.js');
exchangesMap["Coinone"] = require('./exchanges/Coinone.js');
exchangesMap["Exmo"] = require('./exchanges/Exmo.js');
exchangesMap["Kraken"] = require('./exchanges/Kraken.js');

module.exports = {
    exchangesMap: exchangesMap,
}