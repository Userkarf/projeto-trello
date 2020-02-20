var containers_lists = document.getElementById("container_cards")

var list_id;
criar_background()

var board_nome = sessionStorage.getItem("nome")
var navabar = document.getElementById("navabar")
var elemento = document.createElement("a")
elemento.innerText = "você está no board: " + board_nome;
navabar.appendChild(elemento)

function criar_background() {
    FEs.style.backgroundColor = sessionStorage.getItem("cor");
    carregar_lists();
}

function carregar_lists() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var objetoo = JSON.parse(this.responseText);
            console.log("lists recuperados")
            for (let i = 0; i < objetoo.length; i++) {
                cadastrar_list(objetoo[i]["id"], objetoo[i]["name"]);
                
            }
        }
    };
    var urll = "https://tads-trello.herokuapp.com/api/trello/lists/" + sessionStorage.getItem("token") + "/board/" + sessionStorage.getItem("id");
    xhttp.open("GET", urll, true);
    console.log(urll)
    xhttp.send();
}

function carregar_cards(id_list) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var objeto = JSON.parse(this.responseText);
            console.log("cards recuperados")
            for (let i = 0; i < objeto.length; i++) {
                carregar_card(objeto[i]["id"], objeto[i]["name"], id_list);
            }
        }
    };
    var url = "https://tads-trello.herokuapp.com/api/trello/cards/" + sessionStorage.getItem("token") + "/list/" + sessionStorage.getItem("id_list");
    xhttp.open("GET", url, true);
    console.log(url)
    xhttp.send();
}


function chamar_modal() {
    $('#exampleModalCenterr').modal('toggle');
}

function criarr_list() {
    var adcnome = document.getElementById("adicionar-nome")
    var nome = adcnome.value;
    if (nome == "") {
        alert("nome da list não pode estar vazio")
    }
    else {
        var card = document.createElement("div");
        card.classList = "card-body";
        card.style.backgroundColor = "white"
        card.style.display = "inline-block"
        card.style.width = "13rem"
        card.style.textAlign = "center"
        card.style.marginRight = "20px"
        card.style.position = "fixed"
        var textnode = document.createTextNode(nome);
        card.appendChild(textnode);
        document.getElementById("FEs").insertBefore(card, card_principal);

        var dados = {
            name: document.getElementById("adicionar-nome").value,
            token: sessionStorage.getItem("token"),
            board_id: sessionStorage.getItem("id"),
        };

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                location.reload();

            }
            if (this.readyState == 4 && this.status == 400) {
                console.log(this.status, this.responseText);
            }

        };
        var url = "https://tads-trello.herokuapp.com/api/trello/lists/new"
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(dados));


    }
}
function carregar_card(id, name, id_list) {
    var card = document.createElement("ul")
    card.id = id
    sessionStorage.setItem("card_id", id)
    card.classList = "list-group-item"
    card.innerText = name;
    var olocomeu = document.createElement("i")
    olocomeu.style.margin = "20px"
    olocomeu.classList = "fas fa-trash"
    olocomeu.style.display = "block"
    card.appendChild(olocomeu)
    card.draggable = "true"
    document.getElementById(id_list).appendChild(card)
     
     card.addEventListener('click', function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let objeto = JSON.parse(this.responseText);
                console.log(this.responseText);
                console.log("comentários recuperados")
                $('#modalcomentarios').modal('toggle')

                for (let i = 0; i < objeto.length; i++) {
                    cadastrar_comentario(objeto[i]["comment"])
                   
            }
                
            }
            if (this.readyState == 4 && this.status == 400) {
                alert("comentários não recuperados")
                console.log(this.status, this.responseText);
            }   

        };
        var url = "https://tads-trello.herokuapp.com/api/trello/cards/" + sessionStorage.getItem("token") + "/" + id + "/comments";
        xhttp.open("GET", url, true);
        xhttp.send();

    })

    var criar_comentario = document.getElementById("criar-comentario")
    criar_comentario.addEventListener('click', function(){
        var dados_comentario = {
            card_id: id,
            comment: document.getElementById("add_comment").value,
            token: sessionStorage.getItem("token")
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                location.reload();
            }
            if (this.readyState == 4 && this.status == 400) {
                console.log(this.status, this.responseText);
            }

        };
        var url = " https://tads-trello.herokuapp.com/api/trello/cards/addcomment";
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.send(JSON.stringify(dados_comentario));
    })
    
    olocomeu.addEventListener('click', function(){
        event.stopPropagation();
        var dados_delete = {
            card_id: id,
            token: sessionStorage.getItem("token")
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                location.reload();
            }
            if (this.readyState == 4 && this.status == 400) {
                alert("list não pôde ser apagada")
                console.log(this.status, this.responseText);
            }

        };
        var url = "https://tads-trello.herokuapp.com/api/trello/cards/delete";
        xhttp.open("DELETE", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.send(JSON.stringify(dados_delete));
    })
}


