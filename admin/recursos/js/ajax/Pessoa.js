function btNovoPessoa(){
    document.fpessoa.codnivel.value = '';
    document.fpessoa.COD_USUARIO.value = '';
    document.fpessoa.NOM_USUARIO.value = '';
    document.fpessoa.DES_EMAIL.value = '';
    document.fpessoa.DES_SENHA.value = '';
    document.fpessoa.imagem.value = '';
}

function reenviarLogin(codpessoa) {
    $.ajax({
        url: "../control/ReenviarLogin.php",
        type: "POST",
        data: {codpessoa: codpessoa},
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.situacao === true) {
                swal("Login enviado", data.mensagem, "success");
                procurarPessoa(true);
            } else if (data.situacao === false) {
                swal("Erro ao enviar", data.mensagem, "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao enviar", "Erro causado por:" + errorThrown, "error");
        }
    });
}

function excluir(codpessoa) {
    if(codpessoa == undefined){
        codpessoa = $("#codusuario").val();
    }
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar as informações dessa pessoa!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            if (codpessoa !== null && codpessoa !== "") {
                $.ajax({
                    url: "../control/ExcluirPessoa.php",
                    type: "POST",
                    data: {codpessoa: codpessoa},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.situacao === true) {
                            swal("Pessoa excluida", data.mensagem, "success");
                            procurarPessoa(true);
                        } else if (data.situacao === false) {
                            swal("Erro ao excluir", data.mensagem, "error");
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                    }
                });
            } else {
                swal("Campo em branco", "Por favor escolha a pessoa para excluir!", "error");
            }
        }
    });
}

function excluirFoto(codpessoa) {
    swal({
        title: "Confirma exclusão?",
        text: "Você não poderá mais visualizar a imagem dessa pessoa!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, exclua ele!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            if (codpessoa !== null && codpessoa !== "") {
                $.ajax({
                    url: "../control/ExcluirImgPessoa.php",
                    type: "POST",
                    data: {codpessoa: codpessoa},
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.situacao === true) {
                            swal("Imagem Pessoa excluida", data.mensagem, "success");

                            $("#imagemCarregada").html("");
                        } else if (data.situacao === false) {
                            swal("Erro ao excluir", data.mensagem, "error");
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
                    }
                });
            } else {
                swal("Campo em branco", "Por favor escolha a imagem pessoa para excluir!", "error");
            }
        }
    });
}

function abreTiraFoto(codpessoa) {
    var oWin = window.open("TirarFoto.php?codpessoa=" + codpessoa, "Tirar Foto", "width=1250, height=550");
    if (oWin === null || typeof (oWin) === "undefined") {
        swal("Erro ao visualizar", "O Bloqueador de Pop-up esta ativado, desbloquei-o por favor!", "error");
    } else {
        window.close();
    }
}

function setaEditarPessoa(pessoa) {
    document.getElementById("codpessoa").value = pessoa[0];
    document.getElementById("nome").value = pessoa[1];
    document.getElementById("telefone").value = pessoa[2];
    document.getElementById("email").value = pessoa[3];
    document.getElementById("senha").value = pessoa[4];
    document.getElementById("celular").value = pessoa[5];
    document.getElementById("imagemCarregada").innerHTML = "<img src='../arquivos/" + pessoa[6] + "' alt='Imagem da pessoa' title='Imagem da pessoa'/>";
    $("#btatualizarPessoa").css("display", "");
    $("#btexcluirPessoa").css("display", "");
    $("#btnovoPessoa").css("display", "");
    $("#btinserirPessoa").css("display", "none");
    $("#codnivel option[value='" + pessoa[7] + "']").attr("selected", true);
}

