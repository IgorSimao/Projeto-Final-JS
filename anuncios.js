import * as webservice from './webservice.js'
window.addEventListener('load', init);
var idAnuncioEditar = '';
function init() {
    
    let btnCadastrar = document.querySelector("#cadastrar")
    btnCadastrar.addEventListener("click", criarAnuncio)
    let btnSair = document.querySelector("#logout")
    btnSair.addEventListener("click", logout)
    let btnEditar = document.querySelector("#editar")
    btnEditar.addEventListener("click", editarAnuncios)
    if(getCookie() == null || getCookie() == ""){
        alert("Faça o Login novamente!")
        window.location.href = "index.html"
        
    }
    else{
       let result =  webservice.pegaAnuncios(getCookie())
       console.log("Resultado: ")
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

function criarAnuncio(ev) {
    ev.preventDefault();
    let form = document.forms['criarAnuncio']
    let titulo = form.titulo.value;
    let descricao = form.descricao.value;
    let preco = form.preco.value;
    let token = getCookie();

    if(titulo != "" && descricao != "" && preco != ""){
        let result = webservice.criaAnuncios(titulo, descricao, preco, token);
    }
    else{
        alert("Verifique o preenchimento dos campos!")
    }
    

    
}


export function mostraAnuncios(data) {
    let tabela = document.querySelector("#tAnuncios tbody");

    tabela.innerHTML = "";

    for(let i=0; i<data.length; i++){
        let anuncio = data[i]
        tabela.innerHTML += `
        <tr anuncioId="${anuncio.id}">
            <td class="${anuncio.id}">${anuncio.id}</td>
            <td class="${anuncio.id}">${anuncio.titulo}</td>
            <td class="${anuncio.id}">${anuncio.descricao}</td>
            <td class="${anuncio.id}">${"R$" + anuncio.preco +",00"}</td>
            <td><button class="bt-editar" anuncioId="${anuncio.id}">Editar</button><button class="bt-remover" anuncioId="${anuncio.id}">Remover</button></td>
        </tr>
    `;
    }

    let listaBtRemove = document.querySelectorAll(".bt-remover");
    for(let i=0; i<listaBtRemove.length; i++){
        listaBtRemove[i].addEventListener('click', removeAnuncio);
    }

    let listaBtEditar = document.querySelectorAll(".bt-editar");
    for(let i=0; i<listaBtEditar.length; i++){
        listaBtEditar[i].addEventListener('click', pegaAnunciosByIdWebservice);
    }

    console.log(data)
}

function removeAnuncio() {
let result = webservice.removeAnuncio(parseInt(this.getAttribute('anuncioId')), getCookie());
//   if(result) atualizarTabelaHTML();
}

function pegaAnunciosByIdWebservice() {
    webservice.pegaAnunciosByID(getCookie(), parseInt(this.getAttribute('anuncioId')));
    let btnCadastrar = document.querySelector("#cadastrar")
    btnCadastrar.style.display = "none";
    document.querySelector('.titulo').innerHTML = "Editar Anúncios"
    
}
export async function preencheAnunciosEditar(data) {
    let form = document.forms['criarAnuncio']
    idAnuncioEditar = data.id;
    form.titulo.value = data.titulo;
    form.descricao.value = data.descricao;
    form.preco.value = data.preco;
    let btnEditar = document.querySelector("#editar")
        btnEditar.style.display = "block";
    
}

function editarAnuncios() {
    let form = document.forms['criarAnuncio']
    let titulo = form.titulo.value
    let descricao = form.descricao.value
    let preco = form.preco.value

    let result = webservice.editarAnuncio(idAnuncioEditar, titulo, descricao, preco, getCookie())

    if(result){
        let btnCadastrar = document.querySelector("#cadastrar")
        btnCadastrar.style.display = "block";
        let btnEditar = document.querySelector("#editar")
        btnEditar.style.display = "none";
        document.querySelector('.titulo').innerHTML = "Cadastrar Anúncios"
    }
}

export function limpaForm() {
    let form = document.forms['criarAnuncio'];
    form.reset();
}

function logout() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.location.href = "./index.html"
}

