describe('TestLogin', function() {
    it('Test if logging with password fails', function() {
        cy.visit('localhost:5000')

        cy.contains('Log in').click()

        cy.get('input').first().type('TestUser')
        cy.get('input').last().type('123456')
        cy.get('.normal').last().click()
        cy.wait(2000)

    })

})

describe('CreateNewMenu', function() {
    it('Test creating new menu', function() {

        cy.get('.wide').first().click()

        // cy.get('input').first().type('TestUser')
        // cy.get('input').last().type('123456')
        // cy.get('.normal').last().click()

    })

})

