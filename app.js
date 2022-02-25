const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const session = require('express-session')
const router = require('./routes/index')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));

app.use(session({
    secret: 'postgres',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

app.use('/', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})