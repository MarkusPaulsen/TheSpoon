describe('TestLogin', function() {
    it('Test if logging with password fails', function() {
        cy.visit('localhost:80')

        cy.contains('Log in').click()

        cy.get('input').first().type('TestUser')
        cy.get('input').last().type('123456')
        cy.get('.normal').last().click()

        cy.wait(2000)
        cy.visit('localhost:80/Profile')

    })

})

describe('TestChangingMail', function() {
    it('Test if changing mail will really change it', function() {

        cy.get('input').first().clear()
        cy.get('input').first().type('test.test@test.com')
        cy.get('.normal').last().click()

        cy.contains('Log in').click()

        cy.get('input').first().type('TestUser')
        cy.get('input').last().type('123456')
        cy.get('.normal').last().click()

        cy.wait(2000)
        cy.visit('localhost:80/Profile')


        cy.get('input').first().invoke('val').should('include', 'test.test@test.com')

        cy.get('input').first().clear()
        cy.get('input').first().type('test.user@test.com')
        cy.get('.normal').last().click()

    })

})
