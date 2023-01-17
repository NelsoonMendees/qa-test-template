///<reference types="Cypress" />

const urlApi = Cypress.env("apiUrl");
const key = Cypress.env("apiKey");

Cypress.Commands.add("getAllStages", () => {
  cy.api({
    method: "GET",
    url: urlApi + "/Deals@Stages",
    headers: {
      "user-key": key,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("getAllDeals", () => {
  cy.api({
    method: "GET",
    url: urlApi + "/Deals",
    headers: {
      "user-key": key,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("postDeal", (payload) => {
  cy.api({
    method: "POST",
    url: urlApi + "/Deals",
    body: payload,
    headers: {
      "user-key": key,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("deleteDeal", (id) => {
  cy.api({
    method: "DELETE",
    url: urlApi + `/Deals(${id})`,
    headers: {
      "user-key": key,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("patchDeal", (id, payload) => {
  cy.api({
    method: "PATCH",
    url: urlApi + `/Deals(${id})`,
    body: payload,
    headers: {
      "user-key": key,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});
