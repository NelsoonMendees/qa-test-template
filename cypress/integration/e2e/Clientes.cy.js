///<reference types="Cypress" />
import pessoa from "../../fixtures/pessoa.json";
import { qa } from "../../fixtures/contaQa.json";
import { PessoaDel } from "../../fixtures/cadastroContacts.json";

context("Clientes", () => {
  beforeEach(() => {
    const conta = qa;
    cy.RealizarLogin(conta);
    cy.ValidarConta(conta.nome);
  });
  describe("Cadastrar", () => {
    // Removendo Contacts cadastrados para reaproveitamento de massa de testes.
    before(() => {
      cy.getContactId().then((response) => {
        response.body.value.forEach((value) =>
          cy.removeContact(value.Id).then((res) => {
            expect(res.status).to.eql(200);
          })
        );
      });
    });
    it("Cadastrar Cliente", () => {
      cy.CadastrarCliente(pessoa);
    });
  });

  describe("Editar", () => {
    it("Editar Cliente", () => {
      cy.EditarCliente(pessoa);
    });
  });

  describe("Deletar", () => {
    before(() => {
      const payload = PessoaDel;
      cy.postContactAndGetId(payload).then((response) => {
        expect(response.status).to.eql(200);
        Cypress.env("removeContact", response.body.value[0].Name);
      });
    });
    it("Excluir Cliente", () => {
      const nome = Cypress.env("removeContact");
      cy.ExcluirCliente(nome);
    });
  });
});
