import * as webservice from './webservice.js'
window.addEventListener('load', init);

function init() {
    let btnCadastrar = document.querySelector('#cadastrar')
    btnCadastrar.addEventListener('click', telaCadastro);
    let btnEntrar = document.querySelector('#entrar');
    btnEntrar.addEventListener('click', entrar);
    if(getCookie() != null){
        window.location.href='/anuncios.html';
    }

    
}

function telaCadastro() {
    window.location.href='/cadastro.html';
}

function entrar(event){
    event.preventDefault();
    let login = document.querySelector("#login").value
    let senha = document.querySelector("#senha").value

    if(login != "" && senha != ""){
        let result = webservice.entrar(login, senha);
        console.log(result)
    }else{
        alert("Verifique o preenchimento dos campos!")
    }

}

    

function getCookie() {
    var cookies = " " + document.cookie;
    var key = " " + "token=";
    var start = cookies.indexOf(key);

    if (start === -1) return null;

    var pos = start + key.length;
    var last = cookies.indexOf(";", pos);

    if (last !== -1) return cookies.substring(pos, last);
    return cookies.substring(pos);

}





