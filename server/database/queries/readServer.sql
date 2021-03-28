select
    id,
    name as "serverName",
    server_status as "serverStatus",
    status_time_started as "statusTimeStarted",
    avg_uptime as "avgUptime",
    ip as "ipAddress"
from servers
where id = $1;