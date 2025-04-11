class homePage {
    vialHealthTableWebElements={
        table:()=> cy.get('[data-testid="questions-tbody"] tr'),
    }

    vialhealthModalWebElements={
        modalTitle:()=> cy.get('[data-testid="query-modal"]'),
        modalDescription:()=> cy.get('[data-testid="query-description"]'),
        modalStatusLabel:()=> cy.get('[data-testid="query-status-label"]'),
        modalStatus:()=> cy.get('[data-testid="query-status"]'),
        modalCreatedLabel:()=> cy.get('[data-testid="query-created-label"]'),
        modalCreated:()=> cy.get('[data-testid="query-created-at"]'),
        modalUpdatedLabel:()=> cy.get('[data-testid="query-updated-label"]'),
        modalUpdated:()=> cy.get('[data-testid="query-updated-at"]'),
        modalButton:()=> cy.get('[data-testid="submit-query-button"]'),
        modalResolveButton:()=> cy.get('[data-testid="resolve-query-button"]'),
        modalDeleteButton:()=> cy.get('[data-testid="delete-query-button"]')
    }

    vialHealthWebElements={
        tableName:()=> cy.get('[data-testid="title"]'),
        questionTitle:()=> cy.get('[data-testid="question-th"]'),
        answerTitle:()=> cy.get('[data-testid="answer-th"]'),
        queriesTitle:()=> cy.get('[data-testid="queries-th"]'),
        ...this.vialHealthTableWebElements        
    }


    openPage(){
        cy.visit('/');
        cy.url().should('include', '3000');
        this.vialHealthTableWebElements.table().should('be.visible')
    }


}export default new homePage();