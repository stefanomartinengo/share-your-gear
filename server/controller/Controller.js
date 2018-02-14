

module.exports = {
    getGear: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.search([ req.query.category, req.query.userid])
        .then(  (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },

    expandSearch: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { category, userid } = req.query;

        dbInstance.expand_search([category, userid])
        .then(  (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
        
    },

    getRequests: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_requests(req.params.id)
        .then ( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },
    //get made requests for items
    getOutgoingRequests: (req,res, next) => {
        const dbInstance = req.app.get('db');

        //get sent requests
        dbInstance.get_pending(req.params.id)
        .then( (response) => res.status(200).send(response))   
        .catch( (err) => res.status(500).send(err))
    },

    getItemDetails: (req,res,next) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_item(req.params.id)
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },

    sendRequest: (req,res,next) => {
        const dbInstance = req.app.get('db');
        const {item_id, owner_id, borrower_id, approved, pending} = req.body;

        dbInstance.request([item_id,owner_id,borrower_id,approved,pending])
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },

    approve: (req,res,next) => {
        const dbInstance = req.app.get('db');

        dbInstance.approve_request(req.body.id)
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },

    deny: (req,res,next) => {
        const dbInstance = req.app.get('db')

        dbInstance.deny_request(req.body.id)
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err)) 
    },

    removeRequest: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { id, itemid } = req.body

        dbInstance.remove_denied_request([id, itemid])
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err)) 
    },

    viewBag: (req,res,next) => {
        const dbInstance = req.app.get('db');

        dbInstance.view_bag(req.params.id)
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },

    getBorrowerName: (req,res,next) => {
        const dbInstance = req.app.get('db');
        dbInstance.get_borrower_name(req.params.id)
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))    
    },
    
    addGear: (req,res,next) => {
        const dbInstance = req.app.get('db');
        const { item_name, owner_id, image_url, item_description, category, city, zipcode, lat, lng } = req.body;

        dbInstance.add_bag([item_name, owner_id, image_url, item_description, category, city, zipcode, lat, lng])
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },

    deleteGear: (req,res,next) => {
        const dbInstance = req.app.get('db');
        const {owner_id, itemid} = req.body;

        dbInstance.remove_gear([owner_id, itemid])
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },

    sendMessage: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { senderid, receiverid, message, item, date } = req.body

        dbInstance.send_message([senderid, receiverid, message, item, date])
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },

    getSentMessages: (req,res,next) => {
        const dbInstance = req.app.get('db')

        dbInstance.sent_messages(req.params.id)
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },

    getInbox: (req,res,next) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_all_messages(req.params.id)
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },

    deleteMessage: (req,res,next) => {
        const dbInstance = req.app.get('db')

        dbInstance.remove_message(req.body.id)
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },

    markViewed: (req,res,next) => {
        const dbInstance = req.app.get('db')
        
        dbInstance.mark_viewed(req.body.id)
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    },
    addAdventure: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { coordinator, title, duration, description, gear, people, images, coordinator_id} = req.body
        
        dbInstance.add_meetup([coordinator, title, duration, description, gear, people, images, coordinator_id])
        .then( (response) => res.status(200).send(response))
        .catch( (err) => res.status(500).send(err))
    }
}