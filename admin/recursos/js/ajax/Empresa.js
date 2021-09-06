function procurarEmpresa(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarEmpresa.php",
        type: "POST",
        data: $("#fpempresa").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao === false && data === "") {
                swal("Atenção", "Nada encontrado!", "error");
            }
            if (document.getElementById("listagemEmpresa") != null) {
                document.getElementById("listagemEmpresa").innerHTML = data;
            }
            dataTablePadrao('table_empresa');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function excluirEmpresa(codempresa) {
    if (typeof (codempresa) == "undefined") {//test do parametro opcional
        codempresa = $("#codproduto").val();
    }
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa produto!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        cancelButtonText: "Não",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            if (codempresa !== null && codempresa !== "") {
                $.ajax({
                    url: "../control/ExcluirEmpresa.php",
                    type: "POST",
                    data: {codempresa: codempresa},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.situacao === true) {
                            swal("Empresa excluida", data.mensagem, "success");
                            procurarEmpresa(false);
                        } else if (data.situacao === false) {
                            swal("Erro ao excluir", data.mensagem, "error");
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                    }
                });
            } else {
                swal("Campo em branco", "Por favor escolha uma empresa para excluir!", "error");
            }
        }
    });
}

function btNovoEmpresa() {
    location.href = "Empresa.php";
}

function abreRelatorioEmpresa(tipo) {
    if (tipo === 1) {
        document.getElementById("tipo").value = "pdf";
    } else if (tipo === 2) {
        document.getElementById("tipo").value = "xls";
    }
    document.getElementById("fpempresa").submit();
}

/**daqui para baixa responsável pelo ajax de inserir ou atualizar empresa e também pelo upload sem redirecionar página*/
(function () {
    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $("#fempresa").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    $('#fempresa').ajaxForm({
        beforeSend: function () {
            status.empty();
            bar.width('0%');
            percent.html('0%');
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
                setTimeout('location.href="Empresa.php?codempresa=' + $("#codempresa").val() + '";', 1500);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });

})();