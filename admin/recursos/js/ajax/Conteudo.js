function salvarConteudo() {
    $.ajax({
        url: "../control/SalvarConteudo.php",
        type: "POST",
        data: $("#fconteudo").serialize(),
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Conteudo salvo", data.mensagem, "success");
                procurarConteudo(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function excluirConteudo(codconteudo) {
    if (typeof (codconteudo) == "codconteudo") {//test do parametro opcional
        codconteudo = $("#codconteudo").val();
    }      
    if (window.confirm("Deseja realmente excluir esse conteúdo?")) {
        if (codconteudo !== null && codconteudo !== "") {
            $.ajax({
                url: "../control/ExcluirConteudo.php",
                type: "POST",
                data: {codconteudo: codconteudo},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Conteudo excluido", data.mensagem, "success");
                        procurarConteudo(true);
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

function excluirConteudos() {
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
                url: "../control/ExcluirConteudo.php",
                type: "POST",
                data: $("#fProcurarNivel").serialize(),
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao == true) {
                        swal("Conteudo excluido", data.mensagem, "success");
                        procurarConteudo(true);
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

function procurarConteudo(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarConteudo.php",
        type: "POST",
        data: $("#fpconteudo").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data == "") {
                swal("Atenção", "Nada encontrado!", "error");
            }
            document.getElementById("listagemConteudo").innerHTML = data;
            dataTablePadrao('table_conteudo');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function abreRelatorioConteudo(tipo) {
    if(tipo === 1){
        document.fpconteudo.tipo.value = "pdf";
    }else if(tipo === 2){
        document.fpconteudo.tipo.value = "xls";
    }
    document.getElementById("fpconteudo").submit();
}

$(function () {

    var progress = $(".progress");
    var progressbar = $("#progressbar");
    var sronly = $("#sronly");
   
    $("#fconteudo").submit(function () {
        progress.css("visibility", "visible");
    });
    
    $('#fconteudo').ajaxForm({
        beforeSend: function () {
            progress.show();
            var percentVal = '0%';
            progressbar.width(percentVal);
            sronly.html(percentVal + ' Completo');
        },
        uploadProgress: function (event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            progressbar.width(percentVal);
            sronly.html(percentVal + ' Completo');
        },
        success: function () {
            var percentVal = '100%';
            progressbar.width(percentVal);
            sronly.html(percentVal + ' Completo');
        },
        complete: function (xhr) {
            var data = JSON.parse(xhr.responseText);
            if (data.situacao === true) {
                swal("Cadastro", data.mensagem, "success");
                procurarConteudo(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
            progress.hide();
        }
    });
});
