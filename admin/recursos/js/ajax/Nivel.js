function salvarNivel() {
    if ($("#nome").val() !== null && $("#nome").val() !== "") {
        $.ajax({
            url: "../control/SalvarNivel.php",
            type: "POST",
            data: $("#fnivel").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao === true) {
                    swal("Nivel salvo", data.mensagem, "success");
                    procurarNivel(true);
                } else if (data.situacao === false) {
                    swal("Erro", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro", "Erro causado por:" + errorThrown, "error");
            }
        });
    } else if ($("#nome").val() === null || $("#nome").val() === "") {
        swal("Campo em branco", "Por favor defina um nome para o nível!", "error");
    }
}

function excluirNivel(codnivel) {
    if (typeof (codnivel) == "codnivel") {//test do parametro opcional
        codnivel = $("#codnivel").val();
    }
    if (window.confirm("Deseja realmente excluir esse nivel?")) {
        if (document.getElementById("codnivel").value !== null && document.getElementById("codnivel").value !== "") {
            $.ajax({
                url: "../control/ExcluirNivel.php",
                type: "POST",
                data: {codnivel: document.getElementById("codnivel").value},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Nivel excluido", data.mensagem, "success");
                        procurarNivel(true);
                    } else if (data.situacao === false) {
                        swal("Erro ao excluir", data.mensagem, "error");
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                }
            });
        } else {
            swal("Campo em branco", "Por favor escolha o nivel para excluir!", "error");
        }
    }
}

function procurarNivel(acao) {
    if (document.getElementById("listagemNivel") != null) {
        $("#carregando").show();
        $.ajax({
            url: "../control/ProcurarNivel3.php",
            type: "POST",
            data: $("#fProcurarNivel").serialize(),
            dataType: 'text',
            success: function (data, textStatus, jqXHR) {
                if (acao == false && data === "") {
                    swal("Atenção", "Nada encontrado!", "error");
                }

                document.getElementById("listagemNivel").innerHTML = data;
                dataTablePadrao('table_nivel');
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
            }
        });
        $("#carregando").hide();
    }
}

function marcarLinhaPagina(pagina) {
    if ($("#marcar_desmarcarpg" + pagina).is(":checked")) {
        $(".pagina" + pagina).prop('checked', true);
    } else {
        $(".pagina" + pagina).prop('checked', false);
    }
}

function marcarModulo(modulo) {
    if ($("#marcar_desmarcarModulo" + modulo).is(":checked")) {
        $(".modulo" + modulo).prop('checked', true);
    } else {
        $(".modulo" + modulo).prop('checked', false);
    }
}

/**chama combo ajax para nível*/
function comboNivel() {
    if (document.getElementById("naomaster") != null) {
        $.ajax({
            url: "../control/ComboNivel.php",
            type: "POST",
            data: {naomaster: document.getElementById("naomaster").value},
            dataType: 'text',
            success: function (data, textStatus, jqXHR) {
                document.getElementById("comboNivel").innerHTML = data;
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro", "Erro ao preencher combo de nivel causado por:" + errorThrown, "error");
            }
        });
    }
}

/**chama combo ajax para nível*/
function comboNivel2() {
    $.ajax({
        url: "../control/ComboNivel2.php",
        type: "POST",
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            document.getElementById("comboNivel").innerHTML = data;
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro ao preencher combo de nivel causado por:" + errorThrown, "error");
        }
    });
}

function procurarPerfilAcesso(codnivel) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarPerfilAcesso.php",
        type: "POST",
        data: {codnivel: codnivel},
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            document.getElementById("listagemPerfilAcesso").innerHTML = data;
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function excluirNivel2(codnivel) {
    if (window.confirm("Deseja realmente excluir esse nivel?")) {
        if (codnivel !== null && codnivel !== "") {
            $.ajax({
                url: "../control/ExcluirNivel.php",
                type: "POST",
                data: {codnivel: codnivel},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Nivel excluido", data.mensagem, "success");
                        procurarNivel(true);
                    } else if (data.situacao === false) {
                        swal("Erro ao excluir", data.mensagem, "error");
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                }
            });
        } else {
            swal("Campo em branco", "Por favor escolha o nivel para excluir!", "error");
        }
    }
}

function marcarPerfil() {
    $('.checkPagina').prop('checked', true);
}

function desmarcarPerfil() {
    $('.checkPagina').prop('checked', false);
}

function escolheCombo() {
    procurarPerfilAcesso($("#codnivelPermissao option:selected").val());
    if ($("#codnivelPermissao option:selected").val() != "") {
        $("#btCopiaNivel").css("display", "");
    }
}

function salvarPerfil() {
    $.ajax({
        url: "../control/SalvaPerfil.php",
        type: "POST",
        data: $("#fperfilAcesso").serialize(),
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Nivel salvado", data.mensagem, "success");
                procurarNivel(true);
//                location.reload();
            } else if (data.situacao === false) {
                swal("Erro ao salvar", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao salvar", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function btNovo() {
    location.href = "Nivel.php";
}

function setaNivel(nivel) {
    document.getElementById("codnivel").value = nivel[0];
    document.getElementById("nome").value = nivel[1];
    $("#btatualizarNivel").css("display", "");
    $("#btexcluirNivel").css("display", "");
    $("#btnovoNivel").css("display", "");
    $("#btinserirNivel").css("display", "none");
}

function copiaPerfil() {
    $.ajax({
        url: "../control/CopiaPerfilEmpresa.php",
        type: "POST",
        data: {codnivel: $("#codnivelPermissao option:selected").val()},
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Nivel copiado", data.mensagem, "success");
            } else if (data.situacao === false) {
                swal("Erro ao copia", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao copia", "Erro causado por:" + errorThrown, "error");
        }
    });
}


/**fazendo essas funcionalidades carregarem automaticamente quando carregar o html*/
comboNivel();
procurarPerfilAcesso();
procurarNivel(true);

