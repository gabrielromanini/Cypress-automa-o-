const el = require('./elements').ELEMENTS;
const dt = require ('../../../fixtures/dadosUsuario').DATA;
class Home {
  // Ações Login
  // Ação de Clique no botão entrar;
  // Ouvindo  o endpoint /api/auth/login
  AcessarLogin() {
    cy.intercept('POST', '**/api/auth/login').as('login');
    cy.get(el.login).click();
  }
  // Confirma se o drop down esta visivel
  // Preenche os inputs de Email e Senha
  // Clica no botão Entrar
  PreencherLogin() {
    cy.get(el.loginDropDown).should('be.visible');
    cy.get(el.inputEmail).type(dt.email);
    cy.get(el.inputSenha).type(dt.senha);
  }
  // Clica no botao "Entrar"
  ClicarBotao() {
    cy.get(el.buttonEntrar).click();
  }

  // Valida se o response dp request de login retorna 200
  // Valida de o body do response tem a propriedade "success"
  // Printa o conteudo da propriedade "success"
  ValidarLogin() {
    cy.wait('@login');
    cy.get('@login').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.success).to.eq(true);
      expect(request.body.user_access).to.equal(dt.email);
    });
  }
  // fim do teste de login 
}

export default new Home();
