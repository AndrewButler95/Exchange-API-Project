# Exchange-API-Project

This is a project to create a API that standardises the response from different exchanges, into
a single format that can easily be used by other scripts.

It has 3 main components.

There is the "index.js" file, this is the file used to run the project. It uses express to 
create api endpoints to list; the exchanges included, the product pairs, ticker data, orderbook
data and trade data.

The exchangeScript file is used to make requests to the original exchange endpoints and is the
main script of the project. Depending on the endpoint called, it will call the appropriate method
and return a formatted response.

The config file is used by the exchangeScript to map to the correct exchange file. Each exchange file
has its own format conversion methods which are used by the exchangeScript. 

## To run the project:

"node index.js"

To get a list of exchanges

http://localhost:3000/exchanges

To get exchange data

http://localhost:3000/exchange/method/pair

Methods : [product, ticker, trade, orderbook]

Product : returns a array of pairs

Ticker : returns price and volume of the last 24hr for a exchange pair

Trade : returns trade data for a exchange pair

Orderbook : returns orderbook data for an exchange for a exchange pair

