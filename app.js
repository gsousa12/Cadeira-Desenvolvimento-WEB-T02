let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("mensagemDeErro");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tarefas");
let add = document.getElementById("adicionarForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

// Verificar se o usuário está digitando dentro do form (Titulo da Tarefa)
let formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Nome da tarefa não pode ficar em branco";
  } else {
    console.log("Sucesso na validação");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal"); // Remove o modal da tela assim que clikar no botao add
    add.click();

    // IIFE para resetar o atributo (corrige o bug de deixar passar o titulo em branco apos add uma tarefa)
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// Coletar dados digitados no form
let data = {};
let acceptData = () => {
  data["text"] = textInput.value;
  data["date"] = dateInput.value;
  data["description"] = textarea.value;

  createTasks();
};

// Insere as tarefas na tela principal
let createTasks = () => {
  tasks.innerHTML += `
    <div>
        <span class="fw-bold">${data.text}</span>
        <span class="small text-secondary">${data.date}</span>
        <p>${data.description}</p>

        <span class="opcoes">
            <i onClick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
            <i onClick = "deleteTask(this)" class="fa-solid fa-trash"></i>
        </span>
    </div>
    `;

  resetForm();
};

// Resetar formulário
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// Deletar task
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
};

// Editar tormulario
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  selectedTask.remove();
};
