///<reference types="Cypress" />
import { qa } from "../../fixtures/contaQa.json";
import negocio from "../../fixtures/negocio.json";
import { PrimeiroContato } from "../../fixtures/cadastroDeals.json";

context("Negocios", () => {
  beforeEach(() => {
    const conta = qa;
    cy.RealizarLogin(conta);
    cy.ValidarConta(conta.nome);
  });
  describe("Cadastrar", () => {
    before(() => {
      cy.getIdDeals().then((response) => {
        response.body.value.forEach((value) =>
          cy.removeDeals(value.Id).then((res) => {
            expect(res.status).to.eql(200);
          })
        );
      });
    });
    it("Cadastrar novo negócio", () => {
      cy.CadatrarNegocio("Frio", negocio);
    });
  });

  describe("Editar", () => {
    before(() => {
      const payload = PrimeiroContato;
      cy.postDeal(payload).then((res) => {
        expect(res.status).to.eql(200);
        Cypress.env("editDeal", res.body.value[0].Title);
      });
    });

    it("Editar negócio", () => {
      const nome = Cypress.env("editDeal");
      cy.EditarNegocio(nome, negocio);
    });
  });

  describe("Deletar", () => {
    it("Deletar negócio", () => {
      cy.ExcluirNegocio(negocio.tituloEditado);
    });
  });
});
