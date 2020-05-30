

--   User Roles  --
CREATE TABLE ers_user_roles(
	ers_user_role_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_role varchar(10) NOT NULL 
);

--  Users  --
CREATE TABLE ers_users(
	ers_user_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	ers_username varchar(50) NOT NULL UNIQUE,
	ers_password varchar(150),
	first_name varchar(100),
	last_name varchar(100),
	email varchar(50) NOT NULL UNIQUE,
	ers_user_role_id integer REFERENCES ers_user_roles(ers_user_role_id)
);

--  Reimbursement Type --
CREATE TABLE ers_reimbursement_type(
	reburs_type_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	reburs_type varchar(10)
);

-- Reimbursement Status --
CREATE TABLE ers_reimbursement_status(
	reburs_status_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	reburs_status varchar(10)
);

-- Reimbursement --
CREATE TABLE ers_reimbursment(
	reburs_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	reburs_amount NUMERIC(5,2) NOT NULL,
	reburs_submitted timestamp NOT NULL,
	reburs_resolved timestamp NOT NULL,
	reburs_description varchar(250) NOT NULL,
	reburs_receipt varchar(100) NOT NULL,
	reburs_author integer REFERENCES ers_users(ers_user_id),
	reburs_resolver integer REFERENCES ers_users(ers_user_id),
	reburs_status_id integer REFERENCES ers_reimbursement_status(reburs_status_id),
	reburs_type_id integer REFERENCES ers_reimbursement_type(reburs_type_id)

);

