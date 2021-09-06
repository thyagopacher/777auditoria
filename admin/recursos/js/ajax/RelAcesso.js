/* 
 * @author Thyago Henrique Pacher - thyago.pacher@gmail.com
 */

function abreRelatorioAcesso(tipo) {
    if(tipo === 1){
        document.frelacesso.tipo.value = "pdf";
    }else if(tipo === 2){
        document.frelacesso.tipo.value = "xls";
    }
    document.getElementById("frelacesso").submit();
}

function procurarAcesso2() {
    if ($("#listagemAcesso").html() == "") {
        $('#table_acesso').DataTable({
            "order": [[0, "desc"]],
            "filter": $("#frelacesso").serialize(),
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "../control/ProcurarAcesso2.php",
                "type": "POST"
            },
            "deferRender": true,
            "columns": [
                {"data": "aluno"},
                {"data": "curso"},
                {"data": "data_compra"},
                {"data": "data_ativacao"},
                {"data": "nota"},
                {"data": "pct"},
                {"data": "qtd_provas"},
                {"data": "certificado"}
            ],
            "buttons": [
                {
                    extend: 'excel',
                    text: 'Save current page',
                    exportOptions: {
                        modifier: {
                            page: 'current'
                        }
                    }
                }
            ]
        });
    }else{
        $('#table_acesso').DataTable().search($("#frelacesso").serialize()).draw();        
    }
}

function procurarAcesso(acao) {
    $.ajax({
        url: "../control/ProcurarAcesso.php",
        type: "POST",
        data: $("#frelacesso").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao == false && data === "") {
                swal("Atenção", "Nada encontrado de acessos!", "error");
            }
            document.getElementById("listagemAcesso").innerHTML = data;
            dataTablePadrao('table_acesso');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro", "Erro causado por:" + errorThrown, "error");
        }
    });
}

$(function() {
    $("#cnpj").change(function(){
        $('#table_acesso').DataTable().search($("#frelacesso").serialize()).draw();
    });
});
     