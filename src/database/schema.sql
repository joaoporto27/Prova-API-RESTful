CREATE DATABASE cadastro;

\c cadastro

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    photo TEXT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email) VALUES 
    ('Thiago Ferreira', 'thiago.ferreira@email.com'),
    ('Marcelo Carboni', 'marcelo@email.com'),
    ('Eduardo Correia', 'eduardo@email.com'),
    ('Felipe Santos', 'felipe@email');


INSERT INTO posts (title, image, user_id) VALUES 
    ('Post 1', 'https:/imagem.com', 1),
    ('Post 2', 'https:/imagem.com', 2),
    ('Post 3', 'https:/imagem.com', 3);
