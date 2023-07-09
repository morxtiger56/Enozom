CREATE TABLE User (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(256) NOT NULL,
  password VARCHAR(255) NOT NULL,
  token_id VARCHAR(255) NOT NULL,
  expiry_date TIMESTAMP NOT NULL,
  isLogin BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);