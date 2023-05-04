var clientes = []
const firebaseConfig = {
    apiKey: "AIzaSyA-1yFQ4CDGvtKLpkL9HaM_fiKLy6IHvPc",
    authDomain: "pesquisa-de-satisfacao-73f45.firebaseapp.com",
    databaseURL: "https://pesquisa-de-satisfacao-73f45-default-rtdb.firebaseio.com",
    projectId: "pesquisa-de-satisfacao-73f45",
    storageBucket: "pesquisa-de-satisfacao-73f45.appspot.com",
    messagingSenderId: "129204417064",
    appId: "1:129204417064:web:d528da356a236dfeeefb1d",
    measurementId: "G-TV49GEPZQB"
};
firebase.initializeApp(firebaseConfig)

function identifica(placa) {
    for (var cliente of clientes) {
        if (cliente.placa === placa.id) {
            return cliente
        }
    }
    return null
}
function modal(placa) {
    var cliente = identifica(placa)
    var modal = document.getElementById("myModal")
    var span = document.getElementsByClassName("close")[0]
    var btnModal = document.getElementById(placa.id)
    var placa = document.getElementById("placaModal")
    placa.innerHTML = cliente.placa
    var sugestao = document.getElementById("sugestoes")
    sugestao.innerHTML = "Sugestão: "+cliente.sugestoes
    var nome = document.getElementById("nomeModal")
    nome.innerHTML = cliente.nome
    

    btnModal.onclick = function () {
        modal.style.display = "block"
    }
    var btnExcluir = document.getElementById("excluir")
    btnExcluir.onclick = function () {
        alert("As informaçoes do cliente com a placa "+ cliente.placa +" foram excluidas")
        firebase.database().ref().child("clientes").child(cliente.ano).child(cliente.mes).child(cliente.placa).remove() 
    }
    span.onclick = function () {
        modal.style.display = "none"
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }
}

var logo = document.getElementById("logo")

logo.onclick = function () {
    carrega()
}
function limpatabela() {
    var tabela = document.getElementById("carros")
    tabela.innerHTML = "<thead><tr><th>Placa</th><th>Nome</th><th>Atendimento</th><th>Conhecimento</th><th>Infraestrutura</th><th>Qualidade do serviço</th><th>Sobre</th></tr></thead>"
}
function carrega() {
    limpatabela()
    var tabela = document.getElementById("carros")
    var ano = document.getElementById("ano").value
    var mes = document.getElementById("mes").value
    var db = firebase.database().ref().child("clientes").child(ano).child(mes);
    db.on('child_added', function (snapshot) {
        var carro = snapshot.val()
        var botaoid = "<td><button id='" + snapshot.key + "' class='btn-info'>Mais info</button></td>"
        var linha = "<tr><td>" +
            carro.placa + "</td><td>" +
            carro.nome + "</td><td>" +
            carro.atendimento + "</td><td>" +
            carro.conhecimento + "</td><td>" +
            carro.infraestrutura + "</td><td>" +
            carro.qualidadedoservico + "</td>" +
            botaoid + "</tr>"

        tabela.innerHTML += linha
        clientes.push(carro)

        var botoes = document.querySelectorAll('.btn-info')
        for (var botao of botoes) {
            botao.onclick = function () {
                modal(this)
            }
        }
    })
}
