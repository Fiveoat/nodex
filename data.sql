CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name varchar(40),
    last_name varchar(40),
    birth VARCHAR(50)
);
CREATE TABLE relationships(
    relationship_id SERIAL PRIMARY KEY,
    parent_id int REFERENCES users(user_id),
    child_id int REFERENCES users(user_id)
);
INSERT INTO users(first_name, last_name, birth)
VALUES ('John', 'Wayne', '2015-10-15');
INSERT INTO users(first_name, last_name, birth)
VALUES ('Jim', 'Wayne', '2000-10-15');
INSERT INTO users(first_name, last_name, birth)
VALUES ('Joe', 'Mama', '1990-10-15');
INSERT INTO users(first_name, last_name, birth)
VALUES ('Taco', 'John', '1980-10-15');
INSERT INTO users(first_name, last_name, birth)
VALUES ('Taco', 'John', '1970-10-15');
INSERT INTO relationships(parent_id, child_id)
VALUES (1, 2);
INSERT INTO relationships(parent_id, child_id)
VALUES (2, 3);
INSERT INTO relationships(parent_id, child_id)
VALUES (3, 4);
