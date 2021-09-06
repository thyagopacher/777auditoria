/* 
 * @author Thyago Henrique Pacher - thyago.pacher@gmail.com
 */

function validaFormCurriculo() {
    var res = true;
    var array_valida = new Array("cargo", "empregado", "windows", "office");
    var qtd_array = array_valida.length;
    for (var i = 0; i < qtd_array; i++) {
        if ($("#" + array_valida[i]).val() == null || $("#" + array_valida[i]).val() == "") {
            $("#" + array_valida[i]).focus();
            res = false;
            break;
        }
    }
    return res;
}

function enviarCurriculo() {
    if (validaFormCurriculo()) {
        $.ajax({
            url: "../control/SalvarCurriculo.php",
            type: "POST",
            data: $("#fperfil").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao === true) {
                    swal("Curriculo salvo", data.mensagem, "success");
                } else if (data.situacao === false) {
                    swal("Erro", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro", "Erro causado por:" + errorThrown, "error");
            }
        });
    }
}

$(function () {
    $("#btcadastrar-curriculo").click(function () {
        enviarCurriculo();
    });
});