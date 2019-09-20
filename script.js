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

    let date = new Date();
    let data = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes();

    let pedido = {
        "id_cst_pedido": 90,
        "nr_pedido": numeroPedido,
        "vl_total": valorTotal,
        "dt_created": data,
        "id_usercreated": 7,
        "dt_updated": "",
        "id_userupdated": "",
        "ds_recordthumbprint": "E3F6DCA0-AC22-4FA7-A364-31EA191C8AA7"
    }

    $.ajax({
        type: 'POST',
        url: 'https://testapi.io/api/kielkow/pedidos',
        dataType: 'json',
        data: pedido,
        success: () => {
            alert("Pedido salvo com sucesso")
            let html = "<tr>";
            html += "<th scope='col'>" + pedido.id_cst_pedido + "</th>";
            html += "<th scope='col'>" + pedido.nr_pedido + "</th>";
            html += "<th scope='col'>" + pedido.vl_total + "</th>";
            html += "<th scope='col'>" + pedido.dt_created + "</th>";
            html += "<th scope='col'>" + pedido.id_usercreated + "</th>";
            html += "<th scope='col'>" + pedido.dt_updated + "</th>";
            html += "<th scope='col'>" + pedido.id_userupdated + "</th>";
            html += "<th scope='col'>" + pedido.ds_recordthumbprint + "</th>";
            html += "<th scope='col'><button class='btn btn-primary btn_editar' type='submit'>Editar</button></th>"
            html += "</tr>";
            $(".thd_listar").append(html);
            $(".tb_listar").show();
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
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].id_cst_pedido + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].nr_pedido + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].vl_total + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].dt_created + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].id_usercreated + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].dt_updated + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].id_userupdated + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].ds_recordthumbprint + "</th>";
                html += "<th scope='col'><button class='btn btn-primary btn_editar' type='submit'>Editar</button></th>"
                html += "</tr>";
                $(".thd_listar").append(html);
            }
            $(".tb_listar").show();
        },
        error: (error) => {
            console.log(error.status)
            alert('Não foi possível listar')
        }
    })
})

$('body').on('click', '.btn_consultar', function consultarPedido(event) {
    event.preventDefault();
    let idPedido = document.querySelector(".input_consulta").value
    $.ajax({
        type: 'GET',
        url: 'https://testapi.io/api/kielkow/pedidos/' + idPedido,
        dataType: 'json',
        success: (pedido) => {
            console.log(pedido)
            let html = "<tr>"
            html += "<th scope='col' style='text-align: center'>" + pedido.id_cst_pedido + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.nr_pedido + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.vl_total + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.dt_created + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.id_usercreated + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.dt_updated + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.id_userupdated + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.ds_recordthumbprint + "</th>";
            html += "</tr>"
            $('.tbody_consulta').append(html)
            $(".tb_consulta").show();
        },
        error: (error) => {
            console.log(error.status)
            alert('Não foi possível buscar pedido ' + idPedido)
        }
    })
})

$('body').on("click", ".btn_editar", function (event) {

    event.preventDefault();

    var nr_pedido = $(this).parents("th").attr('data-name');
    var vl_total = $(this).parents("th").attr('data-email');

    $(this).parents("th").find("td:eq(0)").html('<input name="edit_nr_pedido" value="' + nr_pedido + '">');
    $(this).parents("th").find("td:eq(1)").html('<input name="edit_vl_total" value="' + vl_total + '">');

    $(this).parents("th").find("td:eq(2)").prepend("<button class='btn btn-info btn-xs btn_update'>Update</button><button class='btn btn-warning btn-xs btn_cancelar'>Cancel</button>")
    $(this).hide();
});

$('body').on('click', '.btn_excluir', function excluirPedido(event) {
    console.log("Btn apertado");
    event.preventDefault();
    console.log("Btn apertado");
    decisao = confirm('Tem certeza que deseja excluir o pedido ' + idPedido + '?')
    if (decisao) {
        $.ajax({
            type: 'PUT',
            url: 'https://testapi.io/api/kielkow/pedidos' + idPedido,
            dataType: 'json',
            success: (result) => {
                console.log(result)
                $(this).parents("th").remove();
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

$('.btn_update').on('click', function updatePedido(event, idPedido) {
    event.preventDefault();

    var nr_pedido = $(this).parents("th").find("input[nr_pedido='editar_nr_pedido']").val();
    var vl_total = $(this).parents("th").find("input[name='editar_vl_total']").val();

    $(this).parents("th").find("td:eq(0)").text(nr_pedido);
    $(this).parents("th").find("td:eq(1)").text(vl_total);

    $(this).parents("th").attr('data-name', nr_pedido);
    $(this).parents("th").attr('data-email', vl_total);

    $(this).parents("th").find(".btn_editar").show();
    $(this).parents("th").find(".btn_cancelar").remove();
    $(this).parents("th").find(".btn_update").remove();

    $.ajax({
        type: 'PUT',
        url: 'https://testapi.io/api/kielkow/pedidos' + idPedido,
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

$('.btn_cancelar').on('click', function cancelarEditar(event) {
    event.preventDefault();

    var nr_pedido = $(this).parents("th").attr('data-name');
    var vl_total = $(this).parents("th").attr('data-email');

    $(this).parents("th").find("td:eq(0)").text(name);
    $(this).parents("th").find("td:eq(1)").text(email);

    $(this).parents("th").find(".btn_editar").show();
    $(this).parents("th").find(".btn_update").remove();
    $(this).parents("th").find(".btn_cancelar").remove();
})