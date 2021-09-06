function excluirSoftware(codsoftware) {
    if (typeof (codsoftware) == "undefined") {//test do parametro opcional
        codsoftware = $("#codsoftware").val();
    }
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa software!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        cancelButtonText: "Não",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            if (codsoftware !== null && codsoftware !== "") {
                $.ajax({
                    url: "../control/ExcluirSoftware.php",
                    type: "POST",
                    data: {codsoftware: codsoftware},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.situacao === true) {
                            swal("Software excluido", data.mensagem, "success");
                            procurarSoftware(true);
                        } else if (data.situacao === false) {
                            swal("Erro ao excluir", data.mensagem, "error");
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                    }
                });
            } else {
                swal("Campo em branco", "Por favor escolha o software para excluir!", "error");
            }
        }
    });
}

function procurarSoftware(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarSoftware.php",
        type: "POST",
        data: $("#fPsoftware").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data === "") {
                swal("Atenção", "Nada encontrado de softwares!", "error");
            }
            document.getElementById("listagemSoftware").innerHTML = data;
            dataTablePadrao('table_software');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function abreRelatorioSoftware(tipo) {
    if(tipo === 1){
        document.fPsoftware.tipo.value = "pdf";
    }else if(tipo === 2){
        document.fPsoftware.tipo.value = "xls";
    }
    document.getElementById("fPsoftware").submit();
}

$(function () {

    $("#fsoftware").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#fsoftware').ajaxForm({
        beforeSend: function () {
            status.empty();
            var percentVal = '0%';
            bar.width(percentVal);
            percent.html(percentVal);
        },
        uploadProgress: function (event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal);
            percent.html(percentVal);
        },
        success: function () {
            var percentVal = '100%';
            bar.width(percentVal);
            percent.html(percentVal);
        },
        complete: function (xhr) {
            var data = JSON.parse(xhr.responseText);
            if (data.situacao === true) {
                swal("Cadastro", data.mensagem, "success");
                procurarSoftware(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });
});
