/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function getEndereco() {
    // Se o campo CEP n�o estiver vazio
    if ($.trim($("#cep").val()) !== "") {
        $.getScript("http://cep.republicavirtual.com.br/web_cep.php?formato=javascript&cep=" + $("#cep").val(), function() {
            if (resultadoCEP["resultado"]) {
                $("#tipologradouro").val(unescape(resultadoCEP["tipo_logradouro"]));
                $("#logradouro").val(unescape(resultadoCEP["logradouro"]));
                $("#bairro").val(unescape(resultadoCEP["bairro"]));
                $("#cidade").val(unescape(resultadoCEP["cidade"]));
                $("#estado").val(unescape(resultadoCEP["uf"]));
            } else {
                alert("Endereço não encontrado");
            }
        });
    }
}