select * 
from inventory
where rented = false and (category = $1
and
owner_id != $2)