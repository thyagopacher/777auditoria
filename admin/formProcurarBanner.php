<div class="row">
    <div class="box box-default">
        <div class="box-header with-border">


            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-remove"></i></button>
            </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
            <div class="row">
                <form action="../control/ProcurarBannerRelatorio.php" method="post" name="fPbanner" id="fPbanner" onsubmit="return false;" target="_blank">
                    <input type="hidden" name="tipo" id="tipo" value="pdf"/>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="nome">Dt. Inicio</label>
                            <input type="date" class="form-control" name="data1" id="data1" title="Digite data de inicio onde foi feito o cadastro">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="nome">Dt. Fim</label>
                            <input type="date" class="form-control" name="data2" id="data2" title="Digite data de fim onde foi feito o cadastro">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="nome">Legenda</label>
                            <input type="text" class="form-control" name="titulo">
                        </div>
                    </div>
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <?php
                        if ($nivelp["procurar"] == 1) {
                            echo '<a onclick="procurarBanner();" class="btn btn-primary"/> ';
                            echo '<i class="fa fa-search" aria-hidden="true"></i> ';
                            echo 'Procurar';
                            echo '</a> ';
                        }
                        if ($nivelp["gerapdf"] == 1) {
                            echo '<a onclick="abreRelatorioBanner(1);" class="btn btn-primary"/>';
                            echo '<i class="fa fa-file-pdf-o" aria-hidden="true"></i> ';
                            echo 'Gerar PDF';
                            echo '</a> ';
                        }
                        if ($nivelp["geraexcel"] == 1) {
                            echo '<a onclick="abreRelatorioBanner(2);" class="btn btn-primary"/> ';
                            echo '<i class="fa fa-file-excel-o" aria-hidden="true"></i> ';
                            echo 'Gerar Excel';
                            echo '</a> ';
                        }
                        ?>                        
                        
                    </div>                                        
                </div>
            </div>
            </form>
            <div class="row">
                <div class="col-sm-12" id="listagemBanner"></div>
            </div>
        </div>
    </div>
    <!--/.col (right) -->
</div>