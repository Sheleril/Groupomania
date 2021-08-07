//Appel des dépendances
const express = require('express');
const helmet = require('helmet');
//const rateLimit = require('express-rate-limit');
const sequelize = require('./config/dbconnect');
const path = require('path');

const app = express();

//Limite les requêtes dans un temps défini
//const limiter = rateLimit({
   //windowMs: 15 * 60 * 1000,
    //max: 100
//});


// Configuration de Body-Parser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

sequelize.authenticate()
    .then(() => console.log('Connexion établie'))
    .catch(error => console.error('Impossible de se connecter à la BDD', error))

sequelize.sync({ force: true })

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(helmet());
//app.use(limiter);


const routesUser = require('./routes/user');
const routesMessage = require('./routes/message');
const routeLike = require('./routes/like');
const routeComment = require('./routes/comment');

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/avatars', express.static(path.join(__dirname, 'avatars')))

app.use('/api/users', routesUser);
app.use('/api/messages', routesMessage);
app.use('/api/messages/', routeLike);
app.use('/api/messages', routeComment);

module.exports = app;