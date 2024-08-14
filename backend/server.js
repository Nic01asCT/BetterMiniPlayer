require('dotenv').config()

const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
.use(cors({
    origin: 'https://bmpapi.nicolasthoeni.com'
}))
.use(cookieParser())

const tokenController = require('./routes/token/token')

app.use('/api/token', tokenController)

app.get('/test', (req, res) => {
    res.status(200).send('trust')
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})