$(".btn_novo").on('click', function (event) {
    event.preventDefault();
    $(".formAdd").toggle();
});

$('.btn_salvar').on('click', function salvarPedido(event) {
    event.preventDefault();
    
    let numeroPedido = document.querySelector('.input_numeroPedido').value;
    let valorTotal = document.querySelector('.input_valorProduto').value;
    
    document.querySelector('.input_numeroPedido').value = '';
    document.querySelector('.input_valorProduto').value = '';

    let pedido = {
        "id_cst_pedido": 90,
        "nr_pedido": numeroPedido,
        "vl_total": valorTotal,
        "dt_created": new Date(),
        "id_usercreated": 7,
        "dt_updated": null,
        "id_userupdated": 188,
        "ds_recordthumbprint": "E3F6DCA0-AC22-4FA7-A364-31EA191C8AA7"
    }

    $.ajax({
        type: 'POST',
        url: 'https://testapi.io/api/kielkow/pedidos',
        dataType: 'json',
        data: pedido,
        success: (pedido) => {
            console.log(pedido)
            alert("Pedido salvo com sucesso")
        },
        error: (error) => {
            console.log(error.status)
            alert('Não foi possível salvar pedido')
        }
    })
})

$('.btn_listar').on('click', function listarPedido(event) {
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://testapi.io/api/kielkow/pedidos",
        dataType: 'json',
        success: (pedidos) => {
            console.log('success', pedidos)
            for (let i = 0; i < pedidos.length; i++) {
                let html = "<tr>";
                html += "<th scope='col'>" + pedidos[i].id_cst_pedido + "</th>";
                html += "<th scope='col'>" + pedidos[i].nr_pedido + "</th>";
                html += "<th scope='col'>" + pedidos[i].vl_total + "</th>";
                html += "<th scope='col'>" + pedidos[i].dt_created + "</th>";
                html += "<th scope='col'>" + pedidos[i].id_usercreated + "</th>";
                html += "<th scope='col'>" + pedidos[i].dt_updated + "</th>";
                html += "<th scope='col'>" + pedidos[i].id_userupdated + "</th>";
                html += "<th scope='col'>" + pedidos[i].ds_recordthumbprint + "</th>";
                html += "<th scope='col'><button class='btn btn-primary btn_editar' type='submit'>!</button></th>"
                html += "<th scope='col'><button class='btn btn-primary btn_excluir' type='submit'>X</button></th>"
                html += "</tr>";
                $(".thd_listar").append(html);
            }
            $(".tb_listar").toggle();
        },
        error: (error) => {
            console.log(error.status)
            alert('Não foi possível listar')
        }
    })
})

$('.btn_consultar').on('click', function consultarPedido(event) {
    event.preventDefault();
    //let idPedido = document.querySelector(".input_consulta").value
    $.ajax({
        type: 'GET',
        url: 'https://testapi.io/api/kielkow/pedidos/5', //+ idPedido,
        dataType: 'json',
        success: (pedido) => {
            console.log(pedido)
            let html = "<tr>"
            html += "<th scope='col'>" + pedido.id_cst_pedido + "</th>";
            html += "<th scope='col'>" + pedido.nr_pedido + "</th>";
            html += "<th scope='col'>" + pedido.vl_total + "</th>";
            html += "<th scope='col'>" + pedido.dt_created + "</th>";
            html += "<th scope='col'>" + pedido.id_usercreated + "</th>";
            html += "<th scope='col'>" + pedido.dt_updated + "</th>";
            html += "<th scope='col'>" + pedido.id_userupdated + "</th>";
            html += "<th scope='col'>" + pedido.ds_recordthumbprint + "</th>";
            html += "</tr>"
            $('.tbody_consulta').append(html)
            $(".tb_consulta").toggle();
        },
        error: (error) => {
            console.log(error.status)
            alert('Não foi possível buscar pedido ' + idPedido)
        }
    })
})

$('.btn_editar').on('click', function editarPedido(event) {
    event.preventDefault();
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

$('btn_excluir').on('click', function excluirPedido(event) {
    event.preventDefault();
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
