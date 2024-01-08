const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

function adicionarTarefa(){
        minhaListaDeItens.push({
            tarefa: input.value,
            concluida: false
        })
        input.value = ''

        mostrarTarefas()
}

function deletarItem(posicao){

    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()
}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()
}

function recarregarTarefas(){
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage){
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    
    mostrarTarefas()
}



function mostrarTarefas(){

    let novaLi= ''

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi = novaLi + `
            <li class="task ${item.concluida && "done"}" >
                 <img src="./img/checked.png" alt="check-task" onclick="concluirTarefa(${posicao})">
                 <p>${item.tarefa}</p>
                 <img src="./img/trash.png" alt="task-trash" onclick="deletarItem(${posicao})">
            </li>
        `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}


recarregarTarefas()
button.addEventListener('click', adicionarTarefa)