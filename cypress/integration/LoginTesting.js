describe('TestSiteConnection', function() {
    it('Check if site is running', function() {
        cy.visit('localhost:5000')
    })
})

describe('TestLoginFailedWhenWrongPassword', function() {
    it('Test if logging with wrong password fails', function() {
        cy.visit('localhost:5000')

        cy.contains('Log in').click()

        cy.get('input').first().type('TestUser')
        cy.get('input').last().type('12345678')
        cy.get('.normal').last().click()

        cy.contains('Invalid username or password')
    })
})

describe('LoginFailedWhenMissingPassword', function() {
    it('Test if logging with missing password fails', function() {
        cy.visit('localhost:5000')

        cy.contains('Log in').click()

        cy.get('input').first().type('TestUser')
        cy.get('.normal').last().click()

        cy.url().should('not.include', '/.+')
    })
})

describe('TestLoginFailedWhenUsernameDoesNotExits', function() {
    it('Test if logging with non existing username fails', function() {
        cy.visit('localhost:5000')

        cy.contains('Log in').click()

        cy.get('input').first().type('ABCDEFGHIJKL')
        cy.get('input').last().type('123456')
        cy.get('.normal').last().click()

        cy.contains('Invalid username or password')
    })
})

describe('LoginFailedWhenMissingUsername', function() {
    it('Test if logging with missing username fails', function() {
        cy.visit('localhost:5000')

        cy.contains('Log in').click()

        cy.get('input').last().type('123456')
        cy.get('.normal').last().click()

        cy.url().should('not.include', '/.+')    })
})


describe('TestLogin', function() {
    it('Test if logging with password fails', function() {
        cy.visit('localhost:5000')

        cy.contains('Log in').click()

        cy.get('input').first().type('TestUser')
        cy.get('input').last().type('123456')
        cy.get('.normal').last().click()

        cy.url().should('include', '/YourRestaurant')
    })

})

