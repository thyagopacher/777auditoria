<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <?php
                if ($_SESSION["imagem"] != NULL && $_SESSION["imagem"] != "") {
                    echo '<img src="../arquivos/', $_SESSION["imagem"], '" class="img-circle" alt="Imagem usuário">';
                } else {
                    echo '<img src="./recursos/img/sem_imagem.png" class="img-circle" alt="Imagem usuário">';
                }
                ?>

            </div>
            <div class="pull-left info">
                <p><?= $_SESSION["nome"] ?></p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>

        <ul class="sidebar-menu">
            <li class="header">MENU DE NAVEGAÇÃO</li>
            <li>
                <a href="./home.php?<?=date("YmdHis")?>"><i></i> <span>Inicial</span> <i class="fa fa-angle-left pull-right"></i></a>
            </li>
            <?php
            $resmodulo = $conexao->comando("select codmodulo, nome, icone from modulo order by codmodulo");
            $qtdmodulo = $conexao->qtdResultado($resmodulo);
            if ($qtdmodulo > 0) {
                while ($modulo = $conexao->resultadoArray($resmodulo)) {
                    $sql = "select pagina.codpagina, pagina.nome, pagina.link, pagina.titulo, pagina.abreaolado, pagina.icone                    
                    from pagina
                    inner join nivelpagina on nivelpagina.codpagina = pagina.codpagina
                    inner join nivel on nivel.codnivel = nivelpagina.codnivel
                    where pagina.codmodulo = {$modulo["codmodulo"]}
                    and nivel.codnivel = {$_SESSION["codnivel"]}    
                    order by pagina.nome";
                    $respagina = $conexao->comando($sql)or die("<pre>$sql</pre>");
                    $qtdpagina = $conexao->qtdResultado($respagina);
                    if ($qtdpagina > 0) {
                        if (isset($_SESSION["codpagina"]) && $_SESSION["codpagina"] != NULL && $_SESSION["codpagina"] != "") {
                            $paginap = $conexao->comandoArray('select codpagina from pagina where codpagina = ' . $_SESSION["codpagina"] . ' and codmodulo = ' . $modulo["codmodulo"]);
                        }
                        if (isset($paginap["codpagina"]) && $paginap["codpagina"] != NULL && $paginap["codpagina"] != "") {
                            $classeLi = 'active treeview';
                        } else {
                            $classeLi = 'treeview';
                        }
                        //active treeview janela aberta
                        echo '<li class="', $classeLi, '">';
                        echo '<a href="#"><i class="fa ', $modulo["icone"], '"></i> <span>', ($modulo["nome"]), '</span> <i class="fa fa-angle-left pull-right"></i></a>';

                        echo '<ul class="treeview-menu">';
                        while ($pagina = $conexao->resultadoArray($respagina)) {
                            if ($pagina["abreaolado"] == "n") {
                                echo '<li class="active"><a title="', ($pagina["titulo"]), '" href="', $pagina["link"], '"><i class="fa ', $pagina["icone"], '"></i>', ($pagina["nome"]), '</a></li>';
                            } else {
                                echo '<li class="active"><a title="', ($pagina["titulo"]), '" target="_blank" href="', $pagina["link"], '"><i class="fa ', $pagina["icone"], '"></i>', ($pagina["nome"]), '</a></li>';
                            }
                        }
                        echo '</ul>';
                        echo '</li>';
                    }
                }
            }
            
            ?>
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>