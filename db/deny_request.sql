UPDATE requests
set pending = false,
approved = false

where item_id = $1;

update inventory
set rented = false

where itemid = $1;

