function salvarInstrutor() {
    $("#btsalvarInstrutor").prop("disabled", true);
    $.ajax({
        url: "../control/SalvarInstrutor.php",
        type: "POST",
        data: $("#finstrutor").serialize(),
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Instrutor atualizado", data.mensagem, "success");
                $("#btsalvarInstrutor").prop("disabled", false);
                procurarInstrutor(true);
            } else if (data.situacao === false) {
                swal("Erro ao atualizar", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao atualizar", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function excluirInstrutor(codinstrutor) {
    if (typeof (codinstrutor) == "codinstrutor") {//test do parametro opcional
        codinstrutor = $("#codinstrutor").val();
    }      
    if (window.confirm("Deseja realmente excluir esse instrutor?")) {
        if (codinstrutor !== null && codinstrutor !== "") {
            $.ajax({
                url: "../control/ExcluirInstrutor.php",
                type: "POST",
                data: {codinstrutor: codinstrutor},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Instrutor excluido", data.mensagem, "success");
                        procurarInstrutor(true);
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

function excluirInstrutors() {
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
                url: "../control/ExcluirInstrutor.php",
                type: "POST",
                data: $("#fProcurarNivel").serialize(),
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao == true) {
                        swal("Instrutor excluido", data.mensagem, "success");
                        procurarInstrutor(true);
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

function procurarInstrutor(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarInstrutor.php",
        type: "POST",
        data: $("#fpinstrutor").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data == "") {
                swal("Atenção", "Nada encontrado!", "error");
            }
            document.getElementById("listagemInstrutor").innerHTML = data;
            dataTablePadrao('table_instrutor');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function abreRelatorioInstrutor(tipo) {
    if(tipo === 1){
        document.getElementById("tipo").value = "pdf";
    }else if(tipo === 2){
        document.getElementById("tipo").value = "xls";
    }
    document.getElementById("fpinstrutor").submit();
}