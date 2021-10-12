/// <reference types="cypress" />
import Home from '../../support/Pages/Home';

describe('Testes de Login', () => {
  beforeEach('', () => {
    cy.visit('https://www.socarrao.com.br/?ignore=true');
  });
  it('Deve poder realizar login', () => {
    Home.AcessarLogin();
    Home.PreencherLogin();
    Home.ValidarLogin();
  });
});
