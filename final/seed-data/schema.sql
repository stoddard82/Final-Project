-- Create the seed data from week 09.01 Activity 9
-- NOTE: IMPORTANT: YOU MUST HAVE A PRIMARY KEY OR SQLALCHEMY WILL NOT WORK

DROP TABLE IF EXISTS citydata;
CREATE TABLE  citydata (
    id  SERIAL PRIMARY KEY,
    ranking INT,
    city VARCHAR(64),
    statecode VARCHAR(64),
    avg_sal NUMERIC,
    med_h NUMERIC,
    med_r NUMERIC,
    avg_h_temp NUMERIC,
    avg_l_temp NUMERIC,
    med_age NUMERIC,
    unemp NUMERIC,
    avg_price NUMERIC,
    salary NUMERIC,
    positions NUMERIC,
    Lat NUMERIC,
    Long NUMERIC,
    mtg30 VARCHAR(64),
    mtg_by_sal VARCHAR(64),
    mbs VARCHAR(64),
    rent12 VARCHAR(64),
    rent_by_sal VARCHAR(64),
    rbs VARCHAR(64),
    rent_mtg_avg VARCHAR(64),
    rma_weight VARCHAR(64),
    our_rank VARCHAR(64),
    combined_score VARCHAR(64),
    weighted_score VARCHAR(64),
    rank INT
);

DROP TABLE IF EXISTS stateabbr;
CREATE TABLE  stateabbr (
    id  SERIAL PRIMARY KEY,
    state VARCHAR(64),
    abbr VARCHAR(64)
);

DROP TABLE IF EXISTS href;
CREATE TABLE  href (
    id  SERIAL PRIMARY KEY,
    state VARCHAR(64),
    city VARCHAR(64),
    href VARCHAR(1024)
);

DROP TABLE IF EXISTS search;
CREATE TABLE search (
    id  SERIAL PRIMARY KEY,
    cityrank INT,
    city VARCHAR(64),
    state VARCHAR(64),
    averagesalary VARCHAR(64),
    medianhousingcost VARCHAR(64),
    medianrent VARCHAR(64),
    unemploymentrate VARCHAR(64)
);
