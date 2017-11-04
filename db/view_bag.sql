select * from inventory

where owner_id = $1




-- select inventory.itemid, inventory.item_name, inventory.rented, requests.borrower_id, inventory.owner_id  from inventory
-- join requests on requests.owner_id = inventory.owner_id
-- where inventory.owner_id = $1





-- select * from inventory
-- join requests on requests.borrower_id = users.userid
-- where owner_id = $1