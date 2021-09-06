function salvarCategoriaPessoa() {
    $.ajax({
        url: "../control/SalvarCategoriaPessoa.php",
        type: "POST",
        data: $("#fcategoria").serialize(),
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Cat. Pessoa atualizada", data.mensagem, "success");
                procurarCategoriaPessoa(true);
            } else if (data.situacao === false) {
                swal("Erro ao atualizar", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao atualizar", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function excluirCategoriaPessoa(codcategoria) {
    if (typeof (codcategoria) == "codcategoria") {//test do parametro opcional
        codcategoria = $("#codcategoria").val();
    }      
    if (window.confirm("Deseja realmente excluir essa pagina?")) {
        if (document.getElementById("codcategoria").value !== null && document.getElementById("codcategoria").value !== "") {
            $.ajax({
                url: "../control/ExcluirCategoriaPessoa.php",
                type: "POST",
                data: {codcategoria: document.getElementById("codcategoria").value},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Cat. Pessoa excluida", data.mensagem, "success");
                        procurarCategoriaPessoa(true);
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

function excluirCategoriaPessoas() {
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
                url: "../control/ExcluirCategoriaPessoa.php",
                type: "POST",
                data: $("#fProcurarNivel").serialize(),
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao == true) {
                        swal("CategoriaPessoa excluida", data.mensagem, "success");
                        procurarCategoriaPessoa(true);
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

function setaEditarCategoriaPessoa(pagina) {
    document.getElementById("codcategoriaCategoriaPessoa").value = pagina[0];
    document.getElementById("nomeCategoriaPessoa").value = pagina[1];
    document.getElementById("titulo").value = pagina[2];
    document.getElementById("link").value = pagina[3];
    document.getElementById("abreaolado").value = pagina[5];
    $("#codmodulo option[value='" + pagina[4] + "']").attr("selected", true);
    $("#btatualizarPagamento").css("display", "");
    $("#btexcluirPagamento").css("display", "");
    $("#btinserirPagamento").css("display", "none");
    $("#tabs").tabs({
        active: 2
    });
}

function procurarCategoriaPessoa(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarCategoriaPessoa.php",
        type: "POST",
        data: $("#fppagina").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data == "") {
                swal("Atenção", "Nada encontrado!", "error");
            }
            document.getElementById("listagemCategoriaPessoa").innerHTML = data;
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function marcarTudoCategoriaPessoa() {
    if ($(".checkbox_pagina").prop("checked") == true) {
        $(".checkbox_pagina").prop("checked", false);
    } else {
        $(".checkbox_pagina").prop("checked", true);
    }
}
