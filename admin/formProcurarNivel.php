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
                <form action="<?= $action ?>" id="fProcurarNivel" name="fProcurarNivel" method="post">
                    <input type="hidden" name="codnivel" id="codnivel" value="<?= $_GET["codnivel"] ?>"/>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="nome">Nivel</label>
                            <select class="form-control" name="codnivel" id="codnivel">
                                <?php
                                $nivelCombo = $cache->read('nivelCombo');
                                if (!isset($nivelCombo) || $nivelCombo == NULL) {
                                    $resnivel = $conexao->comando("select * from nivel order by nome");
                                    $qtdnivel = $conexao->qtdResultado($resnivel);
                                    if ($qtdnivel > 0) {
                                        $nivelCombo .= '<option value="">--Selecione--</option>';
                                        while ($nivel = $conexao->resultadoArray($resnivel)) {
                                            $nivelCombo .= '<option value="'. $nivel["codnivel"]. '">'. $nivel["nome"]. '</option>';
                                        }
                                    } else {
                                        $nivelCombo .= '<option value="">--Nada encontrado--</option>';
                                    }
                                    $cache->save('nivelCombo', $nivelCombo, '180 minutes');
                                }
                                echo $nivelCombo;
                                ?>
                            </select>
                        </div>

                    </div>
                    <!-- /.col -->
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="statusPessoa">Status</label>
                            <select class="form-control" name="padrao" id="padrao">
                                <option>--Selecione--</option>
                                <option value="s" <?php
                                if (isset($nivelp["padrao"]) && $nivelp["padrao"] == "s") {
                                    echo "selected";
                                }
                                ?>>SIM</option>
                                <option value="n" <?php
                                if (isset($nivelp["padrao"]) && $nivelp["padrao"] == "n") {
                                    echo "selected";
                                }
                                ?>>NÃO</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <input class="btn btn-primary" type="button" name="submit" id="btProcurar" value="Procurar" onclick="procurarNivel(false)"/>
                    </div>                                        
                </div>
            </div>

            <div class="row">
                <div id="listagemNivel"></div>
            </div>
        </div>
    </div>
    <!--/.col (right) -->
</div>