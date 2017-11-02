
-- pre approved
select inventory.item_name, requests.pending, inventory.rented, requests.approved, inventory.image_url, users.first_name, requests.item_id 
from requests
join inventory on inventory.itemid = requests.item_id
join users on users.userid = requests.owner_id
where requests.borrower_id = $1

-- 

-- THIS IS THE OUTGOING REQUESTS
-- inventory.item_name, inventory.image_url, users.first_name, requests.item_id