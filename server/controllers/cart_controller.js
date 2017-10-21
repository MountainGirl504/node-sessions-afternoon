const swag = require ('../models/swag.js');

module.exports = {
    //check if the swag is already in the cart
    //if it isn't add it to the cart and in crease the price
    //if it is, return the request session's user object
    //use request query to get an id:
    add: function (req, res, next) {
        const {id} = req.query;
        let {cart} = req.session.user;
        const index = cart.findIndex( swag => swag.id == id);
        //findIndex will return -1 if it isn't in the cart
        if ( index === -1) {
            const selectedSwag = swag.find (swag =>swag.id == id);
            cart.push(selectedSwag);
            req.session.user.total +=
            selectedSwag.price;
        }
        res.status(200).send (req.session.user);
    },
    //check if the swag is already in the cart
    //if it is, remove it from the cart and subtract the price
    //if it isn't, don't do anything 
    delete: function (req, res, next) {
        const {id} = req. query;
        const {cart}= req.session.user;
        const selectedSwag = swag.find (swag =>swag.id == id);
        
        if (selectedSwag) {
            const i = cart.findIndex (swag => swag.id == id);
            cart.splice (i,1);
            req.session.user.total -= selectedSwag.price;
        }
        res.status(200).send(req.session.user);
    },
    //reset the total of the cart to 0
    //aka resetting the value cart to an empty array
    checkout: function (req, res, next){
        const {user} = req.session; 
        user.cart = [];
        user.total = 0;

        res.status(200).send(req.session.user);
    }
}