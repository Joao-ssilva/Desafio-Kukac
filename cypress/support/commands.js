// cypress/support/commands.js

// Comando para visitar a página principal do Kanban
Cypress.Commands.add('visitKanban', () => {
  cy.visit('/');
  cy.contains('h1', 'Quadro Kanban')
});

// Comando para criar uma nova lista no quadro Kanban
Cypress.Commands.add('createList', (listName) => {
  cy.contains('Adicionar outra lista').click() 
  cy.get('input[type="text"]').type(`${listName}`);
  cy.contains('button', 'Adicionar Lista').click()
  cy.contains(listName).should('be.visible'); 
});

// Comando para criar um novo cartão em uma lista específica
Cypress.Commands.add('createCard', (listName, cardName) => {
  cy.get(`#${listName}CreateTask`).find('p')
    .contains('Adicionar Tarefa')
    .click();
  cy.get('input[type="text"]').type(`${cardName}`);
  cy.contains('button', 'Enviar').click()
  cy.contains(cardName).should('be.visible');
});


// Comando para editar o título de um cartão
Cypress.Commands.add('editCard', (oldCard, newCard) => {
  cy.contains(`${oldCard}`)
  .click()
  cy.contains(`${oldCard}`)
  .click()
  cy.get('input[type="text"]').type(`${newCard}`); 
  cy.contains('button', 'Editar Nome da task').click();
  cy.contains(newCard).should('be.visible');
});


// Comando para excluir uma lista
Cypress.Commands.add('deleteList', (listName) => {
  cy.contains(listName) 
// encontra o header pela h1 que contém '1', sobe para o header e encontra o svg da lixeira
  cy.contains('h1.board-header-title', `${listName}`)
  .parent()                  // header
  .find('.trash svg')        // svg dentro do div.trash
  .should('be.visible')      // opcional: garante que está visível
  .click();
  cy.contains(listName).should('not.exist');
});


// Comando para excluir um cartão
Cypress.Commands.add('deleteCard', (cardName) => {
  cy.contains('p', `${cardName}`)
  .closest('header')
  .find('svg.trash')
  .click({ force: true });
  cy.contains(cardName).should('not.exist');
});
