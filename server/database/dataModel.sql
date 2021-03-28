drop table IF EXISTS server_messages cascade;
drop table IF EXISTS servers cascade;
drop table IF EXISTS users cascade;

create table users (
    id serial primary key,
    email text,
    user_type text
);

create table servers (
    id text primary key,
    name text,
    ip text,
    server_status text,
    status_time_started timestamp,
    avg_uptime integer
);

create table server_messages (
    id serial primary key,
    status_code integer,
    time_stamp timestamp,
    message text,
    server_id text references servers(id)
);

insert into servers (
    id, name, ip, server_status, status_time_started, avg_uptime
) values (
    '57bcf240-682e-4b0d-b985-612a2baeafe6',
    'AWS Remote - Asia Pacific',
    '27.231.234.25',
    'Active',
    '2020-06-22 19:10:25',
    97.5
);

insert into servers (
    id, name, ip, server_status, status_time_started, avg_uptime
) values (
    '4e92804d-2552-4468-866e-8801d8b49378',
    'Azure US Data Center',
    '66.251.94.30',
    'Active',
    '2019-09-17 21:58:25',
    99.8
);

insert into servers (
    id, name, ip, server_status, status_time_started, avg_uptime
) values (
    '402c6cd2-23bd-49b7-9792-57e90b17603a',
    'Google Cloud EU',
    '109.212.216.168',
    'Panic',
    '2021-03-22 19:10:25',
    95
);

insert into servers (
    id, name, ip, server_status, status_time_started, avg_uptime
) values (
    '0c28e843-c727-4e8c-b90e-4177fd51cda1',
    'Server LATAM - Data Center',
    '131.255.7.26',
    'Not responding/ Unavailable',
    '2021-03-25 08:30:25',
    98
);

insert into servers (
    id, name, ip, server_status, status_time_started, avg_uptime
) values (
    'e09bfc7f-f7e5-4ef0-a94c-4b9fbbab5d3c',
    'AWS Kanagawa Shibuya',
    '27.143.110.156',
    'Inactive',
    '2018-07-30 20:00:25',
    99.2
);

insert into servers (
    id, name, ip, server_status, status_time_started, avg_uptime
) values (
    'ce86e679-9de4-4c4d-8f68-9c73089c1a2d',
    'Apple Data Center - North East US',
    '169.40.207.19',
    'Active',
    '2020-04-27 17:00:00',
    97.5
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    200,
    '2020-04-27 17:00:00',
    'Server is listening on port 8000',
    '57bcf240-682e-4b0d-b985-612a2baeafe6'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    404,
    '2021-02-21 08:30:00',
    'Page not found',
    '57bcf240-682e-4b0d-b985-612a2baeafe6'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    401,
    '2020-11-17 15:34:00',
    'User does not have access to this content',
    '57bcf240-682e-4b0d-b985-612a2baeafe6'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    200,
    '2021-03-26 16:52:47',
    'Retrieve /getUsers page successfully',
    '4e92804d-2552-4468-866e-8801d8b49378'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    401,
    '2020-12-14 08:20:00',
    'User does not have access to this content',
    '4e92804d-2552-4468-866e-8801d8b49378'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    500,
    '2020-11-04 01:20:00',
    'Internal server error',
    '4e92804d-2552-4468-866e-8801d8b49378'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    200,
    '2021-02-04 01:20:00',
    'Server listening on port 4000',
    '0c28e843-c727-4e8c-b90e-4177fd51cda1'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    500,
    '2020-12-21 18:04:24',
    'Internal server error',
    '0c28e843-c727-4e8c-b90e-4177fd51cda1'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    401,
    '2021-01-03 17:26:42',
    'Unauthorized access',
    '402c6cd2-23bd-49b7-9792-57e90b17603a'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    200,
    '2021-01-27 18:57:21',
    'Server running on port 8080',
    'ce86e679-9de4-4c4d-8f68-9c73089c1a2d'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    404,
    '2021-03-21 11:04:58',
    'Page not found',
    'ce86e679-9de4-4c4d-8f68-9c73089c1a2d'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    200,
    '2021-01-03 17:26:42',
    'OK',
    '402c6cd2-23bd-49b7-9792-57e90b17603a'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    200,
    '2019-07-15 06:00:42',
    'OK',
    'e09bfc7f-f7e5-4ef0-a94c-4b9fbbab5d3c'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    401,
    '2020-05-29 06:00:42',
    'Unauthorized access',
    'e09bfc7f-f7e5-4ef0-a94c-4b9fbbab5d3c'
);

insert into server_messages (
    status_code,
    time_stamp,
    message,
    server_id
) values (
    500,
    '2017-10-13 21:48:04',
    'Internal server error',
    'e09bfc7f-f7e5-4ef0-a94c-4b9fbbab5d3c'
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO serverstatus;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO serverstatus;