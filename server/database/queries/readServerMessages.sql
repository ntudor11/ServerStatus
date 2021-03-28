select
    sm.id as "msgId",
    sm.status_code as "status",
    sm.time_stamp as "time",
    sm.message
from server_messages sm
join servers s
on s.id = sm.server_id
    where s.id = $1;