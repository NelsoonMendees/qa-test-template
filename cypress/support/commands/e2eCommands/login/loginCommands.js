import { selector } from "./selectors";

Cypress.Commands.add("RealizarLogin", (conta) => {
  cy.visit("/");
  cy.title().should("eq", "Ploomes");
  cy.contains("span", "Login").should("be.visible");

  cy.get(selector.inputEmail).type(conta.email);
  cy.get(selector.inputSenha).type(conta.senha);

  cy.contains("button", "Entrar").should("be.visible").click();
});

Cypress.Commands.add("ValidarConta", (nomeConta) => {
  cy.intercept("GET", "https://app52-api2.ploomes.com/Timeline?**").as(
    "timeLine"
  );
  cy.intercept("GET", "https://app52-api2.ploomes.com/Deals/**").as("deals");

  cy.wait("@deals");
  cy.wait("@timeLine");

  cy.contains("span", nomeConta).should("be.visible");
});

Cypress.Commands.add("ValidarUsuarioOuSenhaIncorretos", () => {
  cy.get(selector.alert)
    .should("be.visible")
    .and("have.text", "E-mail ou senha incorretos");
});

Cypress.Commands.add("ValidarInputNull", (conta) => {
  cy.visit("/");
  cy.title().should("eq", "Ploomes");
  cy.contains("span", "Login").should("be.visible");

  if (conta.email === "") {
    cy.get(selector.inputSenha).type(conta.senha);
    cy.contains("button", "Entrar").should("be.visible").click();

    cy.get(selector.inputEmail)
      .invoke("prop", "validationMessage")
      .should((text) => {
        expect(conta.msg).to.eq(text);
      });
  } else if (conta.senha === "") {
    cy.get(selector.inputEmail).type(conta.email);
    cy.contains("button", "Entrar").should("be.visible").click();

    cy.get(selector.inputSenha)
      .invoke("prop", "validationMessage")
      .should((text) => {
        expect(conta.msg).to.eq(text);
      });
  }
});
