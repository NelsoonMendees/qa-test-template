import "@bahmutov/cy-api";
import "./commands/apiCommands/contacts/contactsCommands";
import "./commands/apiCommands/deals/dealsCommands";
import "./commands/apiCommands/setUp/setUpCommands";
import "./commands/e2eCommands/clientes/clientesCommands";
import "./commands/e2eCommands/login/loginCommands";
import "./commands/e2eCommands/negocios/negociosCommands";
require("@shelex/cypress-allure-plugin");

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