function cadastrar_comentario(comment){
    var comentario = document.getElementById("modal-body");
    var modal = document.createElement("p");
    modal.innerText = comment;
    comentario.appendChild(modal);


}


function cadastrar_list(id, name) {
    
    var div = document.createElement("div")
    div.setAttribute("id", id);
    div.classList = "card-body";
    div.style.backgroundColor = "white"
    div.style.display = "inline-block"
    div.style.width = "13rem"
    div.style.textAlign = "center"
    div.style.marginRight = "20px"
    div.style.borderRadius = "5px"
    var text = document.createElement("h5")
    text.classList = "card-title"
    text.innerText = name;
    var butau2 = document.createElement("i")
    var butau = document.createElement("i")
    var butau3 = document.createElement("i")
    id_list = div.getAttribute("id")
    sessionStorage.setItem("id_list", id_list)
    butau.classList = "fas fa-trash"
    butau3.classList = "fas fa-plus-square"
    butau2.classList = "fas fa-edit"
    butau.id = "butau"
    butau2.id = "butau"
    butau3.id = "butau3"
    var criar_card = document.createElement("ul")
    criar_card.setAttribute("id", "id")
    criar_card.classList = ("list-group list-group-flush")
    criar_card.style.backgroundColor = "white"
    criar_card.style.height = "20px"
    criar_card.style.width = "11rem"

    butau3.addEventListener("click", function () {
        var item = document.createElement("li")
        item.classList = "list-group-item"
        item.setAttribute("id", "item")
        div.appendChild(item)
        item.draggable = "true"
        

        var input = document.createElement("input")
        item.appendChild(input)
        input.style.width = "9rem"
        input.style.outline = "none"
        input.style.border = "none"

        input.addEventListener('keypress', function (e) {
            var key = e.wich || e.keyCode;
            if (key === 13) {
                item.innerText = input.value;
                input.style.display = "none"
                event.stopPropagation()

                var criar_card = {
                    name: input.value,
                    data: "23/06/2019",
                    token: sessionStorage.getItem("token"),
                    list_id: div.getAttribute("id")
,
                }
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log(this.responseText);
                        location.reload();
                    }
                    if (this.readyState == 4 && this.status == 400) {
                        alert("Card nåo pôde ser criado")
                        console.log(this.status, this.responseText);
                    }

                };
                var url = "https://tads-trello.herokuapp.com/api/trello/cards/new";
                xhttp.open("POST", url, true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send(JSON.stringify(criar_card));

            }
        })
    })

    div.appendChild(text)
    div.appendChild(butau)
    div.appendChild(butau2)
    div.appendChild(butau3)
    div.appendChild(criar_card)
    document.getElementById("FEs").insertBefore(div, card_principal);
    var id_list = div.getAttribute("id")
    carregar_cards(id_list)
    

    butau.addEventListener('click', function () {

        sessionStorage.setItem("id_list", id_list)

        var dados_delete = {
            list_id: sessionStorage.getItem("id_list"),
            token: sessionStorage.getItem("token")
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                location.reload();
            }
            if (this.readyState == 4 && this.status == 400) {
                alert("list não pôde ser apagada")
                console.log(this.status, this.responseText);
            }

        };
        var url = "https://tads-trello.herokuapp.com/api/trello/lists/delete";
        xhttp.open("DELETE", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.send(JSON.stringify(dados_delete));
    })

    div.addEventListener('click', function(){
        sessionStorage.setItem("id_list", div.getAttribute("id"))
        var espera = document.getElementById("editar-list")
    espera.addEventListener('click', function(){
        event.stopPropagation();
        dados_edit_nome = {
            list_id: sessionStorage.getItem("id_list"),
            name: document.getElementById("editar-nome").value,
            token: sessionStorage.getItem("token")
        }
    
    
        var xhttpp = new XMLHttpRequest();
        xhttpp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                location.reload();


            }
            if (this.readyState == 4 && this.status == 400) {
                alert("Board não pôde ser editado")
                console.log(this.status, this.responseText);
            }
    
        };
        var urlname = "https://tads-trello.herokuapp.com/api/trello/lists/rename";
        xhttpp.open("PATCH", urlname, true);
        xhttpp.setRequestHeader("Content-type", "application/json");
    
        xhttpp.send(JSON.stringify(dados_edit_nome));
        console.log(dados_edit_nome);
    
    })

    })

    butau2.addEventListener('click', function () {
        $('#exampleModalCente').modal('toggle')
        
    })

    }

   
    


