//para gravar pedido-> /api/pedidorest/pedido POST
//para alterar o pedido-> /api/pedidorest/pedido PUT
//para deletar o pedido-> /api/pedidorest/pedido/{ID} DELETE
//para selecionar por Id-> /api/pedidorest/pedido/{ID} GET

$(".btn_novo").click(function () {
    $(".formAdd").toggle();
});

function listarPedido() {

    $.ajax("/api/pedidorest/pedido").done( (dados) => {

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
            html += "<td> <input type = 'button' id='btnEd' value ='Editar' onclick='editarPedido(" + dado.id_cst_pedido + ',' + dado.nr_pedido + ',' + dado.vl_total + ")'/></td>";
            html += "<td> <input type = 'button' id='btnEx' value ='Excluir' onclick='excluirPedido(" + dado.id_cst_pedido + ")'/></td>";
            html += "</tr>";

            $(".tb_listar").html(html);
        };
        /*
        var html = "<tr>";
        dados.forEach(element => {
            html += "<td>" + element.id_cst_pedido + "</td>";
            html += "<td>" + element.nr_pedido + "</td>";
            html += "<td>" + element.vl_total + "</td>";
            html += "<td>" + element.dt_created + "</td>";
            html += "<td>" + element.id_usercreated + "</td>";
            html += "<td>" + element.dt_updated + "</td>";
            html += "<td>" + element.id_userupdated + "</td>";
            html += "<td>" + element.ds_recordthumbprint + "</td>";
            html += "<td> <input type = 'button' id='btnEd' value ='Editar' onclick='editarPedido(" + element.id_cst_pedido + ',' + element.nr_pedido + ',' + element.vl_total + ")'/></td>";
            html += "<td> <input type = 'button' id='btnEx' value ='Excluir' onclick='excluirPedido(" + element.id_cst_pedido + ")'/></td>";
            html += "</tr>";

            $(".tb_listar").html(html);
        });
        */
    });
};

function consulta(id_cst_pedido) {

    var consulta = document.querySelector('.input_consulta').value
    if (consulta == id_cst_pedido) {

        document.getElementById('id').value = id_cst_pedido;
        document.getElementById('pedido').value = nr_pedido;
        document.getElementById('valorTot').value = vl_total;

        var pedido = {
            "id_cst_pedido": id_cst_pedido,
            "nr_pedido": nr_pedido,
            "vl_total": vl_total,
        }
        $(".tb_consulta").toggle();
    } else {
        alert('Pedido não encontrado!')
    }
}

function Salvar() {
    var numPedido = document.querySelector('.input_nomePedido');
    var vTot = document.querySelector('.input_valorProduto');

    document.querySelector('.input_nomePedido').value = '';
    document.querySelector('.input_valorProduto').value = '';

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
}

function Editar() {
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
