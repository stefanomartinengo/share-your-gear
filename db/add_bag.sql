insert into inventory (item_name, owner_id, image_url, item_description, category, city, zipcode, lat, lng, rented)

values($1, $2, $3, $4, $5, $6, $7, $8, $9, false)

returning *;