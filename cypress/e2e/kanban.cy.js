// cypress/e2e/kanban.cy.js

describe('Testes E2E - Kanban', () => {
  beforeEach(() => {
    cy.visitKanban();
  });

  it('Deve criar uma coluna', () => {
    cy.createList('Lista Teste 01');
  });

  it('Deve criar um cartão em uma coluna', () => {
    cy.createList('List');
    cy.createCard('List', 'Tarefa original');
  });
 
  it('Deve editar o nome de um cartão', () => {
    cy.createList('Lista01');
    cy.createCard('Lista01', 'Tarefa original');
    cy.editCard('Tarefa original', 'Tarefa Alterada');
  });

  it('Deve excluir uma lista', () => {
    cy.createList('Lista Teste');
    cy.deleteList('Lista Teste');
  });


  it('Deve excluir um cartão', () => {
    cy.createList('Lista01');
    cy.createCard('Lista01', 'Tarefa original');
    cy.deleteCard('Tarefa original');
  });

  it('Deve criar uma lista e dentro um cartão com todas as 3 tags', () => {
    let c = 0
    let tag = 1
    cy.createList('Lista02');
    cy.createCard('Lista02', 'Criar 3 tags');
    cy.contains('Criar 3 tags')
    .click()
     for (let i = 1; i <= 3; i++){
       cy.get(`#${c}Color`).click()
       cy.contains('p', 'Adicionar nova Tag').click()
       cy.get('input[type="text"]').type(`Tag ${tag}`);
       cy.contains('Enviar').click()
       c += 1
       tag += 1
    } 
    cy.get('body').click(10, 10);
    cy.contains('h1.board-header-title', 'Lista02')
      .closest('div.sc-iBkjds')                      
      .within(() => {                                
        cy.get('footer').within(() => {
        cy.get('label').should('have.length', 3);
      });

    });

  });

  it('Deve alternar entre modo escuro e claro', () => {
    const toggleVisual = 'div.react-switch-bg';
    const toggleInput = 'input[type="checkbox"][role="switch"]';

    cy.get(toggleInput).should('have.attr', 'aria-checked', 'true');

    cy.get(toggleVisual).click();
    cy.get(toggleInput).should('have.attr', 'aria-checked', 'false');

    cy.get(toggleVisual).click();
    cy.get(toggleInput).should('have.attr', 'aria-checked', 'true');
  });

});
