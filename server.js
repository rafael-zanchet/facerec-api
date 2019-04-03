const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'root',
      database : 'facerec'
    }
});



const app = express();

app.use(bodyParser.json());
app.use(cors());

/*
db.select('*').from('users').then(data =>{
    console.log(data);
});

const database = {
    users: [
        {
            id: '123',
            name: 'Rafael',
            email: 'rafael',
            password: 'rafael',
            entries: 2,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Tatiana',
            email: 't_baccarat@hotmail.com',
            password: 'tatiana',
            entries: 1,
            joined: new Date()
        }
    ]


}*/

app.get('/', (req, res) => {res.send('ok')});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});





app.listen(3000, () => {
    console.log('app rodando na porta 3000');
});