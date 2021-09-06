<?php
//$configuracaop = $cache->read('configuracaop');
if (!isset($configuracaop) || $configuracaop == NULL) {
    $configuracaop = $conexao->comandoArray('select * from configuracao');
    if (mb_detect_encoding($configuracaop["META_DESCRIPTION"], 'UTF-8', true) == FALSE) {
        $configuracaop["META_DESCRIPTION"] = ($configuracaop["META_DESCRIPTION"]);
    }
    if (mb_detect_encoding($configuracaop["META_KEYWORDS"], 'UTF-8', true) == FALSE) {
        $configuracaop["META_KEYWORDS"] = ($configuracaop["META_KEYWORDS"]);
    }
    if (mb_detect_encoding($configuracaop["textoretencao"], 'UTF-8', true) == FALSE) {
        $configuracaop["textoretencao"] = ($configuracaop["textoretencao"]);
    }
    $cache->save('configuracaop', $configuracaop, '60 minutes');
}
?>
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
                <form id="fconfiguracao" name="fconfiguracao" method="post" action="../control/SalvarConfiguracao.php">
                    <input type="hidden" name="codconfiguracao" id="codconfiguracao" value="<?= $configuracaop["codconfiguracao"] ?>"/>
                    <div class="col-md-6">                        
                        <div class="form-group">
                            <label for="imgmotivacao">Img. Motivação</label>
                            <input type='file' class="form-control" name="imgmotivacao" id="imgmotivacao">
                            <?php
                                if(isset($configuracaop["imgmotivacao"]) && $configuracaop["imgmotivacao"] != NULL && $configuracaop["imgmotivacao"] != ""){
                                    echo '<a href="../arquivos/',$configuracaop["imgmotivacao"],'">Clique para visualizar</a>';
                                }
                            ?>
                        </div>
                    </div>                    
                    <div class="col-md-6">                        
                        <div class="form-group">
                            <label for="nome">Facebook</label>
                            <input type='url' class="form-control" name="facebook" id="facebook" placeholder="Digite facebook" value="<?= ($configuracaop["facebook"]) ?>">
                        </div>
                    </div>                    
                    <div class="col-md-6">                        
                        <div class="form-group">
                            <label for="nome">Youtube</label>
                            <input type='url' class="form-control" name="youtube" id="youtube" placeholder="Digite youtube" value="<?= ($configuracaop["youtube"]) ?>">
                        </div>
                    </div>                    
                    <div class="col-md-6">                        
                        <div class="form-group">
                            <label for="nome">Google Plus</label>
                            <input type='url' class="form-control" name="googleplus" id="googleplus" placeholder="Digite googleplus" value="<?= ($configuracaop["googleplus"]) ?>">
                        </div>
                    </div>                    
                    <div class="col-md-6">                        
                        <div class="form-group">
                            <label for="nome">Linkedin</label>
                            <input type='url' class="form-control" name="linkedin" id="linkedin" placeholder="Digite linkedin" value="<?= ($configuracaop["linkedin"]) ?>">
                        </div>
                    </div>                    
                    <div class="col-md-6">                        
                        <div class="form-group">
                            <label for="nome">Meta Descrição</label>
                            <input type='text' class="form-control" name="META_DESCRIPTION" id="META_DESCRIPTION" placeholder="Digite meta descrição" value="<?= ($configuracaop["META_DESCRIPTION"]) ?>">
                        </div>
                    </div>                    
                    <div class="col-md-6">                        
                        <div class="form-group">
                            <label for="nome">Meta keyword</label>
                            <input type='text' class="form-control" name="META_KEYWORDS" id="META_KEYWORDS" placeholder="Digite meta keyword" value="<?= ($configuracaop["META_KEYWORDS"]) ?>">
                        </div>
                    </div>                    

                    <div class="col-md-6">                        
                        <div class="form-group">
                            <label for="nome">Vl Dólar</label>
                            <input type='text' class="form-control real" name="vldolar" id="vldolar" placeholder="Digite vldolar" value="<?= number_format($configuracaop["vldolar"], 2, ',', '') ?>">
                        </div>
                    </div>                    
                    <div class="col-md-6">                        
                        <div class="form-group">
                            <label for="emailpagseguro">E-mail Pagseguro</label>
                            <input type='email' class="form-control" name="emailpagseguro" id="emailpagseguro" placeholder="Digite email pagseguro" value="<?= $configuracaop["emailpagseguro"] ?>">
                        </div>
                    </div>                    
                    <div class="col-md-6">                        
                        <div class="form-group">
                            <label for="emailpagseguro">Token Pagseguro</label>
                            <input type='text' class="form-control" name="tokenpagseguro" id="tokenpagseguro" placeholder="Digite token pagseguro" value="<?= $configuracaop["tokenpagseguro"] ?>">
                        </div>
                    </div> 
                    <div class="col-md-6">                        
                        <div class="form-group">
                            <label for="urlretornopagseguro">Url retorno Pagseguro</label>
                            <input type='url' class="form-control" name="urlretornopagseguro" id="urlretornopagseguro" placeholder="Digite url de retorno pagseguro" value="<?= $configuracaop["urlretornopagseguro"] ?>">
                        </div>
                    </div> 

                    <div class="col-md-12">                        
                        <div class="form-group">
                            <label for="nome">Sobre nós - footer</label>
                            <textarea cols="80" rows="30" class="form-control texto" placeholder="Digite texto porque nos" name="porquenos" id="porquenos"><?php if (isset($configuracaop["porquenos"])) {
    echo ($configuracaop["porquenos"]);
} ?></textarea>
                        </div>
                    </div>                      
                    
                    <div class="col-md-12">                        
                        <div class="form-group">
                            <label for="nome">Retenção de Impostos</label>
                            <textarea cols="80" rows="30" class="form-control texto" placeholder="Digite texto retenção" name="textoretencao" id="textoretencao"><?php if (isset($configuracaop["textoretencao"])) {
    echo ($configuracaop["textoretencao"]);
} ?></textarea>
                        </div>
                    </div>
                    
                    <div class="col-md-12">                        
                        <div class="form-group">
                            <label for="nome">Texto liberação compra</label>
                            <textarea cols="80" rows="30" class="form-control texto" placeholder="Digite texto liberação compra" name="textoliberacaocompra" id="textoliberacaocompra"><?php if (isset($configuracaop["textoliberacaocompra"])) {
    echo ($configuracaop["textoliberacaocompra"]);
} ?></textarea>
                        </div>
                    </div>                    
                    <div class="col-md-12">
                        <div class="form-group">
                            <input type="submit" class="btn btn-primary" id="btatualizarCategoriaProduto" value="Salvar"/>
                        </div>                                        
                    </div>                    
                </form>
            </div>
            <div class="row">
                <div id="listagemCategoriaProduto" class="col-md-12"></div>
            </div>
        </div>
    </div>
    <!--/.col (right) -->
</div>