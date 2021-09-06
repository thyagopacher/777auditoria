function salvarPagina() {
    if ($("#nomePagina").val() !== null && $("#nomePagina").val() !== ""
            && $('#codmodulo option:selected').val() !== null
            && $('#codmodulo option:selected').val() !== "") {
        $.ajax({
            url: "../control/SalvarPagina.php",
            type: "POST",
            data: $("#fpagina").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao === true) {
                    swal("Página cadastrada", data.mensagem, "success");
                    procurarPagina(true);
                } else if (data.situacao === false) {
                    swal("Erro ao cadastrar", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro ao cadastrar", "Erro causado por:" + errorThrown, "error");
            }
        });
    } else if ($("#nomePagina").val() === null || $("#nomePagina").val() === "") {
        swal("Campo em branco", "Por favor escolha um nome!", "error");
    } else if ($("#titulo").val() === null || $("#titulo").val() === "") {
        swal("Campo em branco", "Por favor escolha um titulo para página!", "error");
    } else if ($("#link").val() === null || $("#link").val() === "") {
        swal("Campo em branco", "Por favor escolha um link para página!", "error");
    } else if ($('#codmodulo option:selected').val() === null || $('#codmodulo option:selected').val() === "") {
        swal("Campo em branco", "Por favor escolha um módulo para página!", "error");
    }
}

function excluirPagina(codpagina) {
    if (typeof (codpagina) == "codpagina") {//test do parametro opcional
        codpagina = $("#codpagina").val();
    }         
    if (window.confirm("Deseja realmente excluir essa pagina?")) {
        if (document.getElementById("codpagina").value !== null && document.getElementById("codpagina").value !== "") {
            $.ajax({
                url: "../control/ExcluirPagina.php",
                type: "POST",
                data: {codpagina: document.getElementById("codpagina").value},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Página excluida", data.mensagem, "success");
                        procurarPagina(true);
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

function excluirPaginas() {
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
                url: "../control/ExcluirPagina.php",
                type: "POST",
                data: $("#fProcurarNivel").serialize(),
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao == true) {
                        swal("Pagina excluida", data.mensagem, "success");
                        procurarPagina(true);
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

function setaEditarPagina(pagina) {
    document.getElementById("codpaginaPagina").value = pagina[0];
    document.getElementById("nomePagina").value = pagina[1];
    document.getElementById("titulo").value = pagina[2];
    document.getElementById("link").value = pagina[3];
    document.getElementById("abreaolado").value = pagina[5];
    document.fpagina.icone.value = pagina[6];
    $("#codmodulo option[value='" + pagina[4] + "']").attr("selected", true);
    $("#btatualizarPagamento").css("display", "");
    $("#btexcluirPagamento").css("display", "");
    $("#btinserirPagamento").css("display", "none");
    $("#tabs").tabs({
        active: 2
    });
}

function procurarPagina(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarPagina2.php",
        type: "POST",
        data: $("#fppagina").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao === false && data === "") {
                swal("Atenção", "Nada encontrado!", "error");
            }
            document.getElementById("listagemPagina").innerHTML = data;
            dataTablePadrao('table_pagina');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function marcarTudoPagina() {
    if ($(".checkbox_pagina").prop("checked") == true) {
        $(".checkbox_pagina").prop("checked", false);
    } else {
        $(".checkbox_pagina").prop("checked", true);
    }
}

$(document).ready(function() {
    $('#tabela_perfil_acesso').DataTable();
} );