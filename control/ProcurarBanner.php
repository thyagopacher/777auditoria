<?php
header('Content-type: text/html; charset=utf-8');
session_start();
//validação caso a sessão caia
if (!isset($_SESSION)) {
    die("<script>alert('Sua sessão caiu, por favor logue novamente!!!');window.close();</script>");
}
function __autoload($class_name) {
    if (file_exists("../model/" . $class_name . '.php')) {
        include "../model/" . $class_name . '.php';
    } elseif (file_exists("../visao/" . $class_name . '.php')) {
        include "../visao/" . $class_name . '.php';
    } elseif (file_exists("./" . $class_name . '.php')) {
        include "./" . $class_name . '.php';
    }
}

$conexao = new Conexao();
$banner = new Banner($conexao);
$res = $banner->procurar($_POST);
$qtd = $conexao->qtdResultado($res);
if ($qtd > 0) {
    ?>
    <table id="table_banner">
        <thead>
            <tr>
                <th>
                    Data Cad.
                </th>
                <th>
                    Titulo
                </th>
                <th>
                    Arquivo
                </th>
                <th>
                    Status
                </th>
                <th>
                    Tipo
                </th>
                <th>
                    Validade
                </th>
                <th>
                    Opções
                </th>
            </tr>
        </thead>
        <tbody>
            <?php while ($banner = $conexao->resultadoArray($res)) { ?>
                <tr>
                    <td>
                        <?= $banner["dtcadastro2"] ?>
                    </td>
                    <td>
                        <?= utf8_encode($banner["titulo"]) ?>
                    </td>
                    <td>
                        <a target="_blank" href="../arquivos/<?= $banner["arquivo"] ?>">Abrir arquivo</a>
                    </td>
                    <td>
                        <?= trocaStatus($banner["status"]) ?>
                    </td>
                    <td>
                        <?= trocaTipo($banner["tipo"]) ?>
                    </td>
                    <td>
                        <?php
                        if(isset($banner["dtvalidade"]) && $banner["dtvalidade"] != NULL && $banner["dtvalidade"] != ""){
                            echo date("d/m/Y", strtotime($banner["dtvalidade"])); 
                        }else{
                            echo '--';
                        }
                        ?>
                    </td>

                    <td>
                        <?php
                        echo '<a href="Banner.php?codbanner=', $banner["codbanner"], '" title="Clique aqui para editar"><img style="width: 20px;" src="./recursos/img/editar.png" alt="botão editar"/></a>';
                        echo '<a href="javascript: excluirBanner(', $banner["codbanner"], ')" title="Clique aqui para excluir"><img style="width: 20px;" src="./recursos/img/excluir.png" alt="botão excluir"/></a>';
                        ?>
                    </td>
                </tr>
            <?php } ?>
        </tbody>

    </table>

    <?php
    $classe_linha = "even";
}

function trocaStatus($status) {
    switch ($status) {
        case 'a':
            $status = "Ativo";
            break;
        case 'i':
            $status = "Inativo";
            break;
    }
    return $status;
}

function trocaTipo($status) {
    switch ($status) {
        case 'p':
            $status = "PopUp";
            break;
        case 'n':
            $status = "Normal";
            break;
        case 'v':
            $status = "Vagas";
            break;
    }
    return $status;
}
?>