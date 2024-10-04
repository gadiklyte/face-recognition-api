const express = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
      connectionString: 'postgresql://face_recognition_db_w77g_user:tNZhfKYw5WEAldZIUeOmBYSRA2AF8T4o@dpg-cruj87btq21c738jp0t0-a/face_recognition_db_w77g',
      ssl: { rejectUnauthorized: false },
      host: 'dpg-cruj87btq21c738jp0t0-a',
      port: 5432,
      user: 'face_recognition_db_w77g_user',
      password: 'tNZhfKYw5WEAldZIUeOmBYSRA2AF8T4o',
      database: 'face_recognition_db_w77g',
    },
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('success') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex) })
app.put('/image', (req, res) => { image.handleImage(req, res, knex) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
