CREATE DATABASE angkasa

CREATE TABLE users (
    user_id UUID  PRIMARY KEY NOT NULL, 
    username VARCHAR(64) NOT NULL,
    email VARCHAR (64) NOT NULL UNIQUE,
    phone VARCHAR(16) NOT NULL,
    city VARCHAR(128),
    address VARCHAR,
    postcode VARCHAR(16),
    password VARCHAR(64) NOT NULL,
    avatar VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE admins (
    admin_id UUID  PRIMARY KEY NOT NULL, 
    username VARCHAR(64) NOT NULL,
    email VARCHAR (64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE airlines (
    airline_id UUID PRIMARY KEY NOT NULL,
    name VARCHAR (256),
    logo VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS flights (
    flight_id UUID PRIMARY KEY NOT NULL,
    arrival_country VARCHAR(50) NOT NULL,
    arrival_city VARCHAR(50) NOT NULL,
    departure_country VARCHAR(50) NOT NULL,
    departure_city VARCHAR(50) NOT NULL,
    arrival_time VARCHAR NOT NULL,
    departure_time VARCHAR NOT NULL,
    price VARCHAR NOT NULL,
    airline_id UUID REFERENCES airlines(airline_id),
    terminal VARCHAR NOT NULL,
    gate VARCHAR NOT NULL,
    wifi BOOLEAN NOT NULL,
    bagasi BOOLEAN NOT NULL,
    lunch BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS bookings (
    booking_id UUID PRIMARY KEY NOT NULL,
    user_id UUID REFERENCES users(user_id),
    flight_id UUID REFERENCES flights(flight_id),
    status VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

----------------------notes------------------------
to insert manual uuid in cli u can use this syntax
gen_random_uuid()
		------------------	

----------------------notes------------------------

INSERT EXAMPLE

INSERT INTO flights (
flight_id, arrival_country, arrival_city, departure_country, departure_city,
arrival_time, departure_time, price, airline_id, terminal, gate, wifi, bagasi, lunch )
VALUES
(gen_random_uuid(), 'Indonesia', 'Jakarta', 'Malaysia', 'Kuala Lumpur', '15:00', '19:00',
'1500000', gen_random_uuid(), 'Sukarno Hatta', '3', 'true','true','true');
