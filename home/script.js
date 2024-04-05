const cnpjCpf = document.getElementById('cnpjCpf');
const nome = document.getElementById('nome');
const btnSave = document.getElementById('btn-save');
const btnDelete = document.getElementById('btn-delete');

function cadastrar() {

    fetch("http://localhost:8080/form/cadastrar",   
        {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                cnpjCpf: cnpjCpf.value,
                nome: nome.value
            })
        })
        .then((res) => console.log(res))
        .catch(error => console.error('Error:', error))
}

function autoComplete() {
        
    fetch(`http://localhost:8080/form/complete/${cnpjCpf.value}`,   
        {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
        .then((res) => res.text())
        .then((response) => nome.value = response)
        .catch(error => console.error('Error:', error))
}

function deletar() {

    fetch(`http://localhost:8080/form/${cnpjCpf.value}`,   
        {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify({
                cnpjCpf: cnpjCpf.value,
                nome: nome.value
            })
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
}

function limpar() {
    nome.value = "";
    cnpjCpf.value = "";
}

btnSave.addEventListener('click', (event) => {
    event.preventDefault();
    if (cnpjCpf.value == "") {
        alert("CNPJ/CPF é um campo obrigatório.");
    } else if (cnpjCpf.value.length < 11 || cnpjCpf.value.length > 14) {
        alert("O campo CNPJ/CPF deve ser preenchido com 11 dígitos para CPF ou 14 dígitos para CNPJ.");
    } else {
        cadastrar();
        limpar();
    } 
});

btnDelete.addEventListener('click', (e) => {
    e.preventDefault();
    if (cnpjCpf.value == "") {
        e.preventDefault();
        alert("Informe o CNPJ/CPF que deseja deletar.");
    }
    deletar();
    limpar();
});

cnpjCpf.addEventListener('keydown', (e) => {
    if (e.code == "Enter" || e.code == "Tab") {
        e.preventDefault();
        autoComplete();   
    }
});