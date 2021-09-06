<?php

ob_start("ob_gzhandler");
date_default_timezone_set('America/Sao_Paulo');
header("Pragma: public");
header('Content-type: text/html; charset=UTF-8');

function __autoload($class_name) {
    if (file_exists("../model/" . $class_name . '.php')) {
        include "../model/" . $class_name . '.php';
    } elseif (file_exists("../control/" . $class_name . '.php')) {
        include "../control/" . $class_name . '.php';
    } elseif (file_exists($class_name . '.php')) {
        include $class_name . '.php';
    }
}

$conexao = new Conexao();

$cache = new Cache();
$sitep = $cache->read('sitep');
if (!isset($sitep) || $sitep == NULL) {
    $sitep = $conexao->comandoArray("select palavrachave, descricao, nome, video, favicon, email, celular, telefone from site where codsite = 1");
    $cache->save('sitep', $sitep, '60 minutes');
}

$conteudo2 = $cache->read('conteudo2');
if (!isset($conteudo2) || $conteudo2 == NULL) {
    $conteudo22 = $conexao->comandoArray("select nome, texto from conteudo where codconteudo = 2");
    $cache->save('conteudo2', $conteudo2, '60 minutes');
}

$conteudo22 = $cache->read('conteudo22');
if (!isset($conteudo22) || $conteudo22 == NULL) {
    $conteudo22 = $conexao->comandoArray("select nome, texto from conteudo where codconteudo = 22");
    $cache->save('conteudo22', $conteudo22, '60 minutes');
}
?>
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="<?= $sitep["descricao"] ?>">
        <meta name="keywords" content="<?= $site["palavrachave"] ?>"/>
        <meta name="author" content="Thyago Henrique Pacher - thyago.pacher@gmail.com">

        <title><?= $sitep["nome"] . ' - ' . $sitep["descricao"] ?></title>

        <!-- Bootstrap Core CSS -->
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom Fonts -->
        <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>

        <!-- Plugin CSS -->
        <link href="vendor/magnific-popup/magnific-popup.css" rel="stylesheet">

        <!-- Theme CSS -->
        <link href="css/creative.min.css" rel="stylesheet">
        <link href="css/sweet-alert.min.css" rel="stylesheet">

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
        <style>
            .img-Cliente{margin: 0 auto; min-height: 115px !important; max-height: 115px !important;margin-bottom: 20px; margin-top: 20px;}
            .modal-header, h4, .close {
                background-color: #3D87C7;
                color:white !important;
                text-align: center;
                font-size: 30px;
            }
            .modal-footer {
                background-color: #f9f9f9;
            }   
            .homeHeading img{
                width: 350px;
            }
        </style>
        
        <meta itemprop="email" content="<?=$sitep["email"]?>"></span>  
        <meta itemprop="url" content="http://<?=$_SERVER['SERVER_NAME']?>/">
        <meta itemprop="name" content="<?=$sitep["nome"]?>">
        <?php 
            if(isset($sitep["telefone"]) && $sitep["telefone"] != NULL && $sitep["telefone"] != ""){
                echo '<meta itemprop="telephone" content="',$sitep["telefone"],'">';
            }elseif(isset($sitep["celular"]) && $sitep["celular"] != NULL && $sitep["celular"] != ""){
                echo '<meta itemprop="telephone" content="',$sitep["celular"],'">';
            }
        ?>
                  
    </head>

    <body id="page-top">

        <nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">

                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                    </button>
                    <a style="text-transform: initial;" class="navbar-brand page-scroll" href="#page-top">GestCCon</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">                    
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a class="page-scroll" data-toggle="modal" data-target="#mdLogin" href="#">Login</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#empresa">Empresa</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#servicos">Serviços</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#clientes">Clientes</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#contato">Contato</a>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>
        <div class="modal fade" id="mdLogin" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header" style="padding:35px 50px;">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4><span class="glyphicon glyphicon-lock"></span> Login</h4>
                    </div>
                    <div class="modal-body" style="padding:40px 50px;">
                        <form role="form" id="loginTopo" method="post" onsubmit="return false;">
                            <div class="form-group">
                                <label for="usrname"><span class="glyphicon glyphicon-user"></span> E-mail</label>
                                <input type="email" class="form-control" name="email" id="emailTopo" placeholder="Digite email">
                            </div>
                            <div class="form-group">
                                <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Senha</label>
                                <input type="password" class="form-control" name="senha" id="senhaTopo" placeholder="Digite senha">
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" name="lembreme" value="s" checked>Lembre me</label>
                            </div>
                            <button type="button" id="btEntrar" class="btn btn-primary btn-block"><span class="glyphicon glyphicon-off"></span> Login</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancelar</button>
                        <p>Esqueceu <a id="btEsqueceSenha" href="#">Senha?</a></p>
                    </div>
                </div>

            </div>
        </div>
        <header>
            <div class="header-content">
                <div class="header-content-inner">
                    <h1 id="homeHeading">
                        Uma solução completa de software para o seu Condomínio
                    </h1>
                    <hr>
                    <p>Inicie sua integração com portal de moradores, envie de mensagem em massa, reservas de ambientes, registro de mudanças, classificados, lista telefônica e muito mais!</p>
                    <a href="#empresa" id="btSaibaMais" class="btn btn-primary btn-xl page-scroll">Saiba mais</a>
                </div>
            </div>
        </header>

        <section class="bg-primary" id="empresa">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 text-center">
                        <h2 class="section-heading">Nós temos o que você precisa... Assista o vídeo.</h2>
                        <hr class="light">
                        <br>
                        <p class="text-faded">
                            <video style="width: 95% !important;"  controls=""> 
                                <source src="http://gestccon.com.br/sistema/arquivos/gestccon.mp4" type="video/mp4"> 
                                Seu navegador não suporta rodar videos em html 5, por favor atualize!!! 
                            </video>                            
                        </p>
                        <a href="#contato" class="btn btn-primary btn-xl page-scroll">Entre em Contato</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="servicos">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h2 class="section-heading">Nossos serviços</h2>
                        <hr class="primary">
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="service-box">
                            <i class="fa fa-4x fa-diamond text-primary sr-icons"></i>
                            <h3>Portal de moradores</h3>
                            <p class="text-muted">Integre sua ADM com os moradores</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="service-box">
                            <i class="fa fa-4x fa-paper-plane text-primary sr-icons"></i>
                            <h3>Mensagem em massa</h3>
                            <p class="text-muted">Envio comunicados rapidamente para seus moradores!</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="service-box">
                            <i class="fa fa-4x fa-newspaper-o text-primary sr-icons"></i>
                            <h3>Jornal do Condomínio</h3>
                            <p class="text-muted">Mantenha seus moradores sempre informados</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="service-box">
                            <i class="fa fa-4x fa-heart text-primary sr-icons"></i>
                            <h3>Suporte rápido</h3>
                            <p class="text-muted">Retiramos dúvidas em prazos muitos rápidos!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="no-padding" id="clientes">
            <div class="container-fluid">
                <div class="row no-gutter popup-gallery">
                    <?php
                    $rescondominio = $conexao->comando("select empresa.logo, empresa.sitemorador, empresa.razao, ramo.nome as ramo 
                    from empresa 
                    inner join ramo on ramo.codramo = empresa.codramo
                    where empresa.codstatus = 3 and empresa.codramo = 7 and empresa.codempresa <> 29 and empresa.logo <> '' order by empresa.razao");
                    $qtdcondominio = $conexao->qtdResultado($rescondominio);
                    if ($qtdcondominio > 0) {
                        while ($condominiop = $conexao->resultadoArray($rescondominio)) {
                            ?>
                            <div class="col-lg-4 col-sm-6">
                                <a target="_blank" href="<?= $condominiop["sitemorador"] ?>" class="portfolio-box">
                                    <div>
                                        <img src="http://gestccon.com.br/sistema/arquivos/<?= $condominiop["logo"] ?>" class="img-responsive img-Cliente" alt="">
                                    </div>

                                    <div class="portfolio-box-caption">
                                        <div class="portfolio-box-caption-content">
                                            <div class="project-category text-faded">
                                                <?= $condominiop["ramo"] ?>
                                            </div>
                                            <div class="project-name">
                                                <?= $condominiop["razao"] ?>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <?php
                        }
                    }
                    ?>

                </div>
            </div>
        </section>

        <aside class="bg-dark">
            <div class="container text-center">
                <div class="call-to-action">
                    <h2>A <?=$sitep["nome"]?> facilita sua administração assine já conosco e obtenha benefícios incríveis!</h2>
                </div>
            </div>
        </aside>

        <section id="contato">
            <div class="container">
                <div class="row">
                    
                </div>
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 text-center">
                        <h2 class="section-heading">
                            <img width="150" src="/visao/img/logo_transparente.png" alt="<?= $conteudo22["nome"] .' - '. $sitep["nome"]?>"/><br><br>
                            
                        </h2>
                        <hr class="primary">
                        <p>
                            <?= $conteudo22["texto"] ?>
                        </p>
                        <form method="post" name="fcontato" id="fcontato" onsubmit="return false;">
                            <div class="form-group">
                                <label>Email:</label>
                                <input type="email" class="form-control" name="email" id="email">
                            </div>
                            <div class="form-group">
                                <label>Nome:</label>
                                <input type="text" class="form-control" name="nome" id="nome">
                            </div>
                            <div class="form-group">
                                <label>Assunto:</label>
                                <textarea class="form-control" name="mensagem" id="mensagem"></textarea>
                            </div>
                            <button type="button" id="btContato" class="btn btn-primary btn-xl page-scroll">Enviar</button>
                        </form>                        
                    </div>
                    <div class="col-lg-4 col-lg-offset-2 text-center">
                        <i class="fa fa-phone fa-3x sr-contact"></i>
                        <p>
                            <a href="tel:<?= $sitep["celular"] ?>">
                                <?= $sitep["celular"] ?>
                            </a>
                        </p>
                    </div>
                    <div class="col-lg-4 text-center">
                        <i class="fa fa-envelope-o fa-3x sr-contact"></i>
                        <p>
                            <a href="mailto:<?= $sitep["email"] ?>"><?= $sitep["email"] ?></a>
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- jQuery -->
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="js/Geral.js"></script>

        <!-- Bootstrap Core JavaScript -->
        <script src="vendor/bootstrap/js/bootstrap.min.js"></script>

        <!-- Plugin JavaScript -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
        <script src="vendor/scrollreveal/scrollreveal.min.js"></script>
        <script src="vendor/magnific-popup/jquery.magnific-popup.min.js"></script>

        <!-- Theme JavaScript -->
        <script src="js/creative.min.js"></script>
        <script src="js/sweet-alert.min.js"></script>

    </body>
</html>
<?php
$html = ob_get_clean();
echo preg_replace('/\s+/', ' ', $html);
