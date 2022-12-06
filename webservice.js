import * as anuncios from './anuncios.js'

const url = "http://161.35.113.202/";

export function cadastrar(nome, email, senha) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "nome": nome,
        "email": email,
        "senha": senha
    });

    var request = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url+"usuario", request)
    .then(response =>{
        if(response.status != 201){
            console.log("Erro ao cadastrar!")
        }  
        console.log(response)
        if(response.ok){
            window.location.href = "/index.html";
        }
        return response.json();
    })
    .then(result => {
        // alert("Usuário cadastrado com sucesso!")
        alert(result.msg)
    })
    .catch(error => alert('error', error));
}

export function entrar(email, senha){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "senha": senha
    });

    var request = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    fetch(url+"login", request)
    .then(response =>{
        if(response.status != 200){
            console.log("Erro ao fazer Login!")
        }
        return response.json();

    })
    .then(data => {
        
        if(data.token != null){
            document.cookie = 'token='+ data.token +'; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/';
            window.location.href = "/anuncios.html";
        }else{
            alert(data.msg)
        }
        
        })
    .catch(error => console.log('error', error));

    
}

export function pegaAnuncios(token) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var request = {
        method: 'GET',
        headers: myHeaders,
        // body: raw,
        
    };



    fetch(url+"anuncios", request)
    .then(response =>{
        if(response.status != 200){
            alert("Erro ao carregar seus anúncios!")
        }
        console.log(response)
        return response.json();

    })
    .then(data => {
        anuncios.mostraAnuncios(data)
        
        })
    .catch(error => console.log('error', error));
}

export function criaAnuncios(titulo, descricao, valor, token) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
        "titulo": titulo,
        "descricao": descricao,
        "preco": valor
    });

    var request = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    

    fetch(url+"anuncios", request)
    .then(response =>{
        if(response.status != 201){
            alert("Erro ao exibir os anúncios!")
        }
        return response.json();

    })
    .then(data => {
        pegaAnuncios(token);
        anuncios.limpaForm();
        
        })
    .catch(error => console.log('error', error));
}

export function removeAnuncio(id, token) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var request = {
        method: 'DELETE',
        headers: myHeaders,
        // body: raw,
        redirect: 'follow'
    };

    

    fetch(url+"anuncios/"+id, request)
    .then(response =>{
        if(response.status != 200){
            alert("Erro ao remover o anúncio!")
        }
        return response.json();

    })
    .then(data => {
        pegaAnuncios(token);
        
        })
    .catch(error => console.log('error', error));
}

export async function editarAnuncio(id, titulo, descricao, valor, token) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
        "id": id,
        "titulo": titulo,
        "descricao": descricao,
        "preco": valor
    });

    var request = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    

    fetch(url+"anuncios", request)
    .then(response =>{
        if(response.status != 201){
            alert("Erro ao editar o anúncio!")
        }
        return response.json();

    })
    .then(result => {
        pegaAnuncios(token);
        anuncios.limpaForm();
        console.log(result)
        
        })
    .catch(error => console.log('error', error));
}

export function pegaAnunciosByID(token, id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var request = {
        method: 'GET',
        headers: myHeaders,
        // body: raw,
        
    };

    fetch(url+"anuncios/"+id, request)
    .then(response =>{
        if(response.status != 200){
            alert("Erro ao carregar seus anúncios!")
        }
        
        return response.json();

    })
    .then(data => {
        anuncios.preencheAnunciosEditar(data);
        
        })
    .catch(error => console.log('error', error));
}
