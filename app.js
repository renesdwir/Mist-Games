const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'postgres',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        sameSite: true
    }
  }))