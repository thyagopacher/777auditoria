function salvarTextoAreaAluno() {
    $.ajax({
        url: "../control/SalvarTextoAreaAluno.php",
        type: "POST",
        data: $("#ftexto").serialize(),
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Texto salvo", data.mensagem, "success");
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao salvar", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function procurarTextoAreaAluno() {
    $.ajax({
        url: "../control/ProcurarTextoAreaAluno.php",
        type: "POST",
        dataType: 'json',
        data: {tipo: $("#tipoTexto").val()},
        success: function (data, textStatus, jqXHR) {
            document.ftexto.codtexto.value = data.codtexto;
            document.ftexto.texto.value = data.texto;
            tinyMCE.get('texto_area_aluno').setContent(data.texto);

        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function marcarTudoTextoAreaAluno() {
    if ($(".checkbox_pagina").prop("checked") == true) {
        $(".checkbox_pagina").prop("checked", false);
    } else {
        $(".checkbox_pagina").prop("checked", true);
    }
}

$(document).ready(function () {

    $("#tipoTexto").change(function(){
        procurarTextoAreaAluno();
    });

});