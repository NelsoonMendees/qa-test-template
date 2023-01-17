///<reference types="Cypress" />
import { selector } from "./selectors";

Cypress.Commands.add("CadastrarCliente", (cliente) => {
  cy.contains("span", "Clientes").click();
  cy.contains("span", "Novo").should("be.visible").click();
  cy.contains("span", "Nova pessoa").click({ force: true });

  cy.get(selector.modal).should("be.visible");

  cy.get(selector.inputName).click().type(cliente.nome);
  cy.get(selector.inputEmpresa).click().type(`${cliente.empresa}{enter}`);
  cy.get(selector.inputFone).click().type(cliente.fone);

  cy.contains("button", "Comercial").click();
  cy.contains("a", "Celular").click();
  cy.get(selector.inputEmail).click().type(cliente.email);

  cy.get(selector.inputCargo).click().type(`${cliente.cargo}{enter}`);

  cy.get(selector.inputDp).click().type(`${cliente.dp}{enter}`);

  cy.contains("button", "Salvar").click();

  cy.contains("span", cliente.nome);
});

Cypress.Commands.add("EditarCliente", (cliente) => {
  cy.contains("span", "Clientes").click();
  cy.contains("span", cliente.nome).should("be.visible").click();
  cy.get(selector.btnOpcoes).click();
  cy.contains("aside", "Editar cliente").click();

  cy.get(selector.modal).should("be.visible");

  cy.get(selector.inputName).click().clear().type(cliente.nomeEditado);
  cy.get(selector.inputFone).click().clear().type(cliente.foneEditado);
  cy.get(selector.inputEmail).click().clear().type(cliente.emailEditado);

  cy.contains("button", "Salvar").click();

  cy.contains("span", cliente.nomeEditado);
});

Cypress.Commands.add("ExcluirCliente", (nome) => {
  cy.contains("span", "Clientes").click();
  cy.contains("span", nome).should("be.visible").click();
  cy.get(selector.btnOpcoes).click();
  cy.contains("aside", "Excluir cliente").click();
  cy.get(selector.modalExcluir).should("be.visible");
  cy.contains("span", "Confirmação").should("be.visible");
  cy.contains("span", `excluir o cliente "${nome}"?`).should("be.visible");
  cy.contains("span", "Tenha cuidado, esse processo é irreversível.").should(
    "be.visible"
  );

  cy.get(selector.btnConfirmar).click();
  cy.get(selector.toastSuccess).should("be.visible");
  cy.wait(3000);
});
