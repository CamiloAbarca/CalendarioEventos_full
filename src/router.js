const express = require('express')
const PageController = require('./controllers/PageController')
const EventosController = require('./controllers/EventosController')
const SqlClient = require('./lib/SqlClient')
const EventosDAO = require('./models/dao/EventosDAO.js')

const router = express.Router()

// Database Client

const sqlClient = new SqlClient()

const eventosDao = new EventosDAO(sqlClient)

eventosDao.getAll().then(rows => console.log(rows))

// Controllers
const pageController = new PageController()
const eventosController = new EventosController(sqlClient)

// Routes
router.get('/', eventosController.renderHomeWithEventos)
router.get('/about', pageController.renderAbout)

router.get('/eventos/create', eventosController.renderEventoCreationForm)
router.post('/eventos/create', eventosController.insertAndRenderEvento)

router.get('/eventos/:id', eventosController.renderSingleEvento)

router.get('/eventos/:id/update', eventosController.renderEventoUpdateForm)
router.post('/eventos/:id/update', eventosController.updateAndRenderEvento)

router.post('/eventos/:id/delete', eventosController.deleteEventoAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
