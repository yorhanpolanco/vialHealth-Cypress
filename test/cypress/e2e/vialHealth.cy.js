import homePage from "../pom/homePage.js";
import dayjs from 'dayjs';

describe(`Validate the vial health page`, () => {
    let tableData;

    beforeEach(() => {
        cy.viewport("macbook-15");
        cy.fixture("vialHealthData").then((data) => {
            tableData = data;
        });
        homePage.openPage();
    });


    it("validate that all web elements load on the page", () => {
        cy.title().should("eq", tableData.tabTitle);
        cy.checkAllPageElementsVisible(homePage.vialHealthWebElements);
    });

    it("TC-01: Validate data table display", () => {        
        const questions = tableData.questions.map(item => item.question);
        const question = questions[3];
        const answers = tableData.questions.map(item => item.answer);
        homePage.vialHealthWebElements.tableName().should("contain", tableData.tableTitle);
        homePage.vialHealthWebElements.questionTitle().should("contain", tableData.columns.firstColumnTitle);
        homePage.vialHealthWebElements.answerTitle().should("contain", tableData.columns.secondColumnTitle);
        homePage.vialHealthWebElements.queriesTitle().should("contain", tableData.columns.thirdColumnTitle);
        cy.checkQuestions(homePage.vialHealthTableWebElements.table, questions);
        cy.checkAnswer(homePage.vialHealthTableWebElements.table, answers);
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).should('have.attr', 'stroke', 'blue').find('path').should('have.length', 2);
    });

    it("TC-02: Validate the creation of a new query with a short description", () => {
        cy.intercept("POST", `${Cypress.env('API_URL')}/queries`).as("createRequest");        

        const questions = tableData.questions.map(item => item.question);
        const question = questions[3];
        const answer = tableData.questions[3].answer;
        const query = tableData.query.shortAnswer;
        
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).trigger('mouseover');
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).find('title').should('contain',  'Add Query');
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).click();

        cy.intercept("GET", `${Cypress.env('API_URL')}/form-data`).as("getTableDataRequest");

        homePage.vialhealthModalWebElements.modalTitle().should('contain',question);
        homePage.vialhealthModalWebElements.modalDescription().type(query)
        homePage.vialhealthModalWebElements.modalButton().click();

        cy.wait("@createRequest").then((resp) => {
            expect(resp.response.statusCode).to.equal(200);
            expect(resp.response.body.data).to.have.property("id").to.not.be.empty;
            expect(resp.response.body.data).to.have.property("title", question);
            expect(resp.response.body.data).to.have.property("description", query);
            expect(resp.response.body.data).to.have.property("status", "OPEN");
            expect(resp.response.body.data.formData).to.have.property("id").to.not.be.empty;
            expect(resp.response.body.data.formData).to.have.property("question", question);
            expect(resp.response.body.data.formData).to.have.property("answer", answer);
            expect(resp.response.body).to.have.property("message", "success");
        });

        cy.wait("@getTableDataRequest").then((resp) => {
            expect(resp.response.statusCode).to.equal(200);
            expect(resp.response.body.data).to.have.property("total",questions.length);
            expect(resp.response.body.data.formData).to.have.length(questions.length);
            const questionData = resp.response.body.data.formData.find(item => item.question === question);
            expect(questionData).to.have.property("id").to.not.be.empty;
            expect(questionData).to.have.property("question", question);
            expect(questionData).to.have.property("answer", answer);
            expect(questionData.query).to.have.property("id").to.not.be.empty;
            expect(questionData.query).to.have.property("title", question);
            expect(questionData.query).to.have.property("description", query);
            expect(questionData.query).to.have.property("status", "OPEN");  
        })

        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).should('have.attr', 'stroke', 'red').find('path').should('have.length', 2);
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).trigger('mouseover');
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).find('title').should('contain', tableData.toolTip.open);
    
    })

    it("TC-04: Validate the creation of a new query with a description containing numbers", () => {
        cy.intercept("POST", `${Cypress.env('API_URL')}/queries`).as("createRequest");        

        const questions = tableData.questions.map(item => item.question);
        const question = questions[4];
        const answer = tableData.questions[4].answer;
        const query=tableData.query.answerWithNumbers;

        
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).trigger('mouseover');
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).find('title').should('contain', 'Add Query');
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).click();

        cy.intercept("GET", `${Cypress.env('API_URL')}/form-data`).as("getTableDataRequest");

        homePage.vialhealthModalWebElements.modalTitle().should('contain',question);
        homePage.vialhealthModalWebElements.modalDescription().type(query)
        homePage.vialhealthModalWebElements.modalButton().click();

        cy.wait("@createRequest").then((resp) => {
            expect(resp.response.statusCode).to.equal(200);
            expect(resp.response.body.data).to.have.property("id").to.not.be.empty;
            expect(resp.response.body.data).to.have.property("title", question);
            expect(resp.response.body.data).to.have.property("description", query);
            expect(resp.response.body.data).to.have.property("status", "OPEN");
            expect(resp.response.body.data.formData).to.have.property("id").to.not.be.empty;
            expect(resp.response.body.data.formData).to.have.property("question", question);
            expect(resp.response.body.data.formData).to.have.property("answer", answer);
            expect(resp.response.body).to.have.property("message", "success");
        });

        cy.wait("@getTableDataRequest").then((resp) => {
            expect(resp.response.statusCode).to.equal(200);
            expect(resp.response.body.data).to.have.property("total",questions.length);
            expect(resp.response.body.data.formData).to.have.length(questions.length);
            const questionData = resp.response.body.data.formData.find(item => item.question === question);
            expect(questionData).to.have.property("id").to.not.be.empty;
            expect(questionData).to.have.property("question", question);
            expect(questionData).to.have.property("answer", answer);
            expect(questionData.query).to.have.property("id").to.not.be.empty;
            expect(questionData.query).to.have.property("title", question);
            expect(questionData.query).to.have.property("description", query);
            expect(questionData.query).to.have.property("status", "OPEN");  
        })

        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).should('have.attr', 'stroke', 'red').find('path').should('have.length', 2);
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).trigger('mouseover');
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).find('title').should('contain', tableData.toolTip.open);
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).click();
        homePage.vialhealthModalWebElements.modalDeleteButton().click();       
    })

    it("TC-06: Validate the display of a query with OPEN status", () => {
        const questions = tableData.questions.map(item => item.question);
        const question = questions[3];
        const answer = tableData.questions[3].answer;
        const query=tableData.query.shortAnswer;
        const currentDate = dayjs().format('M/D/YYYY');

        
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).trigger('mouseover');
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).find('title').should('contain', tableData.toolTip.open);
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).click();

        homePage.vialhealthModalWebElements.modalTitle().should('contain',question);
        homePage.vialhealthModalWebElements.modalStatusLabel().should('contain','Query Status')
        homePage.vialhealthModalWebElements.modalStatus().should('contain','OPEN')
        homePage.vialhealthModalWebElements.modalCreatedLabel().should('contain','Created At')
        homePage.vialhealthModalWebElements.modalCreated().should('contain',currentDate)
        homePage.vialhealthModalWebElements.modalUpdatedLabel().should('contain','Updated At')
        homePage.vialhealthModalWebElements.modalUpdated().should('contain',currentDate)
        homePage.vialhealthModalWebElements.modalDescription().should('contain',query)
        homePage.vialhealthModalWebElements.modalResolveButton().should('be.visible')
        homePage.vialhealthModalWebElements.modalDeleteButton().should('be.visible')
        homePage.vialhealthModalWebElements.modalDeleteButton().click();       
    })

    it('TC-07: Validate the resolution of a query in "OPEN" status', () => {
        cy.intercept("POST", `${Cypress.env('API_URL')}/queries`).as("createRequest");        

        const questions = tableData.questions.map(item => item.question);
        const question = questions[3];
        const answer = tableData.questions[3].answer;
        const query = tableData.query.shortAnswer;

        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).click();
        homePage.vialhealthModalWebElements.modalDescription().type(query)
        homePage.vialhealthModalWebElements.modalButton().click();
        
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).click();
        
        cy.wait("@createRequest").then((resp) => {
            const putID=resp.response.body.data.id;
        cy.intercept("PUT", `${Cypress.env('API_URL')}/queries/${putID}`).as("resolveRequest");
         
        
        homePage.vialhealthModalWebElements.modalResolveButton().click();

        cy.wait("@resolveRequest").then((put) => {
            expect(put.response.statusCode).to.equal(200);
            expect(put.response.body.data).to.have.property("id",putID);
            expect(put.response.body.data).to.have.property("title", `Query for ${question}`);
            expect(put.response.body.data).to.have.property("description", query);
            expect(put.response.body.data).to.have.property("status", "RESOLVED");
            expect(put.response.body.data.formData).to.have.property("id").to.not.be.empty;
            expect(put.response.body.data.formData).to.have.property("question", question);
            expect(put.response.body.data.formData).to.have.property("answer", answer);
            expect(put.response.body).to.have.property("message", "success");
        });
    }) 
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).should('have.attr', 'stroke', 'green').find('path').should('have.length', 1);
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).click();
        homePage.vialhealthModalWebElements.modalDeleteButton().click();
        cy.getIconForQuestion(homePage.vialHealthTableWebElements.table, question).should('have.attr', 'stroke', 'blue').find('path').should('have.length', 2);

    })

});