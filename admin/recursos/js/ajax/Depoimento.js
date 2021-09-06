function salvarDepoimento() {
    $.ajax({
        url: "../control/SalvarDepoimento.php",
        type: "POST",
        data: $("#fdepoimento").serialize(),
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Depoimento atualizado", data.mensagem, "success");
                procurarDepoimento(true);
            } else if (data.situacao === false) {
                swal("Erro ao atualizar", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao atualizar", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function excluirDepoimento(coddepoimento) {
    if (typeof (coddepoimento) == "coddepoimento") {//test do parametro opcional
        coddepoimento = $("#coddepoimento").val();
    }      
    if (window.confirm("Deseja realmente excluir esse depoimento?")) {
        if (coddepoimento !== null && coddepoimento !== "") {
            $.ajax({
                url: "../control/ExcluirDepoimento.php",
                type: "POST",
                data: {coddepoimento: coddepoimento},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Depoimento excluido", data.mensagem, "success");
                        procurarDepoimento(true);
                    } else if (data.situacao === false) {
                        swal("Erro ao excluir", data.mensagem, "error");
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                }
            });
        } else {
            swal("Campo em branco", "Por favor escolha a página para excluir!", "error");
        }
    }
}

function excluirDepoimentos() {
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa página!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                url: "../control/ExcluirDepoimento.php",
                type: "POST",
                data: $("#fProcurarNivel").serialize(),
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao == true) {
                        swal("Depoimento excluido", data.mensagem, "success");
                        procurarDepoimento(true);
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

function procurarDepoimento(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarDepoimento.php",
        type: "POST",
        data: $("#fpdepoimento").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data == "") {
                swal("Atenção", "Nada encontrado!", "error");
            }
            document.getElementById("listagemDepoimento").innerHTML = data;
            dataTablePadrao('table_depoimento');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function abreRelatorioDepoimento(tipo) {
    if(tipo === 1){
        document.getElementById("tipo").value = "pdf";
    }else if(tipo === 2){
        document.getElementById("tipo").value = "xls";
    }
    document.getElementById("fpdepoimento").submit();
}