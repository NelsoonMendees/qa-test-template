///<reference types="Cypress" />
const urlApi = Cypress.env("apiUrl");
const key = Cypress.env("apiKey");

//#region SetUp - Contacts
Cypress.Commands.add("getContactId", () => {
  cy.request({
    method: "GET",
    url: urlApi + "/Contacts",
    headers: {
      "user-key": key,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("postContactAndGetId", (payload) => {
  cy.request({
    method: "POST",
    url: urlApi + "/Contacts",
    body: payload,
    headers: {
      "user-key": Cypress.env("apiKey"),
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("removeContact", (id) => {
  cy.request({
    method: "DELETE",
    url: urlApi + `/Contacts(${id})`,
    headers: {
      "user-key": key,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

//#endregion

//#region SetUp - Deals

Cypress.Commands.add("getStagesId", () => {
  cy.request({
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

Cypress.Commands.add("getIdDeals", () => {
  cy.request({
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

Cypress.Commands.add("postAndGetDealId", (payload) => {
  cy.request({
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

Cypress.Commands.add("removeDeals", (id) => {
  cy.request({
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
//#endregion
