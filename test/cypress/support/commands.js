// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('checkAllPageElementsVisible', (elements) => {
    Object.keys(elements).forEach((key) => {
        elements[key]().should('be.visible');
    })
})

Cypress.Commands.add('checkQuestions', (elements, questions) => {
    elements().each((row,i)=> {
        cy.wrap(row).find('td').eq(0).scrollIntoView().should('contain', questions[i]); 
    })
})

Cypress.Commands.add('checkAnswer', (elements, questions) => {
    elements().each((row,i)=> {
        cy.wrap(row).find('td').eq(1).scrollIntoView().should('contain', questions[i]); 
    })
})

Cypress.Commands.add('getIconForQuestion', (table, question) => {
    return table().contains('td', question).parents('tr').find('svg');
});

