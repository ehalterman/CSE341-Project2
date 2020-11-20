CREATE TABLE Baby (id SERIAL PRIMARY KEY, first_name VARCHAR(20) NOT NULL, last_name VARCHAR(20), dob DATE );
CREATE TABLE Feed (id SERIAL PRIMARY KEY, start_time TIMESTAMP NOT NULL, amount VARCHAR(15) NOT NULL,  baby_id INT REFERENCES Baby (id));
CREATE TABLE Diaper (id SERIAL PRIMARY KEY, change_time TIMESTAMP NOT NULL, change_type VARCHAR(15) NOT NULL, baby_id INT REFERENCES Baby(id));
INSERT INTO Baby VALUES (default, 'Gavin', 'Halterman', '2020-07-17');

INSERT INTO Feed VALUES (default, '2020-11-20 15:27:00', 'full feed', 1 );
INSERT INTO Diaper VALUES (default, '2020-11-20 15:20:00', 'wet', 1);