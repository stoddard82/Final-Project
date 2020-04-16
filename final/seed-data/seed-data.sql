
COPY citydata(id,ranking,city,statecode,avg_sal,med_h,med_r,avg_h_temp,avg_l_temp,med_age,unemp,avg_price,salary,positions,Lat,Long,mtg30,mtg_by_sal,mbs,rent12,rent_by_sal,rbs,rent_mtg_avg,rma_weight,our_rank,combined_score,weighted_score,rank) 
FROM '/Users/greg/students/final-project/final/seed-data/CityDataFinal.csv' DELIMITER ',' CSV HEADER;

select * from citydata;

COPY stateabbr(id,state,abbr) 
FROM '/Users/greg/students/final-project/final/seed-data/state-abbr.csv' DELIMITER ',' CSV HEADER;

select * from stateabbr;

COPY href(id,state,city,href) 
FROM '/Users/greg/students/final-project/final/seed-data/href.csv' DELIMITER ',' CSV HEADER;

select * from href;

COPY search(id,cityrank,city,state,averagesalary,medianhousingcost,medianrent,unemploymentrate) 
FROM '/Users/greg/students/final-project/final/seed-data/search.csv' DELIMITER ',' CSV HEADER;

select * from search;

select cityrank,search.city,search.state,averagesalary,medianhousingcost,medianrent,unemploymentrate,href,abbr from search, href, stateabbr
where lower(search.state) = lower(href.state)
and lower(search.city) = lower(href.city)
and lower(stateabbr.state) = lower(href.state)
order by cityrank;
