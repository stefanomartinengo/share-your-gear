
module.exports = {
    getGear: (req, res, next) => {
        const dbInstance = req.app.get('db');
        // const { city, zipcode } = req;

    dbInstance.search([ req.query.category, req.query.city, req.query.zipcode, req.query.userid])
    .then(  (response) => res.status(200).send(response))
    .catch( (response) => res.status(500).send('blegh'))
    },

    getRequests: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;

        dbInstance.get_requests(params.id)
        .then ( (response) => res.status(200).send(response))
        .catch( (response) => res.status(500).send('blegh'))
    },

    getOutgoingRequests: (req,res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;

//get sent requests
        dbInstance.get_pending(params.id)
        .then( (response) => 
         res.status(200).send(response)  )
        
        .catch( (response) => res.status(500).send('flupper'))
    },

    getItemDetails: (req,res,next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;

        dbInstance.get_item(params.id)
        .then( (response) => res.status(200).send(response))
        .catch( (response) => res.status(500).send('flupper'))
    },

    sendRequest: (req,res,next) => {
        const dbInstance = req.app.get('db');

        dbInstance.request([
            req.body.item_id,req.body.owner_id,req.body.borrower_id
            ,req.body.approved,req.body.pending])
        .then( (response) => res.status(200).send(response))
        .catch( (response) => res.status(500).send('flupper'))
    },

    approve: (req,res,next) => {
        const dbInstance = req.app.get('db');

        dbInstance.approve_request(req.body.id)
        .then( (response) => res.status(200).send(response))
        .catch( (response) => res.status(500).send('flupper'))
    },

    deny: (req,res,next) => {
        const dbInstance = req.app.get('db')

        dbInstance.deny_request(req.body.id)
        .then( (response) => res.status(200).send(response))
        .catch( (response) => res.status(500).send('flupper')) 
    },

    removeRequest: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { id, itemid } = req.body
        console.log('is it getting to controller: ', id, itemid)
        dbInstance.remove_denied_request([id, itemid])
        .then( (response) => {
            console.log('updated database')
        res.status(200).send(response)})
        .catch( (response) => res.status(500).send('flupper')) 
    },

    viewBag: (req,res,next) => {
        const dbInstance = req.app.get('db');

        dbInstance.view_bag(req.params.id)
        .then( (response) => res.status(200).send(response))
        .catch( (response) => res.status(500).send('bleghface'))
    },

    getBorrowerName: (req,res,next) => {
        const dbInstance = req.app.get('db');
            console.log('anything? gotdamn')
        dbInstance.get_borrower_name(req.params.id)
        .then( (response) => {
            console.log('fuck the database')
        res.status(200).send(response)})
        .catch( (response) => res.status(500).send('bleghface'))    
    },
    
    addGear: (req,res,next) => {
        console.log(req.body)
        const dbInstance = req.app.get('db');
        const { item_name, owner_id, image_url, item_description, category, city, zipcode } = req.body;

        dbInstance.add_bag([item_name, owner_id, image_url, item_description, category, city, zipcode])
        .then( (response) => res.status(200).send(response))
        .catch( (response) => res.status(500).send('ugh man'))
    },

    deleteGear: (req,res,next) => {
        const dbInstance = req.app.get('db');
        const {owner_id, itemid} = req.body;

        dbInstance.remove_gear([owner_id, itemid])
        .then( (response) => res.status(200).send(response))
        .catch( (response) => res.status(500).send('ugh man'))
    },

    sendMessage: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { senderid, receiverid, message, item, date } = req.body

        dbInstance.send_message([senderid, receiverid, message, item, date])
        .then( (response) => {

        res.status(200).send(response)})
        .catch( (response) => res.status(500).send('ugh man'))
    },

    getInbox: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { params } = req
    
        dbInstance.get_all_messages(params.id)
        .then( (response) => {

        res.status(200).send(response)})
        .catch( (response) => res.status(500).send('ugh man'))
    },

    deleteMessage: (req,res,next) => {
        const dbInstance = req.app.get('db')

        dbInstance.remove_message(req.body.id)
        .then( (response) => {

            res.status(200).send(response)})
            .catch( (response) => res.status(500).send('ugh man'))
    },

    markViewed: (req,res,next) => {
        const dbInstance = req.app.get('db')
        
        dbInstance.mark_viewed(req.body.id)
        .then( (response) => {
            console.log(response)
            res.status(200).send(response)})
            .catch( (response) => res.status(500).send('ugh man'))
    },
    addAdventure: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { coordinator, title, duration, description, gear, people, images, coordinator_id} = req.body
        
        dbInstance.add_meetup([coordinator, title, duration, description, gear, people, images, coordinator_id])
        .then( (response) => {
            console.log(response)
            res.status(200).send(response)} )
            .catch( (response) => res.status(500).send('ugh man'))
    }
}