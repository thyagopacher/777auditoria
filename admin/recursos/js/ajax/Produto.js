function excluirProduto(codproduto) {
    if (typeof (codproduto) == "undefined") {//test do parametro opcional
        codproduto = $("#codproduto").val();
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
            if (codproduto !== null && codproduto !== "") {
                $.ajax({
                    url: "../control/ExcluirProduto.php",
                    type: "POST",
                    data: {codproduto: codproduto},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.situacao === true) {
                            swal("Produto excluida", data.mensagem, "success");
                            procurarProduto(true);
                        } else if (data.situacao === false) {
                            swal("Erro ao excluir", data.mensagem, "error");
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                    }
                });
            } else {
                swal("Campo em branco", "Por favor escolha a produto para excluir!", "error");
            }
        }
    });
}

function procurarProduto(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarProduto.php",
        type: "POST",
        data: $("#fPproduto").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data === "") {
                swal("Atenção", "Nada encontrado de produtos!", "error");
            }
            document.getElementById("listagemProduto").innerHTML = data;
            dataTablePadrao('table_produto');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function abreRelatorioProduto(tipo) {
    if(tipo === 1){
        document.fPproduto.tipo.value = "pdf";
    }else if(tipo === 2){
        document.fPproduto.tipo.value = "xls";
    }
    document.getElementById("fPproduto").submit();
}

function aparecesiteBuscar(componente) {
    var id = componente.prop("id").replace('aparecesite', '');
    $.ajax({
        url: "../control/SalvarProduto.php",
        type: "POST",
        data: {COD_PRODUTO: id, aparecesite: componente.val()},
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Produto salvo", data.mensagem, "success");
                procurarProduto(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function ativoBuscar(componente) {
    var id = componente.prop("id").replace('IND_ATIVO', '');
    $.ajax({
        url: "../control/SalvarProduto.php",
        type: "POST",
        data: {COD_PRODUTO: id, IND_ATIVO: componente.val()},
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Produto salvo", data.mensagem, "success");
                procurarProduto(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}

$(function () {

    $("#fproduto").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#fproduto').ajaxForm({
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
                if ($("#codproduto").val() !== null && $("#codproduto").val() !== "") {
                    swal("Alteração", data.mensagem, "success");
                    if (data.imagem !== null && data.imagem !== "") {
                        $("#imagemCarregada").html("<img width='150' src='../arquivos/" + data.imagem + "'  alt='Imagem usuário'/>");
                    }

                } else {
                    swal("Cadastro", data.mensagem, "success");
                }
                procurarProduto(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });
});
