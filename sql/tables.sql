CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(90) NOT NULL,
  apellido VARCHAR(90) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE eventos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  contenido TEXT,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  /*fecha DATE NOT NULL,
  hora TIME NOT NULL,
  enlace TEXT,*/
  user_id INT,
  KEY user_id_idx(user_id)
);

INSERT INTO users (nombre, apellido, email) VALUES (
  "Juan", "Perez", "juan@correo.com"
);