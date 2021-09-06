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
                <form id="fbanner" name="fbanner" method="post" action="../control/SalvarBanner.php">
                    <input type="hidden" name="codbanner" id="codbanner" value="<?=$_GET["codbanner"]?>"/>
                    <div class="col-md-4">                        
                        <div class="form-group">
                            <label for="titulo">Legenda</label>
                            <input type='text' class="form-control" name="titulo" id="titulo" placeholder="Digite legenda" value="<?php if(isset($bannerp["titulo"])){echo ($bannerp["titulo"]);}?>">
                        </div>
                    </div>
                    <div class="col-md-4">                        
                        <div class="form-group">
                            <label for="link">
                                <i class="fa fa-link" aria-hidden="true"></i>
                                Link
                            </label>
                            <input type='url' class="form-control" name="link" id="link" placeholder="Digite link" value="<?php if(isset($bannerp["link"])){echo $bannerp["link"];}?>">
                        </div>
                    </div>
                    <div class="col-md-4">                        
                        <div class="form-group">
                            <label for="titulo">
                                <i class="fa fa-calendar" aria-hidden="true"></i>
                                Dt. Validade
                            </label>
                            <input title="somente preencha caso o banner fique inativo na data" type='date' class="form-control" name="dtvalidade" id="dtvalidade" placeholder="Digite dt. validade" value="<?php if(isset($bannerp["dtvalidade"])){echo $bannerp["dtvalidade"];}?>">
                        </div>
                    </div>
                    <div class="col-md-2">                        
                        <div class="form-group">
                            <label for="titulo">Status</label>
                            <select class="form-control" name="status" id="status">
                                <option value="">--Selecione--</option>
                                <option value="a" <?php if(isset($bannerp["status"]) && $bannerp["status"] == "a"){echo "selected";}?>>Ativo</option>
                                <option value="i" <?php if(isset($bannerp["status"]) && $bannerp["status"] == "i"){echo "selected";}?>>Inativo</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-2">                        
                        <div class="form-group">
                            <label for="titulo">Tipo</label>
                            <select class="form-control" name="tipo" id="tipo">
                                <option value="">--Selecione--</option>
                                <option value="p" <?php if(isset($bannerp["tipo"]) && $bannerp["tipo"] == "p"){echo "selected";}?>>PopUp</option>
                                <option value="n" <?php if(isset($bannerp["tipo"]) && $bannerp["tipo"] == "n"){echo "selected";}?>>Normal</option>
                                <option value="v" <?php if(isset($bannerp["tipo"]) && $bannerp["tipo"] == "v"){echo "selected";}?>>Vagas</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="arquivo">
                                <i class="fa fa-picture-o" aria-hidden="true"></i>
                                Arquivo
                            </label>
                            <input type='file' class="form-control" name="arquivo" id="arquivo">
                            <?php 
                            if(isset($bannerp["arquivo"]) && $bannerp["arquivo"] != NULL && $bannerp["arquivo"] != ""){
                                echo "<a target='_blank' href='../arquivos/{$bannerp["arquivo"]}' title='imagem banner'>Clique para abrir Banner</a>";
                                
                            }
                            ?>
                        </div>
                    </div>                    
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="texto">Texto</label>
                            <textarea class="form-control texto" name="texto" id="texto" placeholder="Digite texto"><?php if(isset($bannerp["texto"])){echo ($bannerp["texto"]);}?></textarea>
                        </div>
                    </div>                    
                    <div class="col-md-12">
                        <div class="form-group">
                            <?php 
                            if($nivelp["inserir"] == 1 || $nivelp["atualizar"] == 1){
                                echo '<input type="submit" name="submit" id="submit" value="Salvar" class="btn btn-primary"/> ';
                            }
                            if($nivelp["excluir"] == 1 && isset($_GET["codbanner"])){
                                echo '<button class="btn btn-primary" id="btexcluirBanner" onclick="excluirBanner()">Excluir</button>  ';
                            }
                            echo '<a style="color: white" class="btn btn-primary" href="javascript: botaoNovoReload()">Novo</a> ';                            
                            ?>
                        </div>                                        
                    </div>                    
                </form>
            </div>
            <div style="display: none" class="row col-md-12 progress">
                <div id="progressbar" class="progress-bar" role="progressbar" aria-valuenow="70"
                     aria-valuemin="0" aria-valuemax="100" style="width: 0%">
                    <span id="sronly" class="sr-only">0% Complete</span>
                </div>
            </div>             
            <div class="row">
                <div id="listagemCategoriaProduto" class="col-md-12"></div>
            </div>
        </div>
    </div>
    <!--/.col (right) -->
</div>