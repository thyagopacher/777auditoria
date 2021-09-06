<header class="main-header">
    <!-- Logo -->
    <a href="home.php?<?=date("YmdHis")?>" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>C</b>E</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b><?=  ($empresap["razao"])?></b></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">

                <!-- User Account: style can be found in dropdown.less -->
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <?php
                        if ($_SESSION["imagem"] != NULL && $_SESSION["imagem"] != "") {
                            echo '<img src="../arquivos/', $_SESSION["imagem"], '" class="user-image" alt="Imagem usuário">';
                        } else {
                            echo '<img src="./recursos/img/sem_imagem.png" class="user-image" alt="Imagem usuário">';
                        }
                        ?>                    
                        <span class="hidden-xs"><?= $_SESSION["nome"] ?></span>
                    </a>
                    <ul class="dropdown-menu">
                        <!-- User image -->
                        <li class="user-header">
                            <?php
                            if ($_SESSION["imagem"] != NULL && $_SESSION["imagem"] != "") {
                                echo '<img src="../arquivos/', $_SESSION["imagem"], '" class="user-image" alt="Imagem usuário">';
                            } else {
                                echo '<img src="./recursos/img/sem_imagem.png" class="user-image" alt="Imagem usuário">';
                            }
                            ?>                             
                            <p>
                                <?= $_SESSION["nome"] ?>
                                <small>Membro desde <?=date("d/m/Y", strtotime($_SESSION["DAT_CADASTRO"]))?></small>
                            </p>
                        </li>
                        <!-- Menu Footer-->
                        <li class="user-footer">
                            <div class="pull-left">
                                <a href="./Pessoa.php?codusuario=<?=  $_SESSION["COD_USUARIO"]?>" class="btn btn-default btn-flat">Perfil</a>
                            </div>
                            <div class="pull-right">
                                <a href="./Logout.php" class="btn btn-default btn-flat">Sair</a>
                            </div>
                        </li>
                    </ul>
                </li>
<!--                 Control Sidebar Toggle Button 
                <li>
                    <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                </li>-->
            </ul>
        </div>
    </nav>
</header>