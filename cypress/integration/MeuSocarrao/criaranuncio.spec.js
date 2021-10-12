/// <reference types="cypress" />
import MeuSocarrao from '../../support/Pages/MeuSocarrao';
import Home from '../../support/Pages/Home';

describe('Testes de Criacao do Anuncio', () => {
  beforeEach('', () => {
    cy.viewport(1024, 768);
    cy.visit('https://www.socarrao.com.br/?ignore=true');
    Home.AcessarLogin();
    Home.PreencherLogin();
    Home.ClicarBotao();
    Home.ValidarLogin();
  });
  it('Deve poder criar um anuncio quando já logado em sua conta', () => {
    MeuSocarrao.ListenApis();
    MeuSocarrao.ClicarBotaoHome();
    MeuSocarrao.ClicarVenderVeiculo();
    MeuSocarrao.EscolherPlano();
    MeuSocarrao.PreecherPlaca();
    MeuSocarrao.PreencherMarcaModeloVersao();
    MeuSocarrao.PreencheAno();
    MeuSocarrao.PreencherKmCombustivel();
    MeuSocarrao.PreencherCambioCor();
    MeuSocarrao.PreeenchePortaBanco();
    MeuSocarrao.PreecherEstadoCidade();
    MeuSocarrao.PreencherAcessoriosCompleto();
    MeuSocarrao.PreencherBuscaAcessorios();
    MeuSocarrao.ClicarBotaoProximoPasso2();
    MeuSocarrao.PreenchePrecoDescricao();
    MeuSocarrao.ClicarBotaoProximoPasso3();
    MeuSocarrao.UploadImagens();
    MeuSocarrao.ValidaUploadImg();
    MeuSocarrao.ClicarBotaoProximoPasso4();
    MeuSocarrao.UploadRG();
    MeuSocarrao.UploadSelfie();
    MeuSocarrao.UploadCRV();  
    MeuSocarrao.ClicarBotaoProximoPasso5();
    MeuSocarrao.PreenchimentoDadosBoleto();
    MeuSocarrao.ClicarBotaoConcluir();
    MeuSocarrao.ValidaCriarAnuncio();
  });
});
