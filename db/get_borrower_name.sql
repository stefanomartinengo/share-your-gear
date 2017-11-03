select first_name from users
join requests on requests.borrower_id = users.userid
where requests.owner_id = $1