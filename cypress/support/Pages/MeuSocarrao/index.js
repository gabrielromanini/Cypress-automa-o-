const el = require('./elements').ELEMENTS;
const dt = require('../../../fixtures/dadosUsuario').DATA;
class MeuSocarrao {
  // FUncao que fica escutando as APIs Acionadas durante o processo
  ListenApis() {
    cy.intercept('GET', '**/api/brands?id=0&all=0').as('Marca');
    cy.intercept('GET', '**/api/models/all?brandId[]=139').as('Modelo');
    cy.intercept('GET', '**/api/versions/all?modelId[]=2').as('Versao');
    cy.intercept('POST', '**/api/announce/images').as('UploadImgVeiculo');
    cy.intercept('POST', '**/api/announce/createVehicleWithAds').as(
      'CriaVeiculo');
    cy.intercept('POST', '**/api/announce/store/vehicles').as(
      'CriaAnuncio');
  }
  //clica na logo para retornar para home 
  ClicarBotaoHome() {
    cy.get(el.logo).click();
    cy.get(el.fraseTopoHome).should('be.visible');
  }
  //Clica em "Vender Veiculo" para que seja direcionado para a tela de Planos
  ClicarVenderVeiculo() {
    cy.get(el.botaoVenderVeiculo).click();
    cy.get(el.planos).should('be.visible');
  }
  //Seleciona um plano dos disponiveis na tela
  EscolherPlano() {
    cy.get(el.planoStarter).click();
    cy.get(el.passoUmAtivo).should('be.visible');
  }
  // Localiza o input da placa e inseri uma placa
  PreecherPlaca() {
    cy.get(el.acessorios).should('be.visible');
    cy.get(el.inputPlaca).type('dfj-4t54');
  }
  // Localiza os e seleciona marca, Modelo e Versao
  PreencherMarcaModeloVersao() {
    cy.get(el.inputMarca).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectMarca).click();
    cy.get(el.inputModelo).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectModelo).click();
    cy.get(el.inputVersao).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectVersao).click();
  }
  //Localiza e preenche AnoFabricaçáo e AnoModelo
  PreencheAno() {
    cy.get(el.inputAnoF).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectAnoF).click();
    cy.get(el.inputAnoM).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectAnoM).click();
  }
  //Localiza e preenche Kilometragem e Combustivel
  PreencherKmCombustivel() {
    cy.get(el.inputKm).type('123321');
    cy.get(el.inputCombustivel).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectCombustivel).click();
  }
  //Localiza e preenche Cambio e Cor
  PreencherCambioCor() {
    cy.get(el.inputCambio).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectCambio).click();
    cy.get(el.inputCor).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectCor).click();
  }
  //Localiza e preeenche portase bancos
  PreeenchePortaBanco() {
    cy.get(el.inputPorta).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectPorta).click();
    cy.get(el.inputBanco).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectBanco).click();
  }
  // Localiza e preenche estado e cidade
  PreecherEstadoCidade() {
    cy.get(el.inputEstado).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectEstado).click();
    cy.get(el.inputCidade).click();
    cy.get(el.dropdownInput).should('be.visible');
    cy.get(el.selectCidade).click();
  }
  // Clia no check 'completo' na listagem de acessorios
  PreencherAcessoriosCompleto() {
    cy.get(el.checkAcessoriosCompleto).click();
  }
  // Clica na busca por acessorios digita um termo e seleciona o check do termo pesquisado
  PreencherBuscaAcessorios() {
    cy.get(el.inputBuscaAcessorios).type('som');
    cy.get(el.checkAcessorioBuscado).click();
  }
  //Clica no botão 'Proximo' e valida que foi direcionado para a URL correta
  ClicarBotaoProximoPasso2() {
    cy.get(el.botaoProximo).click();
    cy.url().should('include', '/passo?advertisement=1&stepper=2');
    cy.get(el.passoDoisAtivo).should('be.visible');
  }
  // Preenche os inputs de preço e descrição
  PreenchePrecoDescricao() {
    cy.get(el.inputValor).type(20000);
    cy.get(el.inputDescricao).type(
      'Descrição do veiculo inserida pelo usuário.'
    );
  }
  //Clica no botão proximo e validar se foi redirecionado para a url correta
  ClicarBotaoProximoPasso3() {
    cy.get(el.botaoProximo).click();
    cy.url().should('include', '/passo?advertisement=1&stepper=3');
    cy.get(el.passoTresAtivo).should('be.visible');
    cy.get(el.botãoTutorialImagens).click();
  }
  
 //Realiza o upload das imagens
  UploadImagens() {
    cy.get(el.uploadImagens).attachFile(
      ['img1.jpg','img2.jpg','img3.jpg','img4.jpg','img5.jpg'],
      { subjectType: 'drag-n-drop' }
    );
  }

  //Valida se o retorno do uploads das imagens inseridas retorna status 200
  ValidaUploadImg() {
    //Validação da img1 imagens se retornou status 200
    cy.wait('@UploadImgVeiculo');
    cy.get('@UploadImgVeiculo').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
    });
    //Validação da img2 imagens se retornou status 200
    cy.wait('@UploadImgVeiculo');
    cy.get('@UploadImgVeiculo').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
    });
    //Validação da img3 imagens se retornou status 200
    cy.wait('@UploadImgVeiculo');
    cy.get('@UploadImgVeiculo').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
    });
    //Validação da img4 imagens se retornou status 200
    cy.wait('@UploadImgVeiculo');
    cy.get('@UploadImgVeiculo').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
    });
    //Validação da img5 imagem se retornou status 200
    cy.wait('@UploadImgVeiculo');
    cy.get('@UploadImgVeiculo').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
    });
  }

   //Upload de uma foto do seu doc e Clica no botão 'Proximo' e valida que foi direcionado para a URL correta
  ClicarBotaoProximoPasso4() {
    cy.get('.spinner').should('not.exist');
    cy.get(el.botaoProximo).click();
    cy.get(el.passoQuatroAtivo).should('be.visible');
    cy.url().should('include', '/passo?advertisement=1&stepper=4');
  }

  //Realiza o upload das imagens dos documentos RG
  UploadRG(){
    cy.get(el.uploadRG).attachFile(
      ['docVeiculo.png'],
      {subjectType: 'drag-n-drop'}
    );
  }

 // Faz upload de uma foto seu com documento
 UploadSelfie() {
  cy.get('.docs-step2').attachFile(
    ['Testedoc.png'],
    {subjectType: 'drag-n-drop'}
  );
}

 // Faz upload de uma foto CRV
 UploadCRV() {
  cy.get('.docs-step3').attachFile(
    ['Testedoc2.png'],
    {subjectType: 'drag-n-drop'}
  );
}

  //Clica no botão 'Proximo' e valida que foi direcionado para a URL correta
  ClicarBotaoProximoPasso5() {
    cy.get(el.botaoRemoverImagem).should('be.visible');
    cy.get(el.botaoProximo).click();
    cy.get(el.passoCincoAtivo).should('be.visible');
    cy.url().should('include', '/passo?advertisement=1&stepper=5');
  }
  //Seleciona pagamento boleto e insere dados de pagamento
  PreenchimentoDadosBoleto() {
    cy.get(el.selecionaBoleto).click();
    cy.get(el.formDadosBoleto).should('be.visible');
    cy.get(el.inputNome).clear().type(dt.name);
    cy.get(el.inputRua).clear().type(dt.rua);
    cy.get(el.inputNumero).clear().type(dt.numero);
    cy.get(el.inputBairro).clear().type(dt.bairro);
    cy.get(el.inputCep).clear().type(dt.cep);
    cy.get(el.inputCidadeBoleto).clear().type(dt.cidade)
    cy.get(el.inputEstadoBoleto).click();
    cy.get(el.selectEstadoBoleto).click();
    cy.get(el.inputCpf).clear().type(dt.cpf);
    cy.get(el.inputDtNasc).clear().type(dt.dataNasc);
    cy.get(el.inputEmail).clear().type(dt.email);
    cy.get(el.inputFone).clear().type(dt.fone);
  }
  //clica no botão "Concluir" e valida se direcionou para a url de finalização de anuncio
  ClicarBotaoConcluir(){
    cy.get(el.botaoConcluir).click();
    cy.url().should('include', '/meu-socarrao/anunciar/finished');
  }
  // valida o retorno da api se o anuncio foi criado corretamente
  ValidaCriarAnuncio(){
    cy.wait('@CriaAnuncio');
    cy.get('@CriaAnuncio').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.action).to.equal('CREATE');
    });
  }
}
export default new MeuSocarrao();