function procurarPessoa(acao) {
    $("#carregando").show();
    var url = '../control/ProcurarUsuario.php';
    if(document.getElementById('ehCliente') != null && document.getElementById('ehCliente').value == 's'){
        url = '../control/ProcurarCliente.php';
    }
    $.ajax({
        url: url,
        type: "POST",
        data: $("#fPpessoa").serialize(),
        dataType: 'text',
        success: function (data, textStatus, jqXHR) {
            if (acao === false && data === "") {
                swal("Atenção", "Nada encontrado de pessoas!", "error");
            }
            document.getElementById("listagemPessoa").innerHTML = data;
            if(document.getElementById('ehCliente') != null && document.getElementById('ehCliente').value == 's'){
                dataTablePadrao('table_cliente');
            }else{
                dataTablePadrao('table_usuario');
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            swal("Erro ao excluir", "Erro causado por:" + errorThrown, "error");
        }
    });
    $("#carregando").hide();
}

function abreRelatorioPessoa(tipo) {
    var codpagina = document.fPpessoa.codpagina.value;
    if(tipo == 1 || tipo == 2){
        document.getElementById('fPpessoa').action = "http://comexito.com.br/site3/control/ProcurarPessoaRelatorio.php";
    }
    if(codpagina == 22){
        document.getElementById('fPpessoa').action = "http://comexito.com.br/site3/control/ProcurarUsuarioRelatorio.php";
    }
    if(tipo === 1){
        document.getElementById("tipo").value = "pdf";
    }else if(tipo === 2){
        document.getElementById("tipo").value = "xls";
    }else if(tipo === 3){
        document.getElementById('fPpessoa').action = "http://comexito.com.br/site3/control/ProcurarPessoaAkna.php";
        document.getElementById("tipo").value = "xls";
    }else if(tipo === 4){
        document.getElementById('fPpessoa').action = "http://comexito.com.br/site3/control/ProcurarPessoaAknaTxt.php";
        document.getElementById("tipo").value = "txt";
    }
    document.getElementById("fPpessoa").submit();
}

function inserirTelefone(linha) {
    var proxTelefone = parseInt(linha) + 1;
    var inputTelefone = '<input style="width: 80%" required type="text" name="telefone[]" id="telefone' + proxTelefone + '" class="telefone form-control" value="" title="Digite aqui telefone" placeholder="(00)0000-0000">';
    var btAdicionar = '<a style="float: right;margin-top: -35px;margin-right: 110px;" class="btn btn-primary" href="#"  onclick="inserirTelefone(' + proxTelefone + ');">+</a>';
    var btRemover = '<a style="float: right;margin-top: -35px;margin-right: 65px;" class="btn btn-primary" href="#"  onclick="removeTelefone(' + proxTelefone + ');">-</a>';
    var optionTel = document.getElementById("tipotelefone" + linha).innerHTML;
    var novoTelefone = '<div class="col-md-12" id="linhaTelefone' + proxTelefone + '">'
            + '<div class="col-md-6" style="padding-left: 0px">'
            + '<div class="form-group">'
            + '<label for="exampleInputFile">Tipo Telefone</label>'
            + '<select name="tipotelefone[]" id="tipotelefone' + proxTelefone + '" class="form-control">'
            + optionTel
            + '</select>'
            + '</div>'
            + '</div>'
            + '<div class="col-md-6">'
            + '<div class="form-group">'
            + '<label for="exampleInputFile">Telefone</label>'
            + inputTelefone
            + btAdicionar + ' ' + btRemover
            + '</div>';
    +'</div>';

    var telefone = document.getElementsByName('telefone[]');
    var i = 1;
    var aux = telefone.length;
    var telefone_antigo = new Array();
    var tipo_telefone_antigo = new Array();
    for (i = 0; i < aux; i++) {
        var linhaInteracao = i + 1;
        telefone_antigo[i] = $("#telefone" + linhaInteracao).val();
        tipo_telefone_antigo[i] = $("#tipotelefone" + linhaInteracao).val();
    }
    document.getElementById("telefones").innerHTML = document.getElementById("telefones").innerHTML + novoTelefone;
    for (i = 0; i < aux; i++) {
        var linhaInteracao = i + 1;
        $("#tipotelefone" + linhaInteracao).val(tipo_telefone_antigo[i]);
        $("#telefone" + linhaInteracao).val(telefone_antigo[i]);
    }
}

function removeTelefone(linha) {
    $("#tipotelefone" + linha).val("");
    $("#telefone" + linha).val("");
    $("#linhaTelefone" + linha).css("display", "none");
}

function procurarTelefones() {
    if (document.getElementById("telefones") != null) {
        $.ajax({
            url: "../control/TelefonesCliente.php",
            type: "POST",
            data: {codpessoa: $("#codpessoa").val()},
            dataType: 'text',
            success: function (data, textStatus, jqXHR) {
                document.getElementById("telefones").innerHTML = data;
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro", "Erro causado por:" + errorThrown, "error");
            }
        });
    }
}

$(function () {
    $("#cidadeProcurar").multiselect({
        selectedList: 4 // 0-based index      
    });    

    $("#fpessoa").submit(function () {
        $(".progress").css("visibility", "visible");
    });

    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#fpessoa').ajaxForm({
        beforeSend: function () {
            status.empty();
            var percentVal = '0%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        uploadProgress: function (event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        success: function () {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        complete: function (xhr) {
            var data = JSON.parse(xhr.responseText);
            if (data.situacao === true) {
                swal("Cadastro", data.mensagem, "success");
                procurarPessoa(true);
            } else if (data.situacao === false) {
                swal("Erro", data.mensagem, "error");
            }
        }
    });
});
