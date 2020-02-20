var boards = new Array();

// var token = localStorage.getItem("token");
//     if (token == undefined) {
//         window.open("index.html", "_self");
//     }
var idBoard 
carregar_boards();

class Board {
    constructor(nome, color) {
        this.nome = nome;
        this.color = color;
    }
}
var token = sessionStorage.getItem("token");
var i = 0;
var novinho = document.getElementById("criar_board")
novinho.addEventListener('click', function (event) {
    event.preventDefault();
    var adcnome = document.getElementById("adicionar-nome");
    var nome = adcnome.value;
    if (nome == "") {
        alert("nome do board não pode estar vazio")
    }
    else {
        var adccolor = document.getElementById("adicionar-color");
        var color = adccolor.value;
        var novo = new Board(nome, color);
        boards[i] = novo;
        var divv = document.createElement("div");
        divv.setAttribute("id", "minhadiv")
        divv.className = "newboard";
        var textnode = document.createTextNode(nome);
        divv.style.backgroundColor = color;
        divv.style.color = "white";
        divv.appendChild(textnode);
        document.getElementById("builder").appendChild(divv);
        aviso_boards.style.display = "none";

        var botao = document.getElementById("minhadiv")
        botao.addEventListener('click', function () {
        })

        var dados = {
            name: document.getElementById("adicionar-nome").value,
            color: document.getElementById("adicionar-color").value,
            token: sessionStorage.getItem("token")
        };

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                location.reload();
            }
            if (this.readyState == 4 && this.status == 400) {
                alert("Board não pôde ser cadastrado")
                console.log(this.status, this.responseText);
            }

        };
        var url = "https://tads-trello.herokuapp.com/api/trello/boards/new";
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.send(JSON.stringify(dados));

    }
})

function carregar_boards() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var objeto = JSON.parse(this.responseText);
            console.log("boards recuperados")
            for (let i = 0; i < objeto.length; i++) {
                criar_board(objeto[i]["id"], objeto[i]["name"], objeto[i]["color"]);


            }
        }
    };
    var url = "https://tads-trello.herokuapp.com/api/trello/boards/" + sessionStorage.getItem("token");
    xhttp.open("GET", url, true);
    xhttp.send();

}

function criar_board(id, name, color) {
    aviso_boards.style.display = "none"
    var div = document.createElement("div")
    div.setAttribute("id", "minhadiv")
    div.className = "newboard";
    div.style.backgroundColor = color;
    div.style.color = "white"
    div.innerText = name;
    div.id = id;
    div.draggable = "true"
    var butau2 = document.createElement("i")
    var butau = document.createElement("i")
    butau.classList = "fas fa-trash"
    butau2.classList = "fas fa-edit"
    butau.id = "butau"

    div.addEventListener('click', function(){
        sessionStorage.setItem("nome", name)
        sessionStorage.setItem("cor", color)
        sessionStorage.setItem("id", id)
        location.replace("lists.html")
    })


    butau.addEventListener('click', function () {
        event.stopPropagation() 
        var dados_delete = {
            board_id: id,
            token: sessionStorage.getItem("token")
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                location.reload();
            }
            if (this.readyState == 4 && this.status == 400) {
                alert("Board não pôde ser apagado")  
                console.log(this.status, this.responseText);
            }

        };
        var url = "https://tads-trello.herokuapp.com/api/trello/boards/delete";
        xhttp.open("DELETE", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.send(JSON.stringify(dados_delete));        

    })

    butau2.addEventListener('click', function(){
        event.stopPropagation() 
        $('#exampleModalCenterr').modal('toggle');
        sessionStorage.setItem("nome", name)
        sessionStorage.setItem("cor", color)
        sessionStorage.setItem("id", id)
        
    })


    div.appendChild(butau)
    div.appendChild(butau2)
    document.getElementById("fluid").appendChild(div);
    
}

function editar_board(){
    var EditModal = document.getElementById("EditModal")

    dados_edit_nome = {
        board_id: sessionStorage.getItem("id"),
        name: EditModal["editarnome"].value,
        token: sessionStorage.getItem("token")
    }


    var xhttpp = new XMLHttpRequest();
    xhttpp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
        if (this.readyState == 4 && this.status == 400) {
            alert("Board não pôde ser editado")  
            console.log(this.status, this.responseText);
        }

    };
    var urlname = "https://tads-trello.herokuapp.com/api/trello/boards/rename";
    xhttpp.open("PATCH", urlname, true);
    xhttpp.setRequestHeader("Content-type", "application/json");

    xhttpp.send(JSON.stringify(dados_edit_nome));



    dados_edit_color = {
        board_id: sessionStorage.getItem("id"),
        color: EditModal["editarcolor"].value,
        token: sessionStorage.getItem("token"),
        
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            location.reload();
        }
        if (this.readyState == 4 && this.status == 400) {
            alert("Board não pôde ser editado")  
            console.log(this.status, this.responseText);
        }

    };
    var url = "https://tads-trello.herokuapp.com/api/trello/boards/newcolor";
    xhttp.open("PATCH", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify(dados_edit_color));

}
