$(".btn_novo").on('click', function (event) {
    event.preventDefault();
    $(".formAdd").toggle();
    $(".alert-success").hide();
    $(".alert-warning").hide();
});

$('.btn_salvar').on('click', function salvarPedido(event) {
    event.preventDefault();

    $(".alert-success").hide();
    $(".alert-warning").hide();

    let numeroPedido = document.querySelector('.input_numeroPedido').value;
    let valorTotal = document.querySelector('.input_valorProduto').value;

    document.querySelector('.input_numeroPedido').value = '';
    document.querySelector('.input_valorProduto').value = '';

    let date = new Date();
    let data = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let pedido = {
        "id_cst_pedido": 6,
        "nr_pedido": numeroPedido,
        "vl_total": valorTotal,
        "dt_created": data,
        "id_usercreated": 6,
        "dt_updated": null,
        "id_userupdated": null,
        "ds_recordthumbprint": "E3F6DCA0-AC22-4FA7-A364-31EA191C8AA7"
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/requests',
        dataType: 'json',
        data: pedido,
        success: () => {
            let html = "<tr>";
            html += "<th scope='col' style='text-align: center'>" + pedido.id_cst_pedido + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.nr_pedido + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.vl_total + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.dt_created + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.id_usercreated + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.dt_updated + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.id_userupdated + "</th>";
            html += "<th scope='col' style='text-align: center'>" + pedido.ds_recordthumbprint + "</th>";
            html += "<th scope='col'><button class='btn btn-primary btn_editar' type='submit'>Editar</button></th>";
            html += "<th scope='col'><button class='btn btn-danger btn-xs btn_excluir'>Excluir</button></th>";
            html += "</tr>";
            $(".thd_listar").append(html);
            $(".tb_listar").show();
            $(".alert-success").text('Pedido cadastrado com sucesso!');
            $(".alert-success").show();
        },
        error: (data, textStatus, xhr) => {
            $(".alert-warning").text('Não foi possível cadastrar pedido');
            $(".alert-warning").show();
        }
    })
})

$('.btn_listar').on('click', function listarPedido(event) {
    event.preventDefault();

    $(".alert-success").hide();
    $(".alert-warning").hide();

    $.ajax({
        type: "GET",
        url: "http://localhost:4000/requests",
        dataType: 'json',
        success: (pedidos) => {
            console.log('success', pedidos)
            for (let i = 0; i < pedidos.length; i++) {
                let html = "<tr>";
                html += "<th scope='col' style='text-align: center '>" + pedidos[i].id_cst_pedido + "</th>";
                html += "<th scope='col' style='text-align: center class = 'nr_pedido'>" + pedidos[i].nr_pedido + "</th>";
                html += "<th scope='col' style='text-align: center class = 'vl_total'>" + pedidos[i].vl_total + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].dt_created + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].id_usercreated + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].dt_updated + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].id_userupdated + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedidos[i].ds_recordthumbprint + "</th>";
                html += "<th scope='col'><button class='btn btn-primary btn_editar' type='submit'>Editar</button></th>";
                html += "<th scope='col'><button class='btn btn-danger btn-xs btn_excluir'>Excluir</button></th>";
                html += "</tr>";
                $(".thd_listar").append(html);
            }
            $(".tb_listar").show();
            $(".alert-success").hide();
        },
        error: (data, textStatus, xhr) => {
            $(".alert-warning").text('Não foi possível listar pedidos');
            $(".alert-warning").show();
        }
    })
})

$('body').on('click', '.btn_consultar', function consultarPedido(event) {
    event.preventDefault();

    $(".alert-success").hide();
    $(".alert-warning").hide();

    let idPedido = document.querySelector(".input_consulta").value
    if (idPedido != '') {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:4000/requests?id_cst_pedido=' + idPedido,
            dataType: 'json',
            success: (pedido) => {
                console.log(pedido);
                let html = "<tr>"
                html += "<th scope='col' style='text-align: center'>" + pedido[0].id_cst_pedido + "</th>";
                html += "<th scope='col' style='text-align: center' class = 'nr_pedido'>" + pedido[0].nr_pedido + "</th>";
                html += "<th scope='col' style='text-align: center class = 'vl_total'>" + pedido[0].vl_total + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedido[0].dt_created + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedido[0].id_usercreated + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedido[0].dt_updated + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedido[0].id_userupdated + "</th>";
                html += "<th scope='col' style='text-align: center'>" + pedido[0].ds_recordthumbprint + "</th>";
                html += "</tr>"
                $('.tbody_consulta').append(html)
                $(".tb_consulta").show();
                $(".alert-success").hide();
            },
            error: (data, textStatus, xhr) => {
                $(".alert-warning").text('Não foi possível consultar pedido');
                $(".alert-warning").show();
            }
        })
    }
})

