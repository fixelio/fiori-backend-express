const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const orders = require('./mock/orders.mock')

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send("Welcome to RenderExpress Test Service")
})

app.get('/orders', (req, res) => {
  res.json(orders)
})

app.get('/orders/:id', (req, res) => {
  const id = Number(req.params.id)
  const order = orders.find(order => order.id === id)

  if (!order) {
    return res.status(404).json({ message: 'Order not found' })
  }

  res.json(order)
})

app.get('/orders/status/:status', (req, res) => {
  const { status } = req.params
  const order = orders.filter(order => order.status === status)
  res.json(order)
})

app.post('/orders', (req, res) => {
  const order = req.body
  orders.push(order)
  res.json(order)
})

app.put('/orders/:id', (req, res) => {
  const id = Number(req.params.id)
  const order = req.body
  const index = orders.findIndex(order => order.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Order not found' })
  }

  orders[index] = order
  res.json(order)
})

app.delete('/orders/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = orders.findIndex(order => order.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Order not found' })
  }

  orders.splice(index, 1)
  res.json({ message: 'Order deleted' })
})

app.listen(port, () => {
  console.log('Server listening on port 3000')
})