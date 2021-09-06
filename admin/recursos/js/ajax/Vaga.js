function salvarVaga() {
    $.ajax({
        url: "../control/SalvarVaga.php",
        type: "POST",
        data: $("#fvaga").serialize(),
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Vaga cadastrada", data.mensagem, "success");
                procurarVaga(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function excluirVaga(codvaga) {
    if(codvaga == undefined){
        codvaga = $("#codvaga").val();
    }
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa vaga!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                url: "../control/ExcluirVaga.php",
                type: "POST",
                data: {codvaga: codvaga},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao == true) {
                        swal("Vaga excluida", data.mensagem, "success");
                        procurarVaga(true);
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

function excluirVagas() {
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa vaga!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                url: "../control/ExcluirVaga.php",
                type: "POST",
                data: $("#flistagemVaga").serialize(),
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao == true) {
                        swal("Vaga excluida", data.mensagem, "success");
                        procurarVaga(true);
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

function novoVaga() {
    location.reload();
}

function procurarVaga(acao) {
    if (document.getElementById("listagemVaga") != null) {
        $("#carregando").show();
        $.ajax({
            url: "../control/ProcurarVaga.php",
            type: "POST",
            data: $("#fpvaga").serialize(),
            dataType: 'text',
            success: function (data, textStatus, jqXHR) {
                if (acao == false && data == "") {
                    swal("Atenção", "Nada encontrado!", "info");
                }
                document.getElementById("listagemVaga").innerHTML = data;
                dataTablePadrao('table_vaga');
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
            }
        });
        $("#carregando").hide();
    }
}

function abreRelatorioVaga(tipo) {
    if(tipo === 1){
        document.fpvaga.tipo.value = "pdf";
    }else if(tipo === 2){
        document.fpvaga.tipo.value = "xls";
    }
    document.getElementById("fpvaga").submit();
}


function marcarTudoVaga() {
    if ($(".checkbox_vaga").prop("checked") == true) {
        $(".checkbox_vaga").prop("checked", false);
    } else {
        $(".checkbox_vaga").prop("checked", true);
    }
}
