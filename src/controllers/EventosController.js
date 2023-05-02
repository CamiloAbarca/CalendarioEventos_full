const EventosDAO = require("../models/dao/EventosDAO")

class EventosController {
  constructor (db) {
    this.eventosDao = new EventosDAO(db)
    this.renderHomeWithEventos = this.renderHomeWithEventos.bind(this)
    this.renderSingleEvento = this.renderSingleEvento.bind(this)
    this.renderEventoCreationForm = this.renderEventoCreationForm.bind(this)
    this.renderEventoUpdateForm = this.renderEventoUpdateForm.bind(this)
    this.insertAndRenderEvento = this.insertAndRenderEvento.bind(this)
    this.updateAndRenderEvento = this.updateAndRenderEvento.bind(this)
    this.deleteEventoAndRenderResponse = this.deleteEventoAndRenderResponse.bind(this)
  }

  async renderHomeWithEventos (req, res) {
    const eventos = await this.eventosDao.getAll()
    res.render('home', {
      eventos
    })
  }

  async renderSingleEvento (req, res) {
    const id = req.params.id

    const evento = await this.eventosDao.getById(id)

    res.render('evento', {
      id,
      titulo: evento.titulo,
      contenido: evento.contenido
    })
  }

  renderEventoCreationForm (req, res) {
    res.render('evento-form')
  }

  async renderEventoUpdateForm (req, res) {
    const id = req.params.id

    const evento = await this.eventosDao.getById(id)

    res.render('evento-form', {
      id,
      titulo: evento.titulo,
      contenido: evento.contenido
    })
  }

  async insertAndRenderEvento (req, res) {
    const titulo = req.body.titulo
    const contenido = req.body.contenido

    const evento = { titulo, contenido }

    const id = await this.eventosDao.create(evento)

    res.redirect(`/eventos/${id}`)
  }

  async updateAndRenderEvento (req, res) {
    const id = req.params.id
    const titulo = req.body.titulo
    const contenido = req.body.contenido

    const evento = { titulo, contenido, id }

    await this.eventosDao.update(evento)

    res.redirect(`/eventos/${id}`)
  }

  async deleteEventoAndRenderResponse (req, res) {
    const id = req.params.id

    const evento = await this.eventosDao.getById(id)

    await this.eventosDao.delete(id)

    res.render('evento-deleted', {
      id,
      titulo: evento.titulo
    })
  }
}
module.exports = EventosController
