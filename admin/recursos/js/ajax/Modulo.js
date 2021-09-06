function salvarModulo() {
    if (document.fmodulo.nome.value !== null && document.fmodulo.nome.value !== ""
            && document.fmodulo.titulo.value !== null && document.fmodulo.titulo.value !== "") {
        $.ajax({
            url: "../control/SalvarModulo.php",
            type: "POST",
            data: $("#fmodulo").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao === true) {
                    swal("Módulo salvo", data.mensagem, "success");
                    procurarModulo(true);
                } else if (data.situacao === false) {
                    swal("Erro ao salvo", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro ao salvo", "Erro causado por:" + errorThrown, "error");
            }
        });
    } else if (document.fmodulo.nome.value === null || document.fmodulo.nome.value === "") {
        swal("Campo em branco", "Por favor preencha o nome para o módulo!", "error");
    } else if (document.fmodulo.titulo.value === null || document.fmodulo.titulo.value === "") {
        swal("Campo em branco", "Por favor preencha o titulo para o módulo!", "error");
    }
}

function excluirModulo(codmodulo) {
    if (typeof (codmodulo) == "codmodulo") {//test do parametro opcional
        codmodulo = document.fmodulo.codmodulo.value;
    }        
    if (window.confirm("Deseja realmente excluir esse modulo?")) {
        if (document.getElementById("codmodulo").value !== null && document.getElementById("codmodulo").value !== "") {
            $.ajax({
                url: "../control/ExcluirModulo.php",
                type: "POST",
                data: {codmodulo: document.getElementById("codmodulo").value},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Módulo excluido", data.mensagem, "success");
                        procurarModulo(true);
                    } else if (data.situacao === false) {
                        swal("Erro ao excluir", data.mensagem, "error");
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                }
            });
        } else {
            swal("Campo em branco", "Por favor escolha um módulo para excluir!", "error");
        }
    }
}

function procurarModulo(acao){
    $("#carregando").show();
    $.ajax({
        url: "../control/ProcurarModulo2.php",
        type: "POST",
        data: {nome: ""},
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if(acao === false && data === ""){
                swal("Atenção", "Nada encontrado!", "error");
            }
            document.getElementById("listagemModulo").innerHTML = data;
            dataTablePadrao('table_modulo');
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao procurar", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function excluirModulo2(codmodulo) {
    if (window.confirm("Deseja realmente excluir esse modulo?")) {
        if (codmodulo !== null && codmodulo !== "") {
            $.ajax({
                url: "../control/ExcluirModulo.php",
                type: "POST",
                data: {codmodulo: codmodulo},
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.situacao === true) {
                        swal("Módulo excluido", data.mensagem, "success");
                        procurar(true);
                    } else if (data.situacao === false) {
                        swal("Erro ao excluir", data.mensagem, "error");
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                }
            });
        } else {
            swal("Campo em branco", "Por favor escolha um módulo para excluir!", "error");
        }
    }
}

function setaEditarModulo(modulo) {
    document.fmodulo.codmodulo.value = modulo[0];
    document.fmodulo.nome.value = modulo[1];
    document.fmodulo.titulo.value = modulo[2];
    document.fmodulo.icone.value = modulo[3];
    $("#btatualizarModulo").css("display", "");
    $("#btexcluirModulo").css("display", "");
    $("#btinserirModulo").css("display", "none");
}

function btNovoModulo() {
    document.fmodulo.codmodulo.value = "";
    document.fmodulo.nome.value = "";
    document.fmodulo.titulo.value = "";
    $("#btatualizarModulo").css("display", "none");
    $("#btexcluirModulo").css("display", "none");
    $("#btinserirModulo").css("display", "");
}

procurarModulo(false);