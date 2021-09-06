/* 
 * @author Thyago Henrique Pacher - thyago.pacher@gmail.com
 */

function abreRelatorioDemo(tipo) {
    if(tipo === 1){
        document.freldemo.tipo.value = "pdf";
    }else if(tipo === 2){
        document.freldemo.tipo.value = "xls";
    }
    document.getElementById("freldemo").submit();
}

function procurarDemo(acao) {
    $.ajax({
        url: "../control/ProcurarDemo.php",
        type: "POST",
        data: $("#freldemo").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data === "") {
                swal("Atenção", "Nada encontrado de demos!", "error");
            }
            document.getElementById("listagemDemo").innerHTML = data;
            dataTablePadrao('table_demo');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}