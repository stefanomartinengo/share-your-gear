SELECT *
FROM requests
join inventory on inventory.itemid = requests.item_id
WHERE requests.owner_id = $1
AND requests.pending = true;

--  THIS IS THE RECEIVED REQUESTS