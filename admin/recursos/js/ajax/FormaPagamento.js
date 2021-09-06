
function excluirFormaPagamento() {
    if (window.confirm("Deseja realmente excluir essa pagina?")) {
        if (document.getElementById("codforma").value !== null && document.getElementById("codforma").value !== "") {
            $.ajax({
                url: "../control/ExcluirFormaPagamento.php",
                type: "POST",
                data: {codforma: document.getElementById("codforma").value},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Forma Pagamento excluida", data.mensagem, "success");
                        procurarFormaPagamento(true);
                        window.localStorage.removeItem('listagemFormaPagamento');
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

function excluir2FormaPagamento(codforma) {
    if (window.confirm("Deseja realmente excluir essa forma de pagamento?")) {
        if (codforma !== null && codforma !== "") {
            $.ajax({
                url: "../control/ExcluirFormaPagamento.php",
                type: "POST",
                data: {codforma: codforma},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Forma Pagamento excluida", data.mensagem, "success");
                        procurarFormaPagamento(true);
                        window.localStorage.removeItem('listagemFormaPagamento');
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

function setaEditarFormaPagamento(forma) {
    console.log(forma);
    document.getElementById("codformaTipo").value = forma[0];
    document.getElementById("nomeFormaPagamento").value = forma[1];

    $("#imagemFormaPagamento").css("display", "");
    document.getElementById("imagemFormaPagamento").src = '../arquivos/' + forma[2];
    document.getElementById("internacionalFormaPagamento").value = forma[3];
    if (forma[4] != undefined) {
        document.getElementById("tagpagseguro").value = forma[4];
    } else {
        document.getElementById("tagpagseguro").value = '';
    }
    $("#etapa3").val(forma[5]);
    $("#ehcartao").val(forma[6]);
    $("#icone_font").val(forma[7]);
    $("#btatualizarFormaPagamento").css("display", "");
    $("#btexcluirFormaPagamento").css("display", "");
    $("#btinserirFormaPagamento").css("display", "none");
}

function novoFormaPagamento() {
    document.getElementById("codformaTipo").value = '';
    document.getElementById("nomeFormaPagamento").value = '';
    document.getElementById("tagpagseguro").value = '';
    document.getElementById("imagemFormaPagamento").src = '';
    document.getElementById("imagem").value = '';
    $("#icone_font").val('');
    $("#etapa3").val('');
    $("#imagemFormaPagamento").css("display", "none");
    document.getElementById("internacionalFormaPagamento").value = 'n';

    $("#btatualizarFormaPagamento").css("display", "none");
    $("#btexcluirFormaPagamento").css("display", "none");
    $("#btinserirFormaPagamento").css("display", "");
}

function procurarFormaPagamento(acao) {
    if (document.getElementById("listagemFormaPagamento") != null) {
        if (window.localStorage.getItem("listagemFormaPagamento") == null || window.localStorage.getItem("listagemFormaPagamento") == "") {
            $("#carregando").show();
            $.ajax({
                url: "../control/ProcurarFormaPagamento.php",
                type: "POST",
                dataType: 'text',
                success: function (data, textStatus, jqXHR) {
                    if (acao == false && data == "") {
                        swal("Atenção", "Nada encontrado!", "error");
                    }
                    window.localStorage.setItem('listagemFormaPagamento', data);
                    document.getElementById("listagemFormaPagamento").innerHTML = data;
                    dataTablePadrao('table_formapagamento');
                }, error: function (jqXHR, textStatus, errorThrown) {
                    swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
                }
            });
            $("#carregando").hide();
        } else {
            document.getElementById("listagemFormaPagamento").innerHTML = window.localStorage.getItem("listagemFormaPagamento");
            dataTablePadrao('table_formapagamento');
        }
    }
}

function marcarTudoFormaPagamento() {
    if ($(".checkbox_pagina").prop("checked") == true) {
        $(".checkbox_pagina").prop("checked", false);
    } else {
        $(".checkbox_pagina").prop("checked", true);
    }
}

$(document).ready(function () {
    if ($("#listagemFormaPagamento").length) {
        $("body").append('<link rel="stylesheet" href="/site3/admin/recursos/css/jquery.dataTables.css"/>')
                .append('<script type="text/javascript" src="/site3/admin/recursos/js/jquery.dataTables.js"></script>');
    }

    procurarFormaPagamento();

    $("#fforma").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#fforma').ajaxForm({
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
                if ($("#codforma").val() !== null && $("#codforma").val() !== "") {
                    swal("Alteração", data.mensagem, "success");
                    if (data.imagem !== null && data.imagem !== "") {
                        $("#imagemCarregada").html("<img width='150' src='../arquivos/" + data.imagem + "'  alt='Imagem usuário'/>");
                    }
                } else {
                    swal("Cadastro", data.mensagem, "success");
                }
                window.localStorage.removeItem('listagemFormaPagamento');
                procurarFormaPagamento();
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });
});