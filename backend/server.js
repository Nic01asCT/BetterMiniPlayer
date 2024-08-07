require('dotenv').config()

const cors = require('cors')
const express = require('express')

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

const tokenController = require('./routes/token/token')

app.use('/api/token', tokenController)

app.get('/test', (req, res) => {
    res.status(200).send('trust')
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})