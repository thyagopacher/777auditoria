function salvarComboProduto() {
    if ($("#nomeComboProduto").val() !== null && $("#nomeComboProduto").val() !== "") {
        $.ajax({
            url: "../control/SalvarComboProduto.php",
            type: "POST",
            data: $("#fcombo").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao === true) {
                    swal("Combo Produto salvar", data.mensagem, "success");
                    novoComboProduto();
                    procurarComboProduto(true);
                } else if (data.situacao === false) {
                    swal("Erro", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro", "Erro causado por:" + errorThrown, "error");
            }
        });
    } else if ($("#nomeComboProduto").val() === null || $("#nomeComboProduto").val() === "") {
        swal("Campo em branco", "Por favor escolha um nome!", "error");
    }
}

function excluirComboProduto() {
    if (window.confirm("Deseja realmente excluir esse combo produto?")) {
        if (document.getElementById("codcombo").value !== null && document.getElementById("codcombo").value !== "") {
            $.ajax({
                url: "../control/ExcluirComboProduto.php",
                type: "POST",
                data: {codcombo: document.getElementById("codcombo").value},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Combo Produto excluido", data.mensagem, "success");
                        novoComboProduto();
                        procurarComboProduto(true);
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

function excluir2ComboProduto(codcombo) {
    if (window.confirm("Deseja realmente excluir esse combo produto?")) {
        if (codcombo !== null && codcombo !== "") {
            $.ajax({
                url: "../control/ExcluirComboProduto.php",
                type: "POST",
                data: {codcombo: codcombo},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Combo Produto excluida", data.mensagem, "success");
                        novoComboProduto();
                        procurarComboProduto(true);
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

function excluirComboProdutos() {
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa combo produto!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                url: "../control/ExcluirComboProduto.php",
                type: "POST",
                data: $("#fProcurarNivel").serialize(),
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao == true) {
                        swal("Combo Produto excluida", data.mensagem, "success");
                        novoComboProduto();
                        procurarComboProduto(true);
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

function setaEditarComboProduto(combo) {
    document.getElementById("codcomboCombo").value = combo[0];
    document.getElementById("nomeComboProduto").value = combo[1];

    $("#btexcluirComboProduto").css("display", "");
}

function novoComboProduto(){
    document.getElementById("codcomboCombo").value = '';
    document.getElementById("nomeComboProduto").value = '';

    $("#btexcluirComboProduto").css("display", "none");
}

function procurarComboProduto(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarComboProduto.php",
        type: "POST",
        data: $("#fcomboProduto").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data == "") {
                swal("Atenção", "Nada encontrado!", "error");
            }
            document.getElementById("listagemComboProduto").innerHTML = data;
            dataTablePadrao('table_combo_produto');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function marcarTudoComboProduto() {
    if ($(".checkbox_pagina").prop("checked") == true) {
        $(".checkbox_pagina").prop("checked", false);
    } else {
        $(".checkbox_pagina").prop("checked", true);
    }
}

function adicionarLinha(linha){
    var linhaProx  = parseInt(linha) + 1;
    var cursoLinha = '';
    cursoLinha += '<div id="linha'+linhaProx+'" class="form-group">';
    cursoLinha += '<label for="curso">Curso';
    cursoLinha += '- É Combo? <input type="checkbox" name="ehcombo[]" id="ehcombo'+linhaProx+'" value="s"/>';
    cursoLinha += '<a href="javascript: adicionarLinha('+linhaProx+');" class="btn btn-primary">+</a>';
    cursoLinha += '<a href="javascript: removerLinha('+linhaProx+');" class="btn btn-primary">-</a>';
    cursoLinha += '</label>';
    cursoLinha += '<select name="codproduto[]" id="linhaCodigo'+linhaProx+'" class="form-control">';
    cursoLinha += $("#codProduto1").html();
    cursoLinha += '</select>';
    $("#itens_combo").append(cursoLinha);
}

function removerLinha(linha){
    $("#linha" + linha).remove();
}

$(function () {

    procurarComboProduto();

    $("#fcombo").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#fcombo').ajaxForm({
        beforeSend: function () {
            status.empty();
            var percentVal = '0%';
            bar.width(percentVal);
            percent.html(percentVal);
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
                if ($("#codcombo").val() != null && $("#codcombo").val() !== "") {
                    swal("Alteração", data.mensagem, "success");
                } else {
                    swal("Cadastro", data.mensagem, "success");
                }
                procurarComboProduto(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });
});
