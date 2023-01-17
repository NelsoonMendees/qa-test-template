///<reference types="Cypress" />
import {
  PrimeiroContato,
  Frio,
  Morno,
  Quente,
  Fechamento,
} from "../../fixtures/cadastroDeals.json";

describe("CRUD /Deals", () => {
  context("GET", () => {
    const validate = [
      {
        id: PrimeiroContato.StageId,
        name: "Primeiros contatos",
        title: PrimeiroContato.Title,
      },
      { id: Frio.StageId, name: "Frio", title: Frio.Title },
      { id: Morno.StageId, name: "Morno", title: Morno.Title },
      { id: Quente.StageId, name: "Quente", title: Quente.Title },
      { id: Fechamento.StageId, name: "Fechamento", title: Fechamento.Title },
    ];

    validate.forEach((stage, index) => {
      it(`Validar ${stage.title}`, () => {
        cy.getAllStages().then((res) => {
          expect(res.status).to.eql(200);
          expect(res.body.value[index].Id).to.eql(stage.id);
          expect(res.body.value[index].Name).to.eql(stage.name);
        });
      });
    });

    it("Listar Negócios Cadastrados", () => {
      cy.getAllDeals().then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body.value).to.be.not.null;
      });
    });
  });

  context("POST", () => {
    before(() => {
        cy.getIdDeals().then((response) => {
          response.body.value.forEach((value) =>
            cy.removeDeals(value.Id).then((res) => {
              expect(res.status).to.eql(200);
            })
          );
        });
      });
    it("Cadatrar Novo Negócio", () => {
      const payload = PrimeiroContato;
      cy.postDeal(payload).then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body.value[0].Title).to.eql(payload.Title);
        expect(response.body.value[0].StageId).to.eql(payload.StageId);
      });
    });
  });

  context("DELETE", () => {
    before(() => {
      const payload = Morno;
      cy.postAndGetDealId(payload).then((res) => {
        expect(res.status).to.eql(200);
        Cypress.env("dealId", res.body.value[0].Id);
      });
    });
    it("Remover Negócio", () => {
      const dealId = Cypress.env("dealId");

      cy.deleteDeal(dealId).then((response) => {
        expect(response.status).to.eql(200);
      });
    });
  });

  context("PATCH", () => {
    before(() => {
      const payload = Morno;
      cy.postAndGetDealId(payload).then((res) => {
        expect(res.status).to.eql(200);
        Cypress.env("dealId", res.body.value[0].Id);
      });
    });

    it("Editar Negócio", () => {
      const payload = Fechamento;
      const id = Cypress.env("dealId");
      cy.patchDeal(id, payload).then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body.value[0].StageId).to.eql(payload.StageId);
        expect(response.body.value[0].Title).to.eql(payload.Title);
      });
    });
  });
});
