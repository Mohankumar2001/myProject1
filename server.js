const express = require('express')
const app = express();

const dotenv = require('dotenv')
dotenv.config({ path: './.env'})

const path = require('path');
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(cookieParser());


const mysql = require('mysql')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect( (error) => {
    if(error) {
        console.log(error)
    }
    else {
        console.log('connected to database///')
    }
})
// const users = []

app.set('view-engine', 'hbs')

app.use('/', require('./routes/pages'));

app.use('/auth', require('./routes/auth'))

// app.get('/', (req, res) => {
//     res.render('index.ejs', { name: "mohan"})
// })

// app.get('/login', (req, res) => {
//     res.render('login.ejs')
// })
// 
// app.get('/signup', (req, res) => {
//     res.render('signup.ejs')
// })

// app.post('/signup', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         users.push( {
//             id : Date.now().toString(),
//             name : req.body.name,
//             email: req.body.email,
//             password: hashedPassword
//         })
//         res.redirect('/login')
//     }
//     catch {
//         res.redirect('/')
//     }
//     console.log(users)

// })

app.listen(3000, ()=> {
    console.log("running on port 3000")
})