
select * 
from inventory
where rented = false and category = $1
and
(city = $2
or
zipcode = $3)
and owner_id != $4



