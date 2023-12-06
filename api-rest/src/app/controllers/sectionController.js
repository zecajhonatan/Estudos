import selecaoRepository from '../repositories/selecaoRepository.js'

class SectionController {

  // CREATE
  async store(request, response) {// solicita , resposta
    let pessoas = request.body // recebe dados do corpo da requisição 
    await selecaoRepository.create(pessoas)
    response.json("Cadastro feito com sucesso!!!")
  }

  // READ
  async index(request, response) { // assicrono
    let row = await selecaoRepository.findAll() // aguardar
    response.json(row)
  }

  // READ BY ID
  async show(request, response) { // assicrono
    let id = request.params.id
    let row = await selecaoRepository.findById(id) // aguardar
    response.json(row)
  }

  // UPDATE
  async update(request, response) {
    let pessoas = request.body
    let id = request.params.id
    let row = await selecaoRepository.update(pessoas, id)
    response.json(row)
  }

  // DELETE
  async delete(request, response) { // solicita , resposta ==> assicrona
    const id = request.params.id
    let row = await selecaoRepository.delete(id) // aguardar
    response.json(row)
  }
}

export default new SectionController()