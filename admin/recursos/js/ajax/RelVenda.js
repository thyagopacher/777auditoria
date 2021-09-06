/* 
 * @author Thyago Henrique Pacher - thyago.pacher@gmail.com
 */

function abreRelatorioVenda(tipo) {
    if(tipo === 1){
        document.frelvenda.tipo.value = "pdf";
    }else if(tipo === 2){
        document.frelvenda.tipo.value = "xls";
    }
    document.getElementById("frelvenda").submit();
}

function procurarVenda(acao) {
    $.ajax({
        url: "../control/ProcurarVenda.php",
        type: "POST",
        data: $("#frelvenda").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data === "") {
                swal("Atenção", "Nada encontrado de vendas!", "error");
            }
            document.getElementById("listagemVenda").innerHTML = data;
            dataTablePadrao('table_venda');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function procurarVendaPagSeguro(acao) {
    $.ajax({
        url: "../control/ProcurarVendaPagSeguro.php",
        type: "POST",
        data: $("#frelvenda").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data === "") {
                swal("Atenção", "Nada encontrado de vendas!", "error");
            }
            document.getElementById("listagemVenda").innerHTML = data;
            dataTablePadrao('tabela_pagseguro');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}