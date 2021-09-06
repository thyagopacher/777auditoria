function salvarTipoProduto() {
    if ($("#nomeTipoProduto").val() !== null && $("#nomeTipoProduto").val() !== "") {
        $.ajax({
            url: "../control/SalvarTipoProduto.php",
            type: "POST",
            data: $("#ftipo").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao === true) {
                    swal("Tipo Produto atualizada", data.mensagem, "success");
                    procurarTipoProduto(true);
                } else if (data.situacao === false) {
                    swal("Erro", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro ao atualizar", "Erro causado por:" + errorThrown, "error");
            }
        });
    } else if ($("#nomeTipoProduto").val() === null || $("#nomeTipoProduto").val() === "") {
        swal("Campo em branco", "Por favor escolha um nome!", "error");
    }
}

function excluirTipoProduto() {
    
    if (window.confirm("Deseja realmente excluir essa pagina?")) {
        if (document.getElementById("codtipo").value !== null && document.getElementById("codtipo").value !== "") {
            $.ajax({
                url: "../control/ExcluirTipoProduto.php",
                type: "POST",
                data: {codtipo: document.getElementById("codtipo").value},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Tipo Produto excluida", data.mensagem, "success");
                        procurarTipoProduto(true);
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

function excluirTipoProdutos() {
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa cat. produto!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                url: "../control/ExcluirTipoProduto.php",
                type: "POST",
                data: $("#fProcurarNivel").serialize(),
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao == true) {
                        swal("Tipo Produto excluida", data.mensagem, "success");
                        procurarTipoProduto(true);
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

function setaEditarTipoProduto(tipo) {
    document.getElementById("codtipoTipo").value = tipo[0];
    document.getElementById("nomeTipoProduto").value = tipo[1];
    document.getElementById("descontoTipoProduto").value = tipo[2];

    $("#btatualizarTipoProduto").css("display", "");
    $("#btexcluirTipoProduto").css("display", "");
    $("#btinserirTipoProduto").css("display", "none");
}

function novoTipoProduto(){
    document.getElementById("codtipoTipo").value = '';
    document.getElementById("nomeTipoProduto").value = '';
    document.getElementById("descontoTipoProduto").value = '';

    $("#btatualizarTipoProduto").css("display", "none");
    $("#btexcluirTipoProduto").css("display", "none");
    $("#btinserirTipoProduto").css("display", "");
}

function procurarTipoProduto(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarTipoProduto.php",
        type: "POST",
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data == "") {
                swal("Atenção", "Nada encontrado!", "error");
            }
            document.getElementById("listagemTipoProduto").innerHTML = data;
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function marcarTudoTipoProduto() {
    if ($(".checkbox_pagina").prop("checked") == true) {
        $(".checkbox_pagina").prop("checked", false);
    } else {
        $(".checkbox_pagina").prop("checked", true);
    }
}

$(document).ready(function () {
    procurarTipoProduto();
});