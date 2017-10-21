const users = require ('../models/users.js');
let id = 1

module.exports = {
    login: (req, res, next) => {
        const {username, password} = req.body;      
        const {session} = req;  
        const user = users.find(user => user.username ===username && user.password===password );
        if (user) {
            session.user.username = user.username;  //if a user info from login matches the info, session.user.username(cookie) is assigned to user.username.
            res.status(200).send(session.user);         //session.user assigns a cookie to a user
        } else {
            res.status(500).send('Unauthorized');
        }
    },
    register: (req, res, next) => {
        const{session} = req;
        const{username, password}=req.body; //take user's info from the login screen
        users.push({id, username, password }) //and push it to users array, later DB.
        id ++;                               // assign an ID
        session.user.username = username;   //Also, assign cookie to a username
        res.status(200).send(session.user);
    },
    signout: (req, res, next) => {
        const{session} = req;
        session.destroy();        //session.destroy will reset the cart, username, and total to 0, when signout.
        res.status(200).send(req.session);
    },
    getUser: (req, res, next) => {          //this method read the user's object off session and returns 200.
        const {session} = req;
        res.status(200).send(session.user);
    }
}