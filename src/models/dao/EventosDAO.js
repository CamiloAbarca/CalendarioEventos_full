class EventosDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, titulo, contenido FROM eventos')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, titulo, contenido FROM eventos WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (evento) {
    const response = await this.db.query('INSERT INTO eventos (titulo, contenido) VALUES (?, ?)', [evento.titulo, evento.contenido])
    const result = response[0]
    return result.insertId
  }

  async update (evento) {
    const response = await this.db.query('UPDATE eventos SET titulo = ?, contenido = ? WHERE id = ?', [evento.titulo, evento.contenido, evento.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM eventos WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = EventosDAO
