-- An insert into requests table with params from inventory table

insert into requests (item_id, owner_id, borrower_id, approved, pending, request_message)
values ($1, $2, $3, $4, $5, $6)

returning *