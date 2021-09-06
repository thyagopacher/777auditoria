function salvarConfiguracao() {
    $.ajax({
        url: "../control/SalvarConfiguracao.php",
        type: "POST",
        data: $("#fconfiguracao").serialize(),
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Configuração salva", data.mensagem, "success");
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function excluirConfiguracao() {
    if (window.confirm("Deseja realmente excluir essa configuracao?")) {
        if (document.getElementById("codconfiguracao").value !== null && document.getElementById("codconfiguracao").value !== "") {
            $.ajax({
                url: "../control/ExcluirConfiguracao.php",
                type: "POST",
                data: {codconfiguracao: document.getElementById("codconfiguracao").value},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Configuração excluida", data.mensagem, "success");
                    } else if (data.situacao === false) {
                        swal("Erro ao excluir", data.mensagem, "error");
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                }
            });
        } else {
            swal("Atenção", "Informações não vieram para excluir!", "error");
        }
    }
}

function setaEditarConfiguracao(configuracao) {
    document.getElementById("codconfiguracaoConfiguracao").value = configuracao[0];
    document.getElementById("nomeConfiguracao").value = configuracao[1];
    document.getElementById("titulo").value = configuracao[2];
    document.getElementById("link").value = configuracao[3];
    document.getElementById("abreaolado").value = configuracao[5];
    $("#codmodulo option[value='" + configuracao[4] + "']").attr("selected", true);
    $("#btatualizarPagamento").css("display", "");
    $("#btexcluirPagamento").css("display", "");
    $("#btinserirPagamento").css("display", "none");
    $("#tabs").tabs({
        active: 2
    });
}

$(function () {
    $("#fconfiguracao").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#fconfiguracao').ajaxForm({
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
                swal("Configuração", data.mensagem, "success");
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });
});
