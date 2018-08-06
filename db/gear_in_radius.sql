SELECT *, point($1, $2)
<@>
point(lng, lat)::point AS item_distance
FROM inventory
WHERE (point($1, $2) 
<@> point(lng, lat)) < $4 AND category = $3
ORDER by item_distance;x