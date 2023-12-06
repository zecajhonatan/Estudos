let button = document.querySelector('.button-add-task')
let input = document.querySelector('.input-task')
let listaCompleta = document.querySelector('.list-task')

let minhaListaItens = []


function adicionarNovaTarefa() {

  if (input.value != '') {

    minhaListaItens.push({
      tarefa: input.value,
      concluido: false
    })

    input.value = ''
    mostrarTarefas()

  } else {
    alert('Adiciona uma Tarefa !!!')
  }

}

function mostrarTarefas() {
  
  let minhaLi = ''

  minhaListaItens.forEach((elemento, index) => {
    minhaLi = minhaLi +
      `<li class="task ${elemento.concluido && "done"}" >
      <img src="img/checked.png" alt="checked" onclick="concluirTarefa(${index})">
      <p>${elemento.tarefa}</p>
      <img src="img/trash.png" alt="trash" onclick="deletarItem(${index})">
      </li>`
  });
  listaCompleta.innerHTML = minhaLi

  localStorage.setItem('lista', JSON.stringify(minhaListaItens))
}

function concluirTarefa(index) {
  minhaListaItens[index].concluido = !minhaListaItens[index].concluido
  mostrarTarefas()
}

function deletarItem(index) {
  minhaListaItens.splice(index, 1)
  mostrarTarefas()
}

function recarregarTela() {
  let tarefaLocalEstorage = localStorage.getItem('lista')
  // console.log(tarefaLocalEstorage)

  if (tarefaLocalEstorage) {
    minhaListaItens = JSON.parse(tarefaLocalEstorage)
  }

  mostrarTarefas()
}
recarregarTela()

button.addEventListener('click', adicionarNovaTarefa)