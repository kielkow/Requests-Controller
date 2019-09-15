$(".btn_novo").click(function () {
    $(".formAdd").toggle();
});

$('.btn_salvar').click(function salvarPedido() {
    let numPedido = document.querySelector('.input_nomePedido');
    let vTot = document.querySelector('.input_valorProduto');

    document.querySelector('.input_nomePedido').value = '';
    document.querySelector('.input_valorProduto').value = '';

    let pedido = {
        "nr_pedido": numPedido,
        "vl_total": vTot,
    }

    $.ajax({
        type: 'POST',
        url: '/api/pedidorest/pedido',
        data: pedido,
        dataType: "json",
        success: function (result) {
            console.log(result)
            alert("Pedido salvo com sucesso")
        },
        error: (error) => {
            console.log(error)
            alert('Não foi possível salvar pedido')
        }
    })
})

$('.btn_listar').click(function listarPedido() {
    $.ajax({
        type: "GET",
        url: "https://estagiarios-hml.plusoftomni.com.br/api/pedidorest/pedido",
        success: (pedidos) => {
            console.log('success', pedidos)
            pedidos.forEach(element => {
                let html = "<tr>";
                html += "<th scope='col'>" + element.id_cst_pedido + "</th>";
                html += "<th scope='col'>" + element.nr_pedido + "</th>";
                html += "<th scope='col'>" + element.vl_total + "</th>";
                html += "<th scope='col'>" + element.dt_created + "</th>";
                html += "<th scope='col'>" + element.id_usercreated + "</th>";
                html += "<th scope='col'>" + element.dt_updated + "</th>";
                html += "<th scope='col'>" + element.id_userupdated + "</th>";
                html += "<th scope='col'>" + element.ds_recordthumbprint + "</th>";
                html += "<th scope='col'><button class='btn btn-primary btn_editar' type='submit'>Editar</button></th>"
                html += "<th scope='col'><button class='btn btn-primary btn_excluir' type='submit'>Excluir</button></th>"
                html += "</tr>";
                $(".thd_listar").append(html);
            })
            $(".tb_listar").toggle();
        },
        error: (error) => {
            console.log(error)
            alert('Não foi possível listar')
        }
    })
})

$('.btn_consulta').click(function consultarPedido() {
    let idPedido = document.querySelector(".input_consulta").value
    $.ajax({
        type: 'GET',
        url: 'https://estagiarios-hml.plusoftomni.com.br/api/pedidorest/pedido/' + idPedido,
        success: (pedido) => {
            console.log(pedido)
            let html = "<tr>"
            html += "<th scope='col'>" + pedido[i].id_cst_pedido + "</th>";
            html += "<th scope='col'>" + pedido[i].nr_pedido + "</th>";
            html += "<th scope='col'>" + pedido[i].vl_total + "</th>";
            html += "<th scope='col'>" + pedido[i].dt_created + "</th>";
            html += "<th scope='col'>" + pedido[i].id_usercreated + "</th>";
            html += "<th scope='col'>" + pedido[i].dt_updated + "</th>";
            html += "<th scope='col'>" + pedido[i].id_userupdated + "</th>";
            html += "<th scope='col'>" + pedido[i].ds_recordthumbprint + "</th>";
            html += "</tr>"
            $('.tbody_consulta').append(html)
            $(".tb_consulta").toggle();
        },
        error: (error) => {
            console.log(error)
            alert('Não foi possível buscar pedido ' + idPedido)
        }
    })
})

$('.btn_editar').click(function editarPedido() {
    let pedido = {
        "id_cst_pedido": idPedido,
        "nr_pedido": numPedido,
        "vl_total": vTot
    }

    $.ajax({
        type: 'PUT',
        url: 'https://estagiarios-hml.plusoftomni.com.br/api/pedidorest/pedido' + idPedido,
        data: pedido,
        dataType: 'json',
        success: (result) => {
            console.log(result)
            listarPedido()
            alert('Pedido ' + idPedido + ' alterado com sucesso!')
        },
        error: (error) => {
            console.log(error)
            alert('Não foi possível editar pedido ' + idPedido)
        }
    })
})

$('btn_excluir').click(function excluirPedido() {
    decisao = confirm('Tem certeza que deseja excluir o pedido ' + idPedido + '?')
    if (decisao) {
        $.ajax({
            type: 'PUT',
            url: 'https://estagiarios-hml.plusoftomni.com.br/api/pedidorest/pedido/' + idPedido,
            dataType: 'json',
            success: (result) => {
                console.log(result)
                listarPedido()
                alert('Pedido excluído com sucesso!')
            },
            error: (error) => {
                console.log(error)
                alert('Não foi possível excluir pedido')
            }
        })
    }
})
