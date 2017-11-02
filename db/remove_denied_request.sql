delete from requests
-- (this.props.user.userid) = $1
where borrower_id = $1 
and item_id = $2;

update inventory
set rented = false

where itemid = $2;