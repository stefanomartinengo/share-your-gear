UPDATE requests
set pending = false,
approved = true

where item_id = $1;

update inventory
set rented = true

where itemid = $1;