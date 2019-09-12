//para gravar pedido-> /api/pedidorest/pedido POST
//para alterar o pedido-> /api/pedidorest/pedido PUT
//para deletar o pedido-> /api/pedidorest/pedido/{ID} DELETE
//para selecionar por Id-> /api/pedidorest/pedido/{ID} GET

$("#btn-primary").click(function () {
    $("#formNovo").toggle();
});

$("#tabela").click(function () {
    $("#dado").toggle();
});

function listarPedido() {
    $.ajax("/api/pedidorest/pedido").done(function (dados) {

        var html = "<tr>";
        for (var i = 0; i < dados.length; i++) {

            html += "<td>" + dados[i].id_cst_pedido + "</td>";
            html += "<td>" + dados[i].nr_pedido + "</td>";
            html += "<td>" + dados[i].vl_total + "</td>";
            html += "<td>" + dados[i].dt_created + "</td>";
            html += "<td>" + dados[i].id_usercreated + "</td>";
            html += "<td>" + dados[i].dt_updated + "</td>";
            html += "<td>" + dados[i].id_userupdated + "</td>";
            html += "<td>" + dados[i].ds_recordthumbprint + "</td>";
            html += "<td> <input type = 'button' id='btnEd' value ='Editar' onclick='editarPedido(" + dados[i].id_cst_pedido + ',' + dados[i].nr_pedido + ',' + dados[i].vl_total + ")'/></td>";
            html += "<td> <input type = 'button' id='btnEx' value ='Excluir' onclick='excluirPedido(" + dados[i].id_cst_pedido + ")'/></td>";
            html += "</tr>";

            $("#registros #dados").html(html);
        };
    });
};

function consulta(id_cst_pedido) {

    var consulta = document.getElementById('conTab').value;
    if (consulta == id_cst_pedido) {

        document.getElementById('id').value = id_cst_pedido;
        document.getElementById('pedido').value = nr_pedido;
        document.getElementById('valorTot').value = vl_total;

        var pedido = {
            "id_cst_pedido": id_cst_pedido,
            "nr_pedido": nr_pedido,
            "vl_total": vl_total,
        }
    } else {
        alert('Pedido não encontrado!')
    }
}

function Salvar() {
    var idPedido = document.getElementById('id').value;
    var numPedido = document.getElementById('pedido').value;
    var vTot = document.getElementById('valorTot').value;

    document.getElementById('id').value = '';
    document.getElementById('pedido').value = '';
    document.getElementById('valorTot').value = '';

    if (idPedido == "") {
        var pedido = {
            "nr_pedido": numPedido,
            "vl_total": vTot,
        }
        alert("Arquivo Salvo com Sucesso")

        $.ajax({
            url: '/api/pedidorest/pedido',
            type: 'POST',
            data: pedido,
            dataType: "JSON",
            success: function (result) {
                console.log(result)
                listarPedido()
            }
        })
    } else {
        var pedido = {
            "id_cst_pedido": idPedido,
            "nr_pedido": numPedido,
            "vl_total": vTot
        }
        alert('Pedido ' + idPedido + ' alterado com sucesso!')

        $.ajax({
            url: '/api/pedidorest/pedido',
            type: 'POST',
            data: pedido,
            dataType: "JSON",
            headers: { "X-HTTP-Method-Override": "PUT" },
            success: function (result) {
                console.log(result)
                listarPedido()
            }
        })
    }
}

function editarPedido(id_cst_pedido, nr_pedido, vl_total) {
    document.getElementById('id').value = id_cst_pedido;
    document.getElementById('pedido').value = nr_pedido;
    document.getElementById('valorTot').value = vl_total;

    var pedido = {
        "id_cst_pedido": id_cst_pedido,
        "nr_pedido": nr_pedido,
        "vl_total": vl_total,
    }
}

function excluirPedido(idPedido) {

    decisao = confirm('Tem certeza que deseja excluir o pedido ' + idPedido + '?')
    if (decisao) {
        $.ajax({
            url: '/api/pedidorest/pedido/' + idPedido,
            type: 'DELETE',
            success: function (result) {
                console.log(result)
                listarPedido()
            }
        })
        alert("Pedido excluído com sucesso!")
    } else {
        return false
    }
}
