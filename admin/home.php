<?php
include './validacaoLogin.php';
$sql = "select top(10) COUNT(cliente.NOM_MUNICIPIO) as qtd, cliente.NOM_MUNICIPIO 
from cliente_produto as cp
inner join cliente on cliente.COD_CLIENTE = cp.COD_CLIENTE 
where cliente.NOM_MUNICIPIO <> ''
and cp.DAT_PAGAMENTO >= '".date("Y")."-01-01'
and cp.DAT_PAGAMENTO <= '".date("Y")."-12-30'
group by cliente.NOM_MUNICIPIO 
having COUNT(cliente.NOM_MUNICIPIO) > 50
order by qtd  desc";

$resqtdCidade = $conexao->comando($sql);
$qtdCidade = $conexao->qtdResultado($resqtdCidade);
if($qtdCidade < 10){
    $sql = "select top(10) COUNT(cliente.NOM_MUNICIPIO) as qtd, cliente.NOM_MUNICIPIO 
    from cliente_produto as cp
    inner join cliente on cliente.COD_CLIENTE = cp.COD_CLIENTE 
    where cliente.NOM_MUNICIPIO <> ''
    and cp.DAT_PAGAMENTO >= '".date("Y")."-01-01'
    and cp.DAT_PAGAMENTO <= '".date("Y")."-12-30'
    group by cliente.NOM_MUNICIPIO 
    having COUNT(cliente.NOM_MUNICIPIO) > 10
    order by qtd  desc";
    $resqtdCidade = $conexao->comando($sql);    
    $qtdCidade = $conexao->qtdResultado($resqtdCidade);
}
$array_cidade = array();
?>
<!DOCTYPE html>
<html> 
    <head>
        <title><?= $empresap["razao"]?> | Painel</title>
        <?php include 'head.php'; ?>
        <?php if ($qtdCidade > 0) { ?>
            <script type='text/javascript' src='./recursos/js/loader.js'></script>
            <script type="text/javascript" src='./recursos/js/jsapi.js'></script>
            <script type='text/javascript'>
                google.charts.load('current', {'packages': ['geochart']});
                google.charts.setOnLoadCallback(drawMarkersMap);

                function drawMarkersMap() {
                    var data = google.visualization.arrayToDataTable([
                    <?php
                    $separador_cidade = ',';
                    $linha_cidade = 0;
                    echo "['Cidade', 'Clientes'],";
                    while ($cidade = $conexao->resultadoArray($resqtdCidade)) {
                        echo "['".($cidade["NOM_MUNICIPIO"])."', {$cidade["qtd"]}]". $separador_cidade;
                        $array_cidade[] = array('cidade' => ($cidade["NOM_MUNICIPIO"]), 'qtd' => $cidade["qtd"]);
                        if($linha_cidade == $qtdCidade - 2){
                            $separador_cidade = '';
                        }
                        $linha_cidade++;
                    }
                    ?>
                    ]);

                    var options = {
                        sizeAxis: {minValue: 10, maxValue: 100},
                        backgroundColor: {fill: '#81d4fa', 'opacity': 40},
                        datalessRegionColor: '#00A65A',
                        region: 'BR',
                        displayMode: 'markers',
                        colorAxis: {colors: ['#e7711c', '#4374e0']} // orange to blue
                    };

                    var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
                    chart.draw(data, options);
                }
            </script>  
        <?php } ?>
    </head>
    <body class="hold-transition skin-blue sidebar-mini">
        <div class="wrapper">

            <?php include 'header.php'; ?>
            <!-- Left side column. contains the logo and sidebar -->
            <?php include "menu.php"; ?>

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <section class="content-header">
                    <h1>
                        Dashboard
                        <small>Painel de controle</small>
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li class="active">Dashboard</li>
                    </ol>
                </section>

                <!-- Main content -->
                <section class="content">
                    <!-- Small boxes (Stat box) -->
                    <div class="row">
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-aqua">
                                <div class="inner">
                                    <?php
                                    $sql = "select count(1) as qtd from cliente_produto where LIBERADO <> 1 and DAT_COMPRA > '2016-01-01 00:00:00' and DAT_PAGAMENTO is null";
                                    $qtdPessoa = $conexao->comandoArray($sql);
                                    echo '<h3>', $qtdPessoa["qtd"], '</h3>';
                                    echo 'Compras não pagas';
                                    ?>                                    
                                </div>
                                <div class="icon">
                                    <i class="ion ion-bag"></i>
                                </div>
                                <a href="RelVenda.php?LIBERADO=0" title="clique para abrir relatório de vendas" class="small-box-footer">Mais informações <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div><!-- ./col -->
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-green">
                                <div class="inner">
                                    <?php
                                    $qtdPessoa = $conexao->comandoArray("select count(1) as qtd from produto where IND_ATIVO = 1");
                                    echo '<h3>', $qtdPessoa["qtd"], '</h3>';
                                    echo 'Cursos ativos';
                                    ?>    
                                </div>
                                <div class="icon">
                                    <i class="ion ion-stats-bars"></i>
                                </div>
                                <a href="Produto.php?procurar=1" class="small-box-footer">Mais informações <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div><!-- ./col -->
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-yellow">
                                <div class="inner">
                                    <?php
                                    $sql = 'select sum(x.qtd1) as qtd from(
                                    select count(distinct(NUM_CPF)) as qtd1 from cliente
                                    union
                                    select count(distinct(NUM_CNPJ)) as qtd2 from cliente
                                    ) x';
                                    $qtdPessoa = $conexao->comandoArray($sql);
                                    echo '<h3>', $qtdPessoa["qtd"], '</h3>';
                                    echo 'Clientes Registrados';
                                    ?>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-person-add"></i>
                                </div>
                                <a href="Cliente.php?procurar=1" class="small-box-footer">Mais informações <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div><!-- ./col -->
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-red">
                                <div class="inner">
                                    <?php
                                    $qtdPessoa = $conexao->comandoArray("select count(distinct(enderecoip)) as qtd from visitante");
                                    echo '<h3>', $qtdPessoa["qtd"], '</h3>';
                                    echo 'Visitantes site';
                                    ?>                                       
                                </div>
                                <div class="icon">
                                    <i class="ion ion-pie-graph"></i>
                                </div>
                                <a href="RelVisitante.php?procurar=1" class="small-box-footer">Mais informações <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div><!-- ./col -->
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-8">
                            <div class="box box-success">
                                <div class="box-header with-border">
                                    <h3 class="box-title">
                                        <i class="fa fa-money"></i>
                                        10 melhores Vendas por região
                                    </h3>

                                    <div class="box-tools pull-right">
                                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                                        <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                                    </div>
                                </div>
                                <!-- /.box-header -->
                                <div class="box-body no-padding">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-8">
                                            <div class="pad">
                                                <!-- Map will be created here -->
                                                <div id="chart_div" style="height: 325px;"><?php if ($qtdCidade == 0) {
                                        echo "Nenhum dado ainda para mostrar no mapa!!!";
                                    } ?></div>
                                            </div>
                                        </div>
                                        <!-- /.col -->
                                        <div class="col-md-3 col-sm-4">
                                            <div class="pad box-pane-right bg-green" style="min-height: 280px;max-height: 335px;overflow: auto;">
                                                <?php
                                                 foreach ($array_cidade as $key => $cidade) {
                                                ?>
                                                    <div class="description-block margin-bottom">
                                                        <div class="sparkbar pad" data-color="#fff"><canvas width="34" height="30" style="display: inline-block; width: 34px; height: 30px; vertical-align: top;"></canvas></div>
                                                        <h5 class="description-header"><?=$cidade["qtd"]?></h5>
                                                        <span class="description-text"><?=$cidade["cidade"]?></span>
                                                    </div>                                                
                                                <?php
                                                 }
                                                ?>
                                                <!-- /.description-block -->
                                            </div>
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                </div>
                                <!-- /.box-body -->
                            </div>                        
                        </div>                        
                    </div><!--fim row-->
                </section><!-- /.content -->
            </div><!-- /.content-wrapper -->
<?php include 'footer.php'; ?>
        </div><!-- ./wrapper -->

<?php include './javascriptFinal.php'; ?>

    </body>
</html>
