function salvarPlano() {
    if ($("#nomePlano").val() !== null && $("#nomePlano").val() !== "") {
        $.ajax({
            url: "../control/SalvarPlano.php",
            type: "POST",
            data: $("#fplano").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao === true) {
                    swal("Tipo Pagamento salvo", data.mensagem, "success");
                    procurarPlano(true);
                    novoPlano();
                } else if (data.situacao === false) {
                    swal("Erro", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro ao salvar", "Erro causado por:" + errorThrown, "error");
            }
        });
    } else if ($("#nomePlano").val() === null || $("#nomePlano").val() === "") {
        swal("Campo em branco", "Por favor escolha um nome!", "error");
    }
}

function excluirPlano(codplano) {
    if (typeof (codplano) == "codplano") {//test do parametro opcional
        codplano = $("#codplano").val();
    }
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações desse plano!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Sim, exclua ele!",
        cancelButtonText: "Não",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            if (codplano !== null && codplano !== "") {
                $.ajax({
                    url: "../control/ExcluirPlano.php",
                    type: "POST",
                    data: {codplano: codplano},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.situacao === true) {
                            swal("Tipo Pagamento excluido", data.mensagem, "success");
                            procurarPlano(true);
                        } else if (data.situacao === false) {
                            swal("Erro", data.mensagem, "error");
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                    }
                });
            } else {
                swal("Campo em branco", "Por favor escolha o plano de pagamento para excluir!", "error");
            }
        }
    });
}

function setaEditarPlano(plano) {
    document.getElementById("codplanoPlano").value = plano[0];
    document.getElementById("nomePlano").value = plano[1];
    document.getElementById("valorPlano").value = plano[2];
    document.getElementById("mesesPlano").value = plano[3];

    $("#btatualizarPlano").css("display", "");
    $("#btexcluirPlano").css("display", "");
    $("#btinserirPlano").css("display", "none");
}

function novoPlano() {
    document.getElementById("codplanoPlano").value = '';
    document.getElementById("nomePlano").value = '';
    document.getElementById("valorPlano").value = '';
    document.getElementById("mesesPlano").value = '';
    $("#imagem").val('');
    $("#btexcluirPlano").css("display", "none");
}

function procurarPlano(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarPlano.php",
        type: "POST",
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data == "") {
                swal("Atenção", "Nada encontrado!", "error");
            }
            document.getElementById("listagemPlano").innerHTML = data;
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

$(document).ready(function () {
    procurarPlano();

    $("#fplano").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#fplano').ajaxForm({
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
                if ($("#codplano").val() !== null && $("#codplano").val() !== "") {
                    swal("Alteração", data.mensagem, "success");
                } else {
                    swal("Cadastro", data.mensagem, "success");
                }
                novoPlano();
                procurarPlano();
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });
});