Cypress.Commands.add("getAllContacts", () => {
  const url = Cypress.env("apiUrl");
  cy.api({
    method: "GET",
    url: url + "/Contacts",
    headers: {
      "user-key": Cypress.env("apiKey"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});

Cypress.Commands.add("postContact", (payload) => {
  const url = Cypress.env("apiUrl");
  cy.api({
    method: "POST",
    url: url + "/Contacts",
    body: payload,
    headers: {
      "user-key": Cypress.env("apiKey"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});

Cypress.Commands.add("deleteContact", (id) => {
  const url = Cypress.env("apiUrl");
  cy.api({
    method: "DELETE",
    url: url + `/Contacts(${id})`,
    headers: {
      "user-key": Cypress.env("apiKey"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});

Cypress.Commands.add("patchContact", (id, payload) => {
  const url = Cypress.env("apiUrl");
  cy.api({
    method: "PATCH",
    url: url + `/Contacts(${id})`,
    body: payload,
    headers: {
      "user-key": Cypress.env("apiKey"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});
