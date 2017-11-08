

insert into messagestable (senderid, receiverid, message, item, date, viewed)
    values ($1, $2, $3, $4, $5, false)