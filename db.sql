-- Database
CREATE DATABASE angkasa


-- Users
CREATE TABLE users (
    user_id UUID  PRIMARY KEY NOT NULL, 
    username VARCHAR(64) NOT NULL,
    email VARCHAR (64) NOT NULL UNIQUE,
    phone VARCHAR(16) NOT NULL,
    city VARCHAR(128),
    address VARCHAR,
    postcode VARCHAR(16),
    password VARCHAR(64) NOT NULL,
    isPhoto boolean DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

for update isphoto
 by email
update users set isphoto =  true where email = 'brandon@mail.com';
 by id
update users set isphoto =  true where user_id = '8b65d7af-91c2-478f-8655-ddaabeb3fa80';


INSERT INTO users (user_id, username, email, phone, city, address, postcode, password)
VALUES ('8b65d7af-91c2-478f-8655-ddaabeb3fa80', 'Brandon', 'brandon@mail.com', '08563344252537', 'Jakarta', 'Walet Street Number 100', '11800', 'password');

CREATE TABLE photo_users (
	photo_user_id UUID PRIMARY KEY NOT NULL,
	user_id UUID REFERENCES users(user_id),
	photo VARCHAR NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now()
); 





-- Admins
CREATE TABLE admins (
    admin_id UUID  PRIMARY KEY NOT NULL, 
    username VARCHAR(64) NOT NULL,
    email VARCHAR (64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);


-- Airlines
CREATE TABLE airlines (
    airline_id UUID PRIMARY KEY NOT NULL,
    name VARCHAR (256),
    logo VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

INSERT INTO airlines (airline_id, name)
VALUES ('cb321f1c-7f85-4b40-8f35-8829db0bc702', 'Garuda');


-- Flights
CREATE TABLE IF NOT EXISTS flights (
    flight_id UUID PRIMARY KEY NOT NULL,
    arrival_country VARCHAR(50) NOT NULL,
    arrival_city VARCHAR(50) NOT NULL,
    departure_country VARCHAR(50) NOT NULL,
    departure_city VARCHAR(50) NOT NULL,
    arrival_time VARCHAR NOT NULL,
    departure_time VARCHAR NOT NULL,
    price INTEGER NOT NULL,
    airline_id UUID REFERENCES airlines(airline_id),
    terminal VARCHAR NOT NULL,
    gate VARCHAR NOT NULL,
    wifi BOOLEAN NOT NULL,
    luggage BOOLEAN NOT NULL,
    lunch BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

INSERT INTO flights (flight_id, arrival_country, arrival_city, departure_country, departure_city,
arrival_time, departure_time, price, airline_id, terminal, gate, wifi, luggage, lunch)
VALUES ('00f4fe0d-61da-40aa-a7ab-75a0637c5d86', 'SGP', 'Singapore', 'IDN', 'Jakarta', '12:00', 
'10:00', '1500000', 'cb321f1c-7f85-4b40-8f35-8829db0bc702', 'Soekarno', 'A', true, true, true );


-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
    booking_id UUID PRIMARY KEY NOT NULL,
    user_id UUID REFERENCES users(user_id),
    flight_id UUID REFERENCES flights(flight_id),
    cp_name VARCHAR(64) NOT NULL,
    cp_email VARCHAR (64) NOT NULL,
    cp_phone VARCHAR(16) NOT NULL,
    passenger_title VARCHAR(64) NOT NULL,
    passenger_name VARCHAR (64) NOT NULL,
    passenger_nationality VARCHAR(16) NOT NULL,
    travel_insurance BOOLEAN DEFAULT false,
    payment_status BOOLEAN DEFAULT false,
    total_payment INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);
