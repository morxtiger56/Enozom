CREATE TABLE Board_Elements (
  board_id INT NOT NULL,
  element VARCHAR(1) NOT NULL,
  start INT NOT NULL,
  end INT NOT NULL,
  PRIMARY KEY (board_id, start),
  FOREIGN KEY (board_id) REFERENCES Board(id)
);
