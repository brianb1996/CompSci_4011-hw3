const superagent = require('superagent')
const cors = require('./middleware/cors')
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const removePoweredBy = require('./middleware/removePoweredBy')
const Pokemon = require('./services/Pokemon')

app.options('*', cors.corsOptionsRequests)
app.use(cors.corsSimpleRequests)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(removePoweredBy)

app.post('/pokemon', Pokemon)

// app.post('/post', (req, res) => {
//     console.log(req.body)
//     //res.send(`${req.body.info}`)
// })

app.listen(port, () => {
    console.log(Pokemon)
})