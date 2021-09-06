/* 
 * @author Thyago Henrique Pacher - thyago.pacher@gmail.com
 */


function login() {
    if ($("#email").val() == "") {
        swal("Atenção", "E-mail em branco!!!", "info");
    } else if ($("#senha").val() == "") {
        swal("Atenção", "Senha em branco!!!", "info");
    } else {
        var url = "../control/LoginAdmin.php";
        $.ajax({
            url: url,
            type: "POST",
            data: $("#loginTopo").serialize(),
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.situacao === true) {
                    swal("Login", data.mensagem, "success");
                    window.localStorage.setItem("codpessoa", data.codpessoa);
                    window.localStorage.setItem("nome", data.nome);
                    window.localStorage.setItem("imagem", data.imagem);
                    window.localStorage.setItem("dtcadastro", data.dtcadastro);

                    if ($("#lembreme").is(":checked")) {
                        window.localStorage.setItem("lembreme", "s");
                        window.localStorage.setItem("email", $("#email").val());
                        window.localStorage.setItem("senha", $("#senha").val());
                    } else {
                        window.localStorage.setItem("lembreme", "n");
                    }
                    var hoje = new Date();
                    location.href = 'http://comexito.com.br/site3/admin/home.php?' + hoje.getFullYear() + hoje.getMonth() + hoje.getDay() + hoje.getDate() + hoje.getHours();
                } else if (data.situacao === false) {
                    swal("Erro", data.mensagem, "error");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                swal("Erro", "Erro causado por:" + errorThrown, "error");
            }
        });
    }
}