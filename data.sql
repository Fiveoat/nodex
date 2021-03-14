CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name varchar(40),
    last_name varchar(40),
    password_ varchar(100),
    email VARCHAR(50)
);
CREATE TABLE coins(
    coin_id SERIAL PRIMARY KEY,
    symbol VARCHAR(8),
    name VARCHAR(30),
    last_known_price int
);
CREATE TABLE user_coins(
    user_coin_id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(user_id),
    coin_id int REFERENCES coins(coin_id),
    quantity int
);

INSERT INTO users(first_name, last_name, password_, email)
VALUES ('John', 'Wayne', 'ajdfkjri4', 'jonw@gmail.com');
INSERT INTO users(first_name, last_name, password_, email)
VALUES ('Bill', 'Gates', 'ajdfkjri4', 'bill@gmail.com');

INSERT INTO coins(symbol, name, last_known_price)
VALUES ('BTC', 'Bitcoin', 61000);
INSERT INTO coins(symbol, name, last_known_price)
VALUES ('ETH', 'Ethereum', 1950);
INSERT INTO coins(symbol, name, last_known_price)
VALUES ('ADA', 'Cardano', 1.06);

INSERT INTO user_coins(user_id, coin_id, quantity)
VALUES (1, 1, 1);
INSERT INTO user_coins(user_id, coin_id, quantity)
VALUES (2, 2, 20);