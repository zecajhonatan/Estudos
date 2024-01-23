let mysql = require('mysql2/promise')

let client = mysql.createPool(process.env.CONNECTION_STRING)

// CREATE
async function createCustomers(customer) {
  // MANEIRA DE CRIAR DADOS NO BANCO DE DADOS
  let values = [customer.nome, customer.sobreNome, customer.idade, customer.sexo]
  await client.query("INSERT INTO customes (nome, sobreNome, idade, sexo) VALUES (?, ?, ?, ?)", values)

  // MANEIRA DE CRIAR DADOS UTILIZANDO MEMORIA
  // customers.push(customer)
}

// READE
async function readCustomers() { // LER CLIENTES

  // MANEIRA DE LER DADOS NO BANCO DE DADOS  
  let results = await client.query("SELECT * FROM customes;")
  return results[0]

  // MANEIRA DE LER DADOS EM MEMORIA
  // return customers
}

// READE BY ID
async function selectById(id) {
  // MANEIRA DE LER UM DADO DO BANCO DE DADOS UTILIZANDO O ID COMO COMPARAÇÃO 
  let res = parseInt(id)
  let results = await client.query("SELECT * FROM customes WHERE id = ?", res)
  return results[0]

  // MANEIRA DE LER UM DADO DA MEMORIA UTILIZANDO O ID COMO COMPARAÇÃO
  // return customers.find(c => c.id == id)
}

// UPDADE
async function updateCustomers(id, customer) {
  // MANEIRA DE ATUALIZAR OS DADOS DE UMA TABELA NO BANCO DE DADOS
  let values = [customer.nome, customer.sobreNome, customer.idade, customer.sexo, id]
  console.log(values)
  await client.query("UPDATE customes SET nome=?, sobreNome=?, idade=?, sexo=? WHERE id=?", values)

  // MANEIRA DE ATUALIZAR OS DADOS EM MEMORIA
  // let customer = customers.find(c => c.id == id)
  // if (!customer) return
  // customer.nome = newCustomer.nome
  // customer.sobreNome = newCustomer.sobreNome
  // customer.idade = newCustomer.idade
  // customer.sexo = newCustomer.sexo
}

// DELETE
async function deleteCustomer(id) {
  // MANEIRA DE DELETAR UM DADO DO BANCO DE DADOS
  await client.query("DELETE FROM customes WHERE id = ?", id)

  // MANEIRA DE DELETAR UM DADO EM MEMORIA
  // let index = customers.findIndex(c => c.id == id)
  // customers.splice(index, 1)
}

module.exports = {
  createCustomers,
  readCustomers,
  selectById,
  updateCustomers,
  deleteCustomer
}