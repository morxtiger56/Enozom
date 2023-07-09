CREATE TABLE User_Game (
  game_id INT NOT NULL,
  user_id INT NOT NULL,
  active BOOLEAN NOT NULL,
  position INT NOT NULL,
  turn_order INT NOT NULL,
  PRIMARY KEY (game_id, user_id),
  FOREIGN KEY (game_id) REFERENCES Game(id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);