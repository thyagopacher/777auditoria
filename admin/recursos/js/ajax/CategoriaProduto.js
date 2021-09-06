function salvarCategoriaProduto() {
    if ($("#nomeCategoriaProduto").val() !== null && $("#nomeCategoriaProduto").val() !== "") {
        $.ajax({
            url: "../control/SalvarCategoriaProduto.php",
            type: "POST",
            data: $("#fcategoria").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao === true) {
                    swal("Cat. Produto cadastrada", data.mensagem, "success");
                    window.localStorage.removeItem('optionCategoriaProduto');
                    window.localStorage.removeItem('listagemCategoriaProduto');
                    procurarCategoriaProduto(true);
                    optionCategoriaProduto();
                } else if (data.situacao === false) {
                    swal("Erro", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro", "Erro causado por:" + errorThrown, "error");
            }
        });
    } else if ($("#nomeCategoriaProduto").val() === null || $("#nomeCategoriaProduto").val() === "") {
        swal("Campo em branco", "Por favor escolha um nome!", "error");
    }
}

function excluirCategoriaProduto(codcategoria) {
    if (typeof (codcategoria) == "codcategoria") {//test do parametro opcional
        codcategoria = $("#codcategoriaCategoria").val();
    }
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa categoria!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            if (codcategoria !== null && codcategoria !== "") {
                $.ajax({
                    url: "../control/ExcluirCategoriaProduto.php",
                    type: "POST",
                    data: {codcategoria: codcategoria},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.situacao === true) {
                            swal("Categoria produto excluida", data.mensagem, "success");
                            window.localStorage.removeItem('optionCategoriaProduto');
                            window.localStorage.removeItem('listagemCategoriaProduto');
                            procurarCategoriaProduto(true);
                            optionCategoriaProduto();

                        } else if (data.situacao === false) {
                            swal("Erro", data.mensagem, "error");
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        swal("Erro", "Erro causado por:" + errorThrown, "error");
                    }
                });
            } else {
                swal("Campo em branco", "Por favor escolha o categoria para excluir!", "error");
            }
        }
    });

}

function excluirCategoriaProdutos() {
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa cat. produto!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                url: "../control/ExcluirCategoriaProduto.php",
                type: "POST",
                data: $("#fProcurarNivel").serialize(),
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao == true) {
                        swal("Categoria Produto excluida", data.mensagem, "success");
                        procurarCategoriaProduto(true);
                        window.localStorage.removeItem('optionCategoriaProduto');
                        window.localStorage.removeItem('listagemCategoriaProduto');
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

function setaEditarCategoriaProduto(categoria) {
    document.getElementById("nomeCategoriaProduto").focus();
    document.getElementById("codcategoriaCategoria").value = categoria[0];
    document.getElementById("nomeCategoriaProduto").value = categoria[1];
    document.getElementById("META_DESCRIPTION_CATEGORIA").value = categoria[2];
    document.getElementById("META_KEYWORDS_CATEGORIA").value = categoria[3];
    
    document.getElementById("menuCategoria").value = categoria[4];
    document.getElementById("menuCategoriaOutros").value = categoria[6];
    document.fcategoria.desconto.value = categoria[7];

    if (categoria[5] != "") {
        document.getElementById("visualiza_imagem_categoria").src = "/site3/arquivos/" + categoria[5];
        $("#visualiza_imagem_categoria").css("display", "");
    } else {
        $("#visualiza_imagem_categoria").css("display", "none");
    }
    $("#btexcluirCategoriaProduto").css("display", "");
}

function novoCategoriaProduto() {
    document.getElementById("codcategoriaCategoria").value = '';
    document.getElementById("nomeCategoriaProduto").value = '';
    document.getElementById("META_DESCRIPTION_CATEGORIA").value = '';
    document.getElementById("META_KEYWORDS_CATEGORIA").value = '';
    document.getElementById("menuCategoriaOutros").value = '';
    document.getElementById("menuCategoriaOutros").value = '';
    document.getElementById("desconto").value = '';
    $("#btexcluirCategoriaProduto").css("display", "none");
}

function procurarCategoriaProduto(acao) {
    if (window.localStorage.getItem("listagemCategoriaProduto") == null || window.localStorage.getItem("listagemCategoriaProduto") == "") {
        $.ajax({
            url: "../control/ProcurarCategoriaProduto.php",
            type: "POST",
            dataType: 'text',
            success: function (data, textStatus, jqXHR) {
                if (acao == false && data == "") {
                    swal("Atenção", "Nada encontrado!", "error");
                }
                document.getElementById("listagemCategoriaProduto").innerHTML = data;
                window.localStorage.setItem('listagemCategoriaProduto', data);
                dataTablePadrao('table_categoria_produto');
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
            }
        });
    } else {
        document.getElementById("listagemCategoriaProduto").innerHTML = window.localStorage.getItem("listagemCategoriaProduto");
        dataTablePadrao('table_categoria_produto');
    }
}

function optionCategoriaProduto() {
    if (window.localStorage.getItem("optionCategoriaProduto") == null || window.localStorage.getItem("optionCategoriaProduto") == "") {
        $.ajax({
            url: "../control/OptionCategoriaProduto.php",
            type: "POST",
            dataType: 'text',
            success: function (data, textStatus, jqXHR) {
                document.fproduto.codcategoria.innerHTML = data;
                window.localStorage.setItem('optionCategoriaProduto', data);
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
            }
        });
    } else {
        document.fproduto.codcategoria.innerHTML = window.localStorage.getItem("optionCategoriaProduto");
    }
}

function marcarTudoCategoriaProduto() {
    if ($(".checkbox_pagina").prop("checked") == true) {
        $(".checkbox_pagina").prop("checked", false);
    } else {
        $(".checkbox_pagina").prop("checked", true);
    }
}

$(document).ready(function () {
    procurarCategoriaProduto();

    $("#fcategoria").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#fcategoria').ajaxForm({
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
                if ($("#codcategoria").val() !== null && $("#codcategoria").val() !== "") {
                    swal("Alteração", data.mensagem, "success");
                } else {
                    swal("Cadastro", data.mensagem, "success");
                }
                window.localStorage.removeItem('optionCategoriaProduto');
                window.localStorage.removeItem('listagemCategoriaProduto');
                procurarCategoriaProduto();
                optionCategoriaProduto();
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });
});