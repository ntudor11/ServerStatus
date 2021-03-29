select id, email, user_type as "userType", password
    from users
    where email = $1;