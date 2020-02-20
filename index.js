var senha1 = document.getElementById("senha1")
var senha2 = document.getElementById("senha2")

//Faz a troca de login e cadastro
var login = document.getElementById("form_login_botao")
                login.addEventListener('click', function(e){
                form_cadastro.style.display = "none";
                form_login.style.display = "block";
                form_cadastro_botao.style.display = "block";
                form_login_botao.style.display = "none"
                
            })

            var cadastro = document.getElementById("form_cadastro_botao")
            cadastro.addEventListener('click', function(e){
                form_cadastro.style.display = "block";
                form_login.style.display = "none";
                form_cadastro_botao.style.display = "none";
                form_login_botao.style.display = "block"
            })

    var form_cadastro = document.getElementById("form_cadastro")
    form_cadastro.addEventListener("submit", function (event) {
        event.preventDefault();
        if(senha1.value == senha2.value){
        
        var dados = {
            name: document.getElementById("nome").value,
            username: document.getElementById("username").value,
            password: document.getElementById("senha1").value
        };
        console.log(dados);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                alert("Usuário cadastrado com sucesso!")
            } 
            if (this.readyState == 4 && this.status == 400) {
                alert("Usuário já foi cadastrado! Verifique o nome do usuário!")
                console.log(this.status, this.responseText);
            } 
           
        };
        var url = "https://tads-trello.herokuapp.com/api/trello/users/new"; //Corrigir o link
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.send(JSON.stringify(dados));
    }
    else{
        alert("senhas não são iguais")
        alert(senha1.value)
        alert(senha2.value)

    }

    });

    
    var formLogin = document.getElementById("form_login");
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();
        var dados = {
            username: document.getElementById("user").value,
            password: document.getElementById("senha").value
        };
        console.log(dados);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var resposta = JSON.parse(this.responseText);
                sessionStorage.setItem("token", resposta.token);
                location.replace("boards.html")
            } else if (this.readyState == 4  && this.status == 400) {
                alert("Verifique os dados!");
            } 
        };
        var url = " https://tads-trello.herokuapp.com/api/trello/login";
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.send(JSON.stringify(dados));

    });
