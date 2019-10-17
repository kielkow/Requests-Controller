const express = require('express')

const routes = express.Router()

const pedidos = [
  {
    "id_cst_pedido": 5,
    "nr_pedido": 512,
    "vl_total": 1.55,
    "dt_created": "2019-03-01 13:56:40",
    "id_usercreated": null,
    "dt_updated": "2019-08-14 11:01:36",
    "id_userupdated": 188,
    "ds_recordthumbprint": "E3F6DCA0-AC22-4FA7-A364-31EA191C8AA7"
  },
  {
    "id_cst_pedido": 68,
    "nr_pedido": 1234,
    "vl_total": 1.50,
    "dt_created": "2019-08-09 15:19:45",
    "id_usercreated": 188,
    "dt_updated": null,
    "id_userupdated": null,
    "ds_recordthumbprint": "1F18889F-6639-4ED3-82B4-DEA91AB6A870"
  },
  {
    "id_cst_pedido": 69,
    "nr_pedido": 101,
    "vl_total": 2323.00,
    "dt_created": "2019-08-09 15:21:43",
    "id_usercreated": 188,
    "dt_updated": "2019-08-13 21:53:08",
    "id_userupdated": 188,
    "ds_recordthumbprint": "18B7A126-876B-45D9-A878-F90BD2EB99B0"
  },
  {
    "id_cst_pedido": 72,
    "nr_pedido": 111,
    "vl_total": 555.00,
    "dt_created": "2019-08-12 14:51:22",
    "id_usercreated": 188,
    "dt_updated": "2019-08-13 21:50:49",
    "id_userupdated": 188,
    "ds_recordthumbprint": "5FDF3EB3-9A1A-4D01-97AF-23C687664F5A"
  },
  {
    "id_cst_pedido": 113,
    "nr_pedido": 1010,
    "vl_total": 11.00,
    "dt_created": "2019-08-13 22:20:11",
    "id_usercreated": 188,
    "dt_updated": "2019-08-14 10:11:15",
    "id_userupdated": 188,
    "ds_recordthumbprint": "13D28CE7-1370-4F49-8204-B8E5FEFBE73A"
  },
  {
    "id_cst_pedido": 130,
    "nr_pedido": 121,
    "vl_total": 21212.00,
    "dt_created": "2019-08-14 12:13:04",
    "id_usercreated": 188,
    "dt_updated": "2019-08-14 12:13:18",
    "id_userupdated": 188,
    "ds_recordthumbprint": "AFA5F2E8-135A-4777-AB07-BB6EBA482FA1"
  }
]
//Middleware Global
routes.use((req, res, next) => {
  console.log(`URL: ${req.url} || Method: ${req.method}`)
  next()
})

//Check if id´s project exists
function checkIdExists(req, res, next){
  console.log('Passou pelo middleware')
  const pedido = pedidos.find(pedido => pedido.id_cst_pedido == req.params.id);
  if (!pedido) return res.status(400).json({ error: 'Pedido not found' });
  return next();
}

//Lista pedidos
routes.get('/pedidos', (req, res) => {
  return res.json(pedidos)
}) 

//Add pedido
routes.post('/pedidos', (req, res) => {
  pedidos.push(req.body)
  return res.json(pedidos)
})

//Consulta pedido
routes.get('/pedidos/:id', checkIdExists, (req, res) => {
  const pedido = pedidos.find(pedido => pedido.id_cst_pedido == req.params.id);
  return res.json(pedido)
})

//Deleta pedido
routes.delete('/pedidos/:id', checkIdExists, (req, res) => {
  pedidos.map((pedido) => {
    if(pedido.id_cst_pedido == req.params.id){
      pedidos.splice(pedidos.indexOf(pedido), 1)
      return res.json(pedidos)
    }
  })
})

//Editar pedidos
routes.put('/pedidos/:id', checkIdExists, (req, res) => {
  pedidos.map((pedido) => {
    if(pedido.id_cst_pedido == req.params.id){
      pedido.nr_pedido = req.body.nr_pedido
      pedido.vl_total = req.body.vl_total
      return res.json(pedidos)
    }
  })
})

module.exports = routes