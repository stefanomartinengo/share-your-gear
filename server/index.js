require('dotenv').config()
const express = require('express')
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , massive = require('massive')
  , passport = require('passport')
  , Auth0Strategy = require('passport-auth0')
  , session = require('express-session')
  , app = express()
  , controller = require('./controller/Controller.js')
  , PORT = 8080;

  app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());
massive(process.env.CONNECTION_STRING).then((db) => {
  app.set('db', db);
});

passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENTID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK
}, (accessToken, refreshToken, extraParams, profile, done) => {
  const db = app.get('db');
  const userData = profile._json;
  db.find_user([userData.identities[0].user_id])
    .then(user => {

      if (user[0]) {
        return done(null, user[0].userid);
      } else {
        db.create_user([
          userData.given_name,
          userData.family_name,
          userData.picture,
          userData.identities[0].user_id
        ]).then(user => {
          return done(null, user[0].userid);

        })
      }
    });
}))

passport.serializeUser(function (id, done) {
  done(null, id);

})

passport.deserializeUser(function (id, done) {
  app.get('db').find_session_user([id]).then(user => {
    done(null, user[0]) //puts information into req.user of user that is already logged in by this point
  })
  // done(null, id); //second param is put on req.user
})

//endpoints//

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/search',
  failureRedirect: '/'
}))

app.get('/auth/logout', (req, res) => {
  req.logOut(); //built in method that destroys the session
  res.redirect('http://localhost:3000/')
})

app.get('/auth/me', (req, res) => {
  if (req.user) {
    return res.status(200).send(req.user)
  } else {
    return res.status(401).send('Need to login dude')
  }
})

//CONTROLLER AND END POINTS

app.get('/search/gear/', controller.getGear)
app.get('/ownerrequests/:id', controller.getRequests)
app.get('/outbound/requests/:id', controller.getOutgoingRequests) //ougoing requests
app.get('/get/details/:id', controller.getItemDetails)

//send request
app.post('/send/request/', controller.sendRequest)

//APPROVE / DENY ------------------------------------------------------------
app.put('/approve', controller.approve)
app.put('/deny', controller.deny)

//VIEWBAG ---------------------------------------------------------------
app.get('/view/bag/:id', controller.viewBag)
app.get('/view/name/id:', controller.getBorrowerName)
app.post('/add/bag', controller.addGear)
app.delete('/delete/gear', controller.deleteGear)


// MESSAGE// ------------------------------------------------------------

app.get('/get/inbox/:id', controller.getInbox)
app.post('/send/message/', controller.sendMessage)
app.put('/mark/read', controller.markViewed)
app.delete('/delete/message', controller.deleteMessage)
//DELETE REQUEST ------------------------------------------------------------
app.delete(`/remove/request`, controller.removeRequest)

// STRIPE


// Only if you are using Browser history instead of hash
// const path = require('path')
// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// })
// require path

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));