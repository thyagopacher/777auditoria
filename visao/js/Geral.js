function voltaTopo(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

$(function () {
    $("#btContato").click(function () {

        $.ajax({
            url: "control/EnviaEmail.php",
            type: "POST",
            data: $("#fcontato").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao == true) {
                    swal("Atenção", data.mensagem, "info");
                    document.fcontato.email.value = '';
                    document.fcontato.nome.value = '';
                    document.fcontato.mensagem.value = '';
                    
                    setTimeout('voltaTopo();', 1500);
                } else if (data.situacao == false) {
                    swal("Atenção", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro", "Erro causado por:" + errorThrown, "error");
            }
        });//fim do ajax

    });

    $("#btEntrar").click(function () {

        $.ajax({
            url: "http://gestccon.com.br/sistema/control/Login.php",
            type: "POST",
            data: $("#loginTopo").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao == true) {
                    window.localStorage.setItem('codnivel', data.codnivel);
                    window.localStorage.setItem('codpessoa', data.codpessoa);
                    window.localStorage.setItem('codempresa', data.codempresa);
                    window.localStorage.setItem('nome', data.nome);
                    window.localStorage.setItem('email', $("#emailTopo").val());     
                    
                    location.href = "http://gestccon.com.br/sistema/visao/index.php";
                } else if (data.situacao == false) {
                    swal("Atenção", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro", "Erro causado por:" + errorThrown, "error");
            }
        });//fim do ajax

    }); 

    $("#btEsqueceSenha").click(function () {

        $.ajax({
            url: "control/ReenviarSenha.php",
            type: "POST",
            data: $("#loginTopo").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao == true) {
                    swal("Atenção", data.mensagem, "info");
                } else if (data.situacao == false) {
                    swal("Atenção", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro", "Erro causado por:" + errorThrown, "error");
            }
        });//fim do ajax

    });
});