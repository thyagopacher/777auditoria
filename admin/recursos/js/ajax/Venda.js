function salvarVenda() {
    $.ajax({
        url: "../control/SalvarVenda.php",
        type: "POST",
        data: $("#ftipo").serialize(),
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Venda cadastrada", data.mensagem, "success");
                procurarVenda(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function excluirVenda(codvenda) {
    if (typeof (codvenda) == "codvenda") {//test do parametro opcional
        codvenda = $("#codvenda").val();
    }
    if (window.confirm("Deseja realmente excluir essa pagina?")) {
        if (document.getElementById("codvenda").value !== null && document.getElementById("codvenda").value !== "") {
            $.ajax({
                url: "../control/ExcluirVenda.php",
                type: "POST",
                data: {codtipo: document.getElementById("codtipo").value},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Venda excluida", data.mensagem, "success");
                        procurarVenda(true);
                    } else if (data.situacao === false) {
                        swal("Erro", data.mensagem, "error");
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                }
            });
        } else {
            swal("Campo em branco", "Por favor escolha a produto para excluir!", "error");
        }
    }
}

function excluirVendas() {
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa venda!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                url: "../control/ExcluirVenda.php",
                type: "POST",
                data: $("#fProcurarNivel").serialize(),
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao == true) {
                        swal("Venda excluida", data.mensagem, "success");
                        procurarVenda(true);
                    } else if (data.situacao == false) {
                        swal("Erro ao excluir", data.mensagem, "error");
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                }
            });
        }
    });
}

function setaEditarVenda(tipo) {
    document.getElementById("codvenda").value = tipo[0];
    document.getElementById("nomeVenda").value = tipo[1];
    document.getElementById("descontoVenda").value = tipo[2];

    $("#btatualizarVenda").css("display", "");
    $("#btexcluirVenda").css("display", "");
    $("#btinserirVenda").css("display", "none");
}

function novoVenda() {
    document.getElementById("codvenda").value = '';
    document.getElementById("nomeVenda").value = '';
    document.getElementById("descontoVenda").value = '';

    $("#btatualizarVenda").css("display", "none");
    $("#btexcluirVenda").css("display", "none");
    $("#btinserirVenda").css("display", "");
}

function procurarVenda(acao) {
    if (document.getElementById("listagemVenda") != null) {
        $("#carregando").show();
        $.ajax({
            url: "../control/ProcurarVenda.php",
            type: "POST",
            dataType: 'text',
            success: function (data, textStatus, jqXHR) {
                if (acao == false && data == "") {
                    swal("Atenção", "Nada encontrado!", "error");
                }
                document.getElementById("listagemVenda").innerHTML = data;
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
            }
        });
        $("#carregando").hide();
    }
}

function abreRelatorioVenda() {
    document.frelvenda.tipo.value = "pdf";
    document.getElementById("fpvenda").submit();
}

function abreRelatorioVenda2() { 
    document.frelvenda.tipo.value = "xls";
    document.getElementById("fpvenda").submit();
}

function marcarTudoVenda() {
    if ($(".checkbox_pagina").prop("checked") == true) {
        $(".checkbox_pagina").prop("checked", false);
    } else {
        $(".checkbox_pagina").prop("checked", true);
    }
}

$(document).ready(function () {
    procurarVenda();
});