import * as webservice from './webservice.js'
window.addEventListener('load', init)

function init(event) {
    event.preventDefault();
    let btnSalvar = document.querySelector('#btnSalvar')
    btnSalvar.addEventListener('click', fazCadastro)
}

function fazCadastro(event) {
    event.preventDefault();
    let form = document.forms['userForm'];
    let nome = form.nome.value;
    let email = form.email.value;
    let senha = form.senha.value;
    

    let result = webservice.cadastrar(nome, email, senha);
    
}

