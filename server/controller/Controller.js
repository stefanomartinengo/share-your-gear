
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

    addGear: (req,res,next) => {
        console.log(req.body)
        const dbInstance = req.app.get('db');
        const { item_name, owner_id, image_url, item_description, category, city, zipcode } = req.body;

        dbInstance.add_bag([item_name, owner_id, image_url, item_description, category, city, zipcode])
        .then( (response) => res.status(200).send(response))
        .catch( (response) => res.status(500).send('ugh man'))
    }

}