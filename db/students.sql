CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
	program TEXT NOT NULL
);

INSERT INTO students (name,email,program) VALUES
("Longan","longan@hotmail.com", "English"),
("Amanda","amanda@gmail.com","Singing"),
("Xiang Xiang","xx@yahoo.com","Math"),
("Mumu","mumu@me.com","Science")
