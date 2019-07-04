require('dotenv').config()
const express = require('express')
const massive = require('massive')
const app = express()
const {SERVER_PORT, CONNECTION_STRING} = process.env
const ctrl = require('./products_controller')


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})
    .catch(err => console.log(err))

app.use(express.json())

app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.post('/api/products', ctrl.create)
app.delete('/api/products/:id', ctrl.delete)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
})