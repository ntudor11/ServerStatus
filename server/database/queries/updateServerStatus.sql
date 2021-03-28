update servers 
    set server_status = $1,
    status_time_started = (to_timestamp($2 / 1000.0))
    where id = $3;