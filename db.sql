CREATE ROLE api_pract WITH LOGIN PASSWORD 'root';
ALTER ROLE api_pract CREATEDB;

CREATE DATABASE praktica;
CREATE SCHEMA api;
CREATE SCHEMA auth;
SET search_path TO api;
SET search_path TO auth;

CREATE TABLE auth.users
(
    id SERIAL PRIMARY KEY,
    email CHARACTER VARYING(100) NOT NULL UNIQUE,
    password CHARACTER VARYING(100) NOT NULL,
    role VARCHAR(255) DEFAULT 'USER',
    phone CHARACTER VARYING(100) NOT NULL
);

CREATE TABLE api.tickets
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title CHARACTER VARYING(100) NOT NULL,
    message CHARACTER VARYING(1023) NOT NULL,
    firstName CHARACTER VARYING(100) NOT NULL,
    lastName CHARACTER VARYING(100) NOT NULL,
    phone CHARACTER VARYING(100) NOT NULL,
    email CHARACTER VARYING(100) NOT NULL,
    feedbackType CHARACTER VARYING(100) NOT NULL,
    status CHARACTER VARYING(100) DEFAULT 'ОТКРЫТА',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth.users (id)
);


