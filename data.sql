CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name varchar(40),
    last_name varchar(40),
    password_ varchar(100),
    email VARCHAR(50)
);
CREATE TABLE coins(
    symbol VARCHAR(8) PRIMARY KEY,
    name VARCHAR(30),
    last_known_price numeric
);
CREATE TABLE user_coins(
    user_coin_id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(user_id),
    symbol VARCHAR(8) REFERENCES coins(symbol),
    quantity numeric
);
INSERT INTO users(first_name, last_name, password_, email)
VALUES ('Admin', 'Admin', 'x', 'admin@admin.com');
INSERT INTO users(first_name, last_name, password_, email)
VALUES ('Sadman', 'X', 'x', 'sadmin@sadmin.com');
INSERT INTO coins (name, symbol)
VALUES ('Band Protocol', 'BAND');
INSERT INTO coins (name, symbol)
VALUES ('Filecoin', 'FIL');
INSERT INTO coins (name, symbol)
VALUES ('OMG Network', 'OMG');
INSERT INTO coins (name, symbol)
VALUES ('Ethereum Classic', 'ETC');
INSERT INTO coins (name, symbol)
VALUES ('USD Coin', 'USDC');
INSERT INTO coins (name, symbol)
VALUES ('Tezos', 'XTZ');
INSERT INTO coins (name, symbol)
VALUES ('Synthetix Network Token', 'SNX');
INSERT INTO coins (name, symbol)
VALUES ('Kyber Network', 'KNC');
INSERT INTO coins (name, symbol)
VALUES ('Uniswap', 'UNI');
INSERT INTO coins (name, symbol)
VALUES ('UMA', 'UMA');
INSERT INTO coins (name, symbol)
VALUES ('Compound', 'COMP');
INSERT INTO coins (name, symbol)
VALUES ('Aave', 'AAVE');
INSERT INTO coins (name, symbol)
VALUES ('Celo', 'CGLD');
INSERT INTO coins (name, symbol)
VALUES ('Basic Attention Token', 'BAT');
INSERT INTO coins (name, symbol)
VALUES ('Stellar Lumens', 'XLM');
INSERT INTO coins (name, symbol)
VALUES ('Ren', 'REN');
INSERT INTO coins (name, symbol)
VALUES ('The Graph', 'GRT');
INSERT INTO coins (name, symbol)
VALUES ('Decentraland', 'MANA');
INSERT INTO coins (name, symbol)
VALUES ('Maker', 'MKR');
INSERT INTO coins (name, symbol)
VALUES ('Loopring', 'LRC');
INSERT INTO coins (name, symbol)
VALUES ('Balancer', 'BAL');
INSERT INTO coins (name, symbol)
VALUES ('Orchid', 'OXT');
INSERT INTO coins (name, symbol)
VALUES ('Numeraire', 'NMR');
INSERT INTO coins (name, symbol)
VALUES ('NuCypher', 'NU');
INSERT INTO coins (name, symbol)
VALUES ('Civic', 'CVC');
INSERT INTO coins (name, symbol)
VALUES ('Bitcoin', 'BTC');
INSERT INTO coins (name, symbol)
VALUES ('Ethereum', 'ETH');
INSERT INTO coins (name, symbol)
VALUES ('Algorand', 'ALGO');
INSERT INTO coins (name, symbol)
VALUES ('Zcash', 'ZEC');
INSERT INTO coins (name, symbol)
VALUES ('Ox', 'ZRX');
INSERT INTO coins (name, symbol)
VALUES ('USD', 'USD');
INSERT INTO coins (name, symbol)
VALUES ('Augur', 'REP');
INSERT INTO coins (name, symbol)
VALUES ('Chainlink', 'LINK');
INSERT INTO coins (name, symbol)
VALUES ('districtOx', 'DNT');
INSERT INTO coins (name, symbol)
VALUES ('Cosmos', 'ATOM');
INSERT INTO coins (name, symbol)
VALUES ('USD Coin', 'USDC');
INSERT INTO coins (name, symbol)
VALUES ('Dash', 'DASH');
INSERT INTO coins (name, symbol)
VALUES ('Litecoin', 'LTC');
INSERT INTO coins (name, symbol)
VALUES ('Bancor Network Token', 'BNT');
INSERT INTO user_coins(user_id, symbol, quantity)
VALUES (1, 'BTC', 1);
INSERT INTO user_coins(user_id, symbol, quantity)
VALUES (1, 'ETH', 42);
INSERT INTO user_coins(user_id, symbol, quantity)
VALUES (2, 'USDC', 20);