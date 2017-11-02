select inventory.item_name, inventory.rented, requests.borrower_id  from inventory, requests
join users on requests.borrower_id = users.userid
where requests.owner_id = $1
and
inventory.owner_id = $1





-- select * from inventory
-- join requests on requests.borrower_id = users.userid
-- where owner_id = $1