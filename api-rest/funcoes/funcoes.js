// função que retorna o elemento correspondente ao ID dentro do array
function selecionarParametrosPorId(id) {
  return selecoes.filter(item => item.id == id)
}
// retorna a posição ou indice do elemento dentro do array
function buscarIndexSelecao(id) {
  return selecoes.findIndex(item => item.id == id)
}

export {
  selecionarParametrosPorId,
  buscarIndexSelecao,
}