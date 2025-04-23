let inputTarefas = document.getElementById('inputs-tarefas');
let addTarefasBotao = document.getElementById('add-tarefas');
let listaTarefas = document.getElementById('lista-tarefas');
let filtrosBotoes = document.querySelectorAll('.filtros-btn');
let tarefas = [];

// Carrega as tarefas salvas
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }
}

// Função para salvar tarefas
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para aparecer a lista de tarefas
function aparecerTarefa(filtro = 'todas') {
    listaTarefas.innerHTML = '';
    const filtrotarefas = tarefas.filter(tarefa => {
        if (filtro === 'todas') return true;
        if (filtro === 'feitas') return tarefa.feita;
        if (filtro === 'pendentes') return !tarefa.feita;
    });

    filtrotarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        if (tarefa.feita) li.classList.add('feitas'); // Adiciona a classe 'feitas' se a tarefa for concluída

        // Adiciona o nome da tarefa, botão de deletar e botão para marcar como feita
        li.innerHTML = `
            <span onclick="alternarTarefa(${index})">${tarefa.nome}</span>
            <button onclick="deletarTarefa(${index})">X</button>
            <button onclick="marcarFeita(${index})">${tarefa.feita ? 'Desmarcar' : 'Marcar Feita'}</button>
        `;
        listaTarefas.appendChild(li);
    });
}

// Função de adicionar novo item
addTarefasBotao.addEventListener('click', () => {
    const tarefaNome = inputTarefas.value.trim();
    if (tarefaNome) {
        const novaTarefa = {nome: tarefaNome, feita: false};
        tarefas.push(novaTarefa);
        inputTarefas.value = '';
        salvarTarefas();
        aparecerTarefa();
    }
});

// Função para alternar entre tarefa feita e pendente
function alternarTarefa(index) {
    tarefas[index].feita = !tarefas[index].feita;
    salvarTarefas();
    aparecerTarefa();
}

// Função para marcar tarefa como feita ou desfeita
function marcarFeita(index) {
    tarefas[index].feita = !tarefas[index].feita;
    salvarTarefas();
    aparecerTarefa();
}

// Função para deletar item
function deletarTarefa(index) {
    tarefas.splice(index, 1); // Remove a tarefa da lista
    salvarTarefas();
    aparecerTarefa();
}

// Função para apagar todas as tarefas
function apagarTodasTarefas() {
    const confirmar = confirm("Você tem certeza de que quer apagar todas as tarefas?");
    if (confirmar) {
        tarefas = []; // Limpa a lista de tarefas
        salvarTarefas(); // Salva a lista vazia no localStorage
        aparecerTarefa(); // Atualiza a lista de tarefas na tela
    }
}

// Filtrar tarefas (todas, feitas, pendentes)
filtrosBotoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const filtro = botao.getAttribute('data-filtro');
        aparecerTarefa(filtro);
    });
});

//musica de fundo
document.getElementById("toggle-musica").addEventListener("click", () => {
    const audio = document.getElementById("musica-ambiente");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

// Adiciona o evento de clique no botão para apagar todas as tarefas
document.getElementById('apagar-todas').addEventListener('click', apagarTodasTarefas);

// Inicialização
salvarTarefas();
carregarTarefas();

