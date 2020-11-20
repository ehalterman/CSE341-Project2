CREATE TABLE Person (id SERIAL PRIMARY KEY, first_name VARCHAR(20) NOT NULL, last_name VARCHAR(20) NOT NULL, dob DATE NOT NULL );
CREATE TABLE Relationship (parent_id INT REFERENCES Person(id), child_id INT REFERENCES Person(id));

INSERT INTO Person VALUES (default, 'Grandma', 'Jones', '1961-06-15');
INSERT INTO Person VALUES (default, 'Mom', 'Jones', '1991-08-24');
INSERT INTO Person VALUES (default, 'Child', 'Jones', '2018-08-11');

INSERT INTO Relationship VALUES (1, 2);
INSERT INTO Relationship VALUES (2, 3);
INSERT INTO Relationship VALUES (2, 4);