const express = require ('express'),
    bodyParser=require('body-parser'),
    session = require ('express-session'), 
    port = 3000,
    app = express(),
    checkForSession = require ('./middlewares/checkForSession'),
    swag_controller = require ('./controllers/swag_controller'),
    auth = require ('./controllers/auth_controller.js')

app.use(bodyParser.json());
   
app.use(session({
    secret: 'xxxxx',
    resave: false,
    saveUninitialized: false 
}));

app.use( checkForSession );
app.use( express.static( `${__dirname}/../public/build` ) ); //cuz we are running server and client on the same server

app.get( '/api/swag', swag_controller.read);        //WHAT DOES THIS DO???

app.post('/api/login', auth.login);
app.post('/api/register', auth.register);
app.post('/api/signout', auth.signout);
app.get('/api/user', auth.getUser);


app.listen(port, () => console.log(`Listening on port ${port}`));