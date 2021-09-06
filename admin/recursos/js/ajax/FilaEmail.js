function excluirFilaEmail(codfila) {
    if (typeof (codfila) == "codfila") {//test do parametro opcional
        codfila = document.ffila.codfila.value;
    }
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa fila!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            if (codfila !== null && codfila !== "") {
                $.ajax({
                    url: "../control/ExcluirFilaEmail.php",
                    type: "POST",
                    data: {codfila: codfila},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.situacao === true) {
                            swal("FilaEmail excluida", data.mensagem, "success");
                            procurarFilaEmail(true);
                        } else if (data.situacao === false) {
                            swal("Erro ao excluir", data.mensagem, "error");
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                    }
                });
            } else {
                swal("Campo em branco", "Por favor escolha o fila para excluir!", "error");
            }
        }
    });
}

function procurarFilaEmail(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarFilaEmail.php",
        type: "POST",
        data: $("#fPfila").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data === "") {
                swal("Atenção", "Nada encontrado de filas!", "error");
            }
            document.getElementById("listagemFilaEmail").innerHTML = data;
            dataTablePadrao('table_fila');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function procurarQtdFila() {
    $.ajax({
        url: "../control/CalculadoraFila.php",
        type: "POST",
        data: $("#ffila").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            $("#res_calculadora_fila").html('Serão enviados ' + data + ' e-mails com esses filtros');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function abreRelatorioFilaEmail(tipo) {
    if (tipo === 1) {
        document.fPfila.tipo.value = "pdf";
    } else if (tipo === 2) {
        document.fPfila.tipo.value = "xls";
    }
    document.getElementById("fPfila").submit();
}

$(function () {

    $(".paraquemvai").change(function () {
        procurarQtdFila();
    });

    $("#ffila").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var progress = $(".progress");
    var progressbar = $("#progressbar");
    var sronly = $("#sronly");

    $('#ffila').ajaxForm({
        beforeSend: function () {
            progress.show();
            var percentVal = '0%';
            progressbar.width(percentVal);
            sronly.html(percentVal + ' Completo');
        },
        uploadProgress: function (event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            progressbar.width(percentVal);
            sronly.html(percentVal + ' Completo');
        },
        success: function () {
            var percentVal = '100%';
            progressbar.width(percentVal);
            sronly.html(percentVal + ' Completo');
        },
        complete: function (xhr) {
            var data = JSON.parse(xhr.responseText);
            if (data.situacao === true) {
                swal("Cadastro", data.mensagem, "success");
                procurarFilaEmail(true);

            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
            progress.hide();
        }
    });
});
