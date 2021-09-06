tinymce.init({
    selector: ".texto",
    language: "pt_BR",
    language_url: './recursos/js/tinymce/langs/pt_BR.js',
    plugins: [
        "advlist autolink lists link charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime table contextmenu paste jbimages  textcolor colorpicker"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link jbimages | Chave | print preview | forecolor backcolor emoticons | fontselect fontsizeselect",
    fontsize_formats: '8pt 10pt 12pt 14pt 18pt 21pt 24pt 36pt 37.5pt',
    relative_urls: false,
    setup: function (editor) {
        editor.addButton('Chave', {
            type: 'listbox',
            text: 'Chaves texto',
            icon: false,
            onselect: function (e) {
                editor.insertContent(this.value());
            },
            values: [
                {text: 'Nome Curso', value: '[curso]'},
                {text: 'Nome Aluno', value: '[aluno]'},
                {text: 'Nome Instrutor', value: '[instrutor]'},
                {text: 'Horas Curso', value: '[horas]'},
                {text: 'Tel. Aluno', value: '[tel_aluno]'},
                {text: 'Email Aluno', value: '[email_aluno]'},
                {text: 'Data emissão', value: '[data_emissao]'},
                {text: 'Dt. emissão + hora', value: '[data_emissao_hora]'},
                {text: 'Data conclusão', value: '[data_conclusao]'},
                {text: 'Tipo logradouro', value: '[tipo_logradouro]'},
                {text: 'Logradouro', value: '[logradouro]'},
                {text: 'Numero', value: '[numero]'},
                {text: 'Bairro', value: '[bairro]'},
                {text: 'CEP', value: '[cep]'},
                {text: 'Cidade', value: '[cidade]'},
                {text: 'UF', value: '[uf]'},
                {text: 'Telefone', value: '[telefone]'},
                {text: 'CNPJ', value: '[cnpj]'},
                {text: 'Tipo curso', value: '[tipo_curso]'},
                {text: 'Cod. curso', value: '[cod_curso]'},
                {text: 'Cod. cliente', value: '[cod_cliente]'},
                {text: 'Conteúdo Prog.', value: '[conteudo_programatico]'}
            ],
            onPostRender: function () {
                // Select the second item by default
                this.value('&nbsp;<em>Some italic text!</em>');
            }
        });
        editor.on('change', function () {
            tinymce.triggerSave();
        });
    }
});
function inserirTexto2() {
    tinymce.activeEditor.setContent(tinymce.activeEditor.getContent() + '[local]');
}

