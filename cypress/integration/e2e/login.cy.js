///<reference types="Cypress" />
import { inv, qa } from "../../fixtures/contaQa.json";
import { validaCampos } from "../../fixtures/dataNull.json";

context("Login", () => {
  describe("Ao informar conta valida", () => {
    it("deve realizar login com sucesso", () => {
      const conta = qa;
      cy.RealizarLogin(conta);
      cy.ValidarConta(conta.nome);
    });
  });

  describe("Ao informar conta invalida", () => {
    it("deve exibir mensagem de e-mail ou senha incorretos", () => {
      const conta = inv;
      cy.RealizarLogin(conta);
      cy.ValidarUsuarioOuSenhaIncorretos();
    });
  });

  describe("Validação de campos obrigatórios", () => {
    validaCampos.forEach((valida) => {
      it(`Validar Input ${valida.input} NULL`, () => {
        cy.ValidarInputNull(valida);
      });
    });
  });
});
