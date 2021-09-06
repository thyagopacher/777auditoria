function salvarTipoPagamento() {
    if ($("#nomeTipoPagamento").val() !== null && $("#nomeTipoPagamento").val() !== "") {
        $.ajax({
            url: "../control/SalvarTipoPagamento.php",
            type: "POST",
            data: $("#ftipo").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao === true) {
                    swal("Tipo Pagamento salvo", data.mensagem, "success");
                    procurarTipoPagamento(true);
                    novoTipoPagamento();
                } else if (data.situacao === false) {
                    swal("Erro", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro ao salvar", "Erro causado por:" + errorThrown, "error");
            }
        });
    } else if ($("#nomeTipoPagamento").val() === null || $("#nomeTipoPagamento").val() === "") {
        swal("Campo em branco", "Por favor escolha um nome!", "error");
    }
}

function excluirTipoPagamento(codtipo) {
    if (typeof (codtipo) == "codtipo") {//test do parametro opcional
        codtipo = $("#codtipo").val();
    }
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações desse tipo pagamento!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Sim, exclua ele!",
        cancelButtonText: "Não",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            if (codtipo !== null && codtipo !== "") {
                $.ajax({
                    url: "../control/ExcluirTipoPagamento.php",
                    type: "POST",
                    data: {codtipo: codtipo},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.situacao === true) {
                            swal("Tipo Pagamento excluido", data.mensagem, "success");
                            procurarTipoPagamento(true);
                        } else if (data.situacao === false) {
                            swal("Erro", data.mensagem, "error");
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                    }
                });
            } else {
                swal("Campo em branco", "Por favor escolha o tipo de pagamento para excluir!", "error");
            }
        }
    });
}

function setaEditarTipoPagamento(tipo) {
    document.getElementById("codtipoTipo").value = tipo[0];
    document.getElementById("nomeTipoPagamento").value = tipo[1];
    document.getElementById("descontoTipoPagamento").value = tipo[2];

    $("#btatualizarTipoPagamento").css("display", "");
    $("#btexcluirTipoPagamento").css("display", "");
    $("#btinserirTipoPagamento").css("display", "none");
}

function novoTipoPagamento() {
    document.getElementById("codtipoTipo").value = '';
    document.getElementById("nomeTipoPagamento").value = '';
    document.getElementById("descontoTipoPagamento").value = '';
    $("#imagem").val('');
    $("#btexcluirTipoPagamento").css("display", "none");
}

function procurarTipoPagamento(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarTipoPagamento.php",
        type: "POST",
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data == "") {
                swal("Atenção", "Nada encontrado!", "error");
            }
            document.getElementById("listagemTipoPagamento").innerHTML = data;
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function marcarTudoTipoPagamento() {
    if ($(".checkbox_pagina").prop("checked") == true) {
        $(".checkbox_pagina").prop("checked", false);
    } else {
        $(".checkbox_pagina").prop("checked", true);
    }
}

$(document).ready(function () {
    procurarTipoPagamento();

    $("#ftipo").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#ftipo').ajaxForm({
        beforeSend: function () {
            status.empty();
            var percentVal = '0%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        uploadProgress: function (event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        success: function () {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        complete: function (xhr) {
            var data = JSON.parse(xhr.responseText);
            if (data.situacao === true) {
                if ($("#codtipo").val() !== null && $("#codtipo").val() !== "") {
                    swal("Alteração", data.mensagem, "success");
                } else {
                    swal("Cadastro", data.mensagem, "success");
                }
                novoTipoPagamento();
                procurarTipoPagamento();
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });
});