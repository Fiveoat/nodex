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
    name VARCHAR(30)
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
INSERT INTO coins(symbol, name)
VALUES ('BTC', 'Bitcoin');
INSERT INTO coins(symbol, name)
VALUES ('ETH', 'Ethereum');
INSERT INTO coins(symbol, name)
VALUES ('ADA', 'Cardano');