$('body').on("click", ".btn_editar", function (event) {

    event.preventDefault();

    $(".alert-success").hide();
    $(".alert-warning").hide();

    var nr_pedido = $(this).parents("tr").find("th:eq(1)").text();
    var vl_total = $(this).parents("tr").find("th:eq(2)").text();

    $(this).parents("tr").find("th:eq(1)").html('<input name="edit_nr_pedido" class="input_nr_pedido" value=' + nr_pedido + '>');
    $(this).parents("tr").find("th:eq(2)").html('<input name="edit_vl_total" class="input_vl_total" value=' + vl_total + '>');

    $(this).parents("tr").find("th:eq(8)").prepend("<button class='btn btn-info btn-xs btn_update'>Update</button>")
    $(this).parents("tr").find("th:eq(9)").prepend("<button class='btn btn-warning btn-xs btn_cancelar'>Cancelar</button>")
    $(this).parents("tr").find(".btn_excluir").hide();
    $(this).hide();
});

$('body').on('click', '.btn_excluir', function excluirPedido(event) {
    event.preventDefault();

    var idPedido = parseInt($(this).parents("tr").find("th:eq(0)").text());
    console.log(idPedido);

    $(".alert-success").hide();
    $(".alert-warning").hide();

    decisao = confirm('Tem certeza que deseja excluir o pedido ?')
    if (decisao) {
        $(this).parents("tr").remove();
        $(".alert-success").text('Pedido excluído com sucesso!');
        $(".alert-success").show();
        
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:4000/requests/' + idPedido,
            dataType: 'json',
            success: (result) => {
                console.log(result)
                $(this).parents("th").remove();
                $(".alert-success").text('Pedido excluído com sucesso!');
            },
            error: (data, textStatus, xhr) => {
                console.log(xhr.status);
                $(".alert-warning").text('Não foi possível excluir pedido: erro ' + xhr.status);
                $(".alert-warning").show();
            }
        })
    }
})

$('body').on('click', '.btn_update', function updatePedido(event) {
    event.preventDefault();

    $(".alert-success").hide();
    $(".alert-warning").hide();

    var idPedido = parseInt($(this).parents("tr").find("th:eq(0)").text());
    console.log(idPedido);

    var nr_pedido = parseInt($(this).parents("tr").find(".input_nr_pedido").val());
    var vl_total = parseInt($(this).parents("tr").find(".input_vl_total").val());

    let date = new Date();
    let data = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let pedido = {
        "id_cst_pedido": idPedido,
        "nr_pedido": nr_pedido,
        "vl_total": vl_total,
        "dt_created": data,
        "id_usercreated": 6,
        "dt_updated": null,
        "id_userupdated": null,
        "ds_recordthumbprint": "E3F6DCA0-AC22-4FA7-A364-31EA191C8AA7"
    };

    $(this).parents("tr").find("th:eq(1)").html(nr_pedido);
    $(this).parents("tr").find("th:eq(2)").html(vl_total);
    $(this).parents("tr").find("th:eq(5)").html(data);

    $(this).parents("tr").find(".btn_editar").show();
    $(this).parents("tr").find(".btn_excluir").show();
    $(this).parents("tr").find(".btn_cancelar").remove();
    $(this).parents("tr").find(".btn_update").remove();

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:4000/requests/' + idPedido,
        data: pedido,
        dataType: 'json',
        success: (result) => {
            alert('Pedido alterado com sucesso!')
        },
        error: (data, textStatus, xhr) => {
            alert('Não foi possível atualizar pedido')
        }
    })
})

$('body').on('click', '.btn_cancelar', function cancelarEditar(event) {
    event.preventDefault();

    $(".alert-success").hide();
    $(".alert-warning").hide();

    var nr_pedido = $(this).parents("tr").find(".input_nr_pedido").val();
    var vl_total = $(this).parents("tr").find(".input_vl_total").val();

    $(this).parents("tr").find("th:eq(1)").html(nr_pedido);
    $(this).parents("tr").find("th:eq(2)").html(vl_total);

    $(this).parents("tr").find(".btn_editar").show();
    $(this).parents("tr").find(".btn_excluir").show();
    $(this).parents("tr").find(".btn_update").remove();
    $(this).parents("tr").find(".btn_cancelar").remove();

})
