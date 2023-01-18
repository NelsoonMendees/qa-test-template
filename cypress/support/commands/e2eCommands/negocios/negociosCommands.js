///<reference types="Cypress" />
import { selector } from "./selectors";

Cypress.Commands.add("CadatrarNegocio", (stage, negocio) => {
  cy.contains("span", "Negócios").click();
  cy.url().should("contain", "/Deals/funnel");
  cy.get(selector.btnNovoNegocio).click();
  cy.get(`[uib-tooltip="${stage}"]`).click();
  cy.get(selector.inputTitulo).click().type(negocio.titulo);
  cy.get(selector.inputValor).click().type(negocio.valor);
  cy.get(selector.inputCliente)
    .click()
    .type(`${negocio.cliente}{downArrow}{enter}`, { delay: 50 });
  cy.get(selector.inputOrigem)
    .click()
    .type(`${negocio.origem}{downArrow}{enter}`, { delay: 50 });

  cy.contains("button", "Salvar").click();
  cy.wait(2000);
  cy.contains("span", "Negócios").click();
  cy.wait(2000);
  cy.get(`[uib-tooltip="${negocio.titulo}"]`).should("be.visible");
});

Cypress.Commands.add("EditarNegocio", (nome, negocio) => {
  cy.contains("span", "Negócios").click();
  cy.url().should("contain", "/Deals/funnel");
  cy.get(`[uib-tooltip="${nome}"]`).should("be.visible").click();
  cy.get(selector.btnOpcoes).click();
  cy.contains("aside", "Editar negócio").click();
  cy.get(selector.inputTitulo).click().clear().type(negocio.tituloEditado);
  cy.get(selector.inputValor).click().clear().type(negocio.valorEditado);
  cy.get(selector.inputOrigem)
    .click()
    .clear()
    .type(`${negocio.origemEditado}{downArrow}{enter}`, { delay: 50 });
  cy.contains("button", "Salvar").click();
  cy.wait(2000);
  cy.contains("span", "Negócios").click();
  cy.wait(2000);
  cy.get(`[uib-tooltip="${negocio.tituloEditado}"]`).should("be.visible");
});

Cypress.Commands.add("ExcluirNegocio", (nome) => {
  cy.contains("span", "Negócios").click();
  cy.url().should("contain", "/Deals/funnel");
  cy.get(`[uib-tooltip="${nome}"]`).should("be.visible").click();
  cy.get(selector.btnOpcoes).click();
  cy.contains("aside", "Excluir negócio").click();
  cy.contains("span", nome).should("be.visible");
  cy.get(selector.btnConfirma).click();
  cy.get(selector.toastSuccess).should("be.visible");
});
