import { consulta } from '../database/conexao.js'

// funções responsaveis pela manipulação dos dados pegos no banco de dados 
class SelecaoRepository {
  // CRUD
  create(pessoas) { // cadastrar na tabela
    const sql = 'INSERT INTO pessoas SET ?;' // instrução SQL
    return consulta(sql, pessoas, 'Não foi possivel cadastrar...')
  }

  findAll() { // encontrar tudo da tabela
    const sql = 'SELECT * FROM pessoas;' // instrução SQL
    return consulta(sql, 'Não foi possivel Vizualizar...')
  }

  findById(id) { // encontrar por id na tabela
    let sql = `SELECT * FROM pessoas WHERE id = ?;`
    return consulta(sql, id, 'Não foi possivel Selecionar por ID...')
  }

  update(pessoas, id) { // atualizar por id na tabela
    let sql = 'UPDATE pessoas SET ? WHERE id = ?;' // instrução sql
    return consulta(sql, [pessoas, id], 'Não foi possivel Atualizar...')
  }

  delete(id) { // deletar por id na tabela
    const sql = 'DELETE FROM pessoas WHERE id = ?;'
    return consulta(sql, id, 'Não foi possivel Deletar...')
  }

}

export default new SelecaoRepository()
