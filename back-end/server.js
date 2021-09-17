const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pool = require('./db')

const app = express()
app.use(cors('*'))
app.use(bodyParser.json())

const home = require('./routes/home')

app.use('/', home)

app.listen(4000, '0.0.0.0', ()=>{
    console.log('media server started on port 4000')
})