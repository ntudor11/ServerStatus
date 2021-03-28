insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values ($1, (to_timestamp($2 / 1000.0)), $3, $4);