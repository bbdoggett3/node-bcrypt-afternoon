require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCrtl = require('./controllers/authControllers');

const app = express();
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json())
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}));

//ENDPOINTS 
app.post('/auth/register', authCrtl.register)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set("db", db)
    console.log("Database is connected")
    app.listen(SERVER_PORT, () => console.log(`Server is listening on ${SERVER_PORT}`));
})


