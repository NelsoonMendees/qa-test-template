///<reference types="Cypress" />
import { Empresa, Pessoa } from "../../fixtures/cadastroContacts.json";
import { EditarEmpresa, EditarPessoa } from "../../fixtures/editContacts.json";

describe("CRUD /Contacts", () => {
  context("GET", () => {
    it("Listar Empresas e Pessoas", () => {
      cy.getAllContacts().then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body).to.be.not.null;
        expect(response.body.value).to.be.a("array");
      });
    });
  });

  context("POST", () => {
    // Removendo Contacts cadastrados para reaproveitamento de massa de testes.
    before(() => {
      cy.getId().then((response) => {
        response.body.value.forEach((value) =>
          cy.removeContact(value.Id).then((res) => {
            expect(res.status).to.eql(200);
          })
        );
      });
    });
    it("Cadastrar Empresa", () => {
      const payloadEmpresa = Empresa;

      cy.postContact(payloadEmpresa).then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body.value).to.be.not.null;
        expect(response.body.value[0].Name).to.eql(payloadEmpresa.Name);

        //Criando variavel de ambiente para armazenar id da empresa
        Cypress.env("empresaId", response.body.value[0].Id);
      });
    });

    it("Cadastrar Pessoa", () => {
      const payloadPessoa = Pessoa;

      cy.postContact(payloadPessoa).then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body.value).to.be.not.null;
        expect(response.body.value[0].Name).to.eql(payloadPessoa.Name);

        //Criando variavel de ambiente para armazenar id da pessoa
        Cypress.env("pessoaId", response.body.value[0].Id);
      });
    });
  });

  context("DELETE", () => {
    it("Remover Empresa", () => {
      const idEmpresa = Cypress.env("empresaId");

      cy.deleteContact(idEmpresa).then((response) => {
        expect(response.status).to.eql(200);
      });
    });

    it("Remover Pessoa", () => {
      const idPessoa = Cypress.env("pessoaId");

      cy.deleteContact(idPessoa).then((response) => {
        expect(response.status).to.eql(200);
      });
    });
  });

  context("PATCH", () => {
    // Criando empresa e pessoa para teste do endpoint
    before(() => {
      const payload = [
        {
          data: Empresa,
          env: "IdEmpresa",
        },
        {
          data: Pessoa,
          env: "IdPessoa",
        },
      ];
      payload.forEach((contacts) => {
        cy.postContactAndGetId(contacts.data).then((res) => {
          expect(res.status).to.eql(200);
          Cypress.env(`${contacts.env}`, res.body.value[0].Id);
        });
      });
    });
    it("Editar Empresa", () => {
      const payloadEditarEmpresa = EditarEmpresa;
      const idEmpresa = Cypress.env("IdEmpresa");

      cy.patchContact(idEmpresa, payloadEditarEmpresa).then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body.value[0].Register).to.eql(Empresa.Register);
      });
    });

    it("Editar Pessoa", () => {
      const payloadEditarPessoa = EditarPessoa;
      const idPessoa = Cypress.env("IdPessoa");

      cy.patchContact(idPessoa, payloadEditarPessoa).then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body.value[0].Register).to.eql(Pessoa.Register);
      });
    });
  });
});
