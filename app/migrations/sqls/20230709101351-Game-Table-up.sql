CREATE TABLE Game (
  id INT NOT NULL AUTO_INCREMENT,
  players_number INT NOT NULL,
  turn_id INT NOT NULL,
  state VARCHAR(10) NOT NULL,
  last_move DATETIME NOT NULL,
  joined_number INT NOT NULL,
  board_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (turn_id) REFERENCES User(id),
  FOREIGN KEY (board_id) REFERENCES Board(id)
);
