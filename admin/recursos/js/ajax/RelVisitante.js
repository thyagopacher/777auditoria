/* 
 * @author Thyago Henrique Pacher - thyago.pacher@gmail.com
 */

function abreRelatorioVisitante(tipo) {
    if(tipo === 1){
        document.frelvisitante.tipo.value = "pdf";
    }else if(tipo === 2){
        document.frelvisitante.tipo.value = "xls";
    }
    document.getElementById("frelvisitante").submit();
}

function procurarVisitante(acao) {
    $.ajax({
        url: "../control/ProcurarVisitante.php",
        type: "POST",
        data: $("#frelvisitante").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data === "") {
                swal("Atenção", "Nada encontrado de visitantes!", "error");
            }
            document.getElementById("listagemVisitante").innerHTML = data;
            dataTablePadrao('table_visitante');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}