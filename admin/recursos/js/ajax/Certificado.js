function salvarCertificado() {
    $.ajax({
        url: "../control/SalvarCertificado.php",
        type: "POST",
        data: $("#fcertificado").serialize(),
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Certificado salvo", data.mensagem, "success");
                procurarCertificado(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function excluirCertificado(codcertificado) {
    if (typeof (codcertificado) == "codcertificado") {//test do parametro opcional
        codcertificado = $("#codcertificado").val();
    }      
    if (window.confirm("Deseja realmente excluir esse certificado?")) {
        if (codcertificado !== null && codcertificado !== "") {
            $.ajax({
                url: "../control/ExcluirCertificado.php",
                type: "POST",
                data: {codcertificado: codcertificado},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Certificado excluido", data.mensagem, "success");
                        procurarCertificado(true);
                    } else if (data.situacao === false) {
                        swal("Erro", data.mensagem, "error");
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    swal("Erro", "Erro causado por:" + errorThrown, "error");
                }
            });
        } else {
            swal("Campo em branco", "Por favor escolha a página para excluir!", "error");
        }
    }
}

function procurarCertificado(acao) {
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarCertificado.php",
        type: "POST",
        data: $("#fpcertificado").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data == "") {
                swal("Atenção", "Nada encontrado!", "error");
            }
            document.getElementById("listagemCertificado").innerHTML = data;
            dataTablePadrao('table_certificado');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function btNovoCertificado(){
    location.href='Certificado.php';
}

function abreRelatorioCertificado(tipo) {
    if(tipo === 1){
        document.getElementById("tipo").value = "pdf";
    }else if(tipo === 2){
        document.getElementById("tipo").value = "xls";
    }
    document.getElementById("fpcertificado").submit();
}

$(function () {
   
    $("#fcertificado").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#fcertificado').ajaxForm({
        beforeSend: function () {
            status.empty();
            var percentVal = '0%';
            bar.width(percentVal)
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
                swal("Cadastro", data.mensagem, "success");
                procurarCertificado(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });
});
