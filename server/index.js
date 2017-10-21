const express = require ('express'),
    bodyParser=require('body-parser'),
    session = require ('express-session'), 
    port = 3000,
    app = express(),
    checkForSession = require ('./middlewares/checkForSession'),
    swag_controller = require ('./controllers/swag_controller'),
    auth = require ('./controllers/auth_controller.js'),
    cart_controller = require ('./controllers/cart_controller.js'),
    search_controller = require ('./controllers/search_controller.js')

app.use(bodyParser.json());  
app.use(session({
    secret: 'xxxxx',
    resave: false,
    saveUninitialized: false 
}));
app.use( checkForSession ); //checks if there's a middleware
app.use( express.static( `${__dirname}/../public/build` ) ); //cuz we are running server and client on the same server
//SWAG
app.get( '/api/swag', swag_controller.read);        //WHAT DOES THIS DO???

//USER
app.post('/api/login', auth.login);
app.post('/api/register', auth.register);
app.post('/api/signout', auth.signout);
app.get('/api/user', auth.getUser);

//CART
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

//SEARCH SWAG
app.get('./api/search', search_controller.search)

app.listen(port, () => console.log(`Listening on port ${port}`));