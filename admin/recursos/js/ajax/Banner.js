function excluirBanner(codbanner) {
    if (typeof (codbanner) == "codbanner") {//test do parametro opcional
        codbanner = document.fbanner.codbanner.value;
    }    
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa banner!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            if (codbanner !== null && codbanner !== "") {
                $.ajax({
                    url: "../control/ExcluirBanner.php",
                    type: "POST",
                    data: {codbanner: codbanner},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.situacao === true) {
                            swal("Banner excluida", data.mensagem, "success");
                            procurarBanner(true);
                        } else if (data.situacao === false) {
                            swal("Erro ao excluir", data.mensagem, "error");
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                    }
                });
            } else {
                swal("Campo em branco", "Por favor escolha o banner para excluir!", "error");
            }
        }
    });
}

function procurarBanner(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarBanner.php",
        type: "POST",
        data: $("#fPbanner").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data === "") {
                swal("Atenção", "Nada encontrado de banners!", "error");
            }
            document.getElementById("listagemBanner").innerHTML = data;
            dataTablePadrao('table_banner');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function abreRelatorioBanner(tipo) {
    if(tipo === 1){
        document.fPbanner.tipo.value = "pdf";
    }else if(tipo === 2){
        document.fPbanner.tipo.value = "xls";
    }
    document.getElementById("fPbanner").submit();
}

$(function () {
   
    $("#fbanner").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var progress = $(".progress");
    var progressbar = $("#progressbar");
    var sronly = $("#sronly");

    $('#fbanner').ajaxForm({
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
                if ($("#codbanner").val() !== null && $("#codbanner").val() !== "") {
                    swal("Alteração", data.mensagem, "success");
                    if (data.imagem !== null && data.imagem !== "") {
                        $("#imagemCarregada").html("<img width='150' src='../arquivos/" + data.imagem + "'  alt='Imagem usuário'/>");
                    }

                } else {
                    swal("Cadastro", data.mensagem, "success");
                }
                procurarBanner(true);
                progress.hide();
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });
});
