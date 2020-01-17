describe('TestSiteConnection', function() {
    it('Check if site is running', function() {
        cy.visit('localhost:5000')
    })
})

describe('TestRegisteringAlreadyExistingEmail', function() {
    it('Test if user will be registered if providing already existing email', function() {
        cy.visit('localhost:5000')

        cy.contains('Sign up').click()
        cy.contains('Customer').click()

        cy.get('input').first().type('test.customer@test.com')
        cy.get('input').eq(1).type('TestUser2')
        cy.get('input').eq(2).type('123456')
        cy.get('input').last().type('123456')

        cy.get('.normal').last().click()

        cy.get('input').first().type('Test Restaurant')

        cy.contains('Email already taken')


    })
})

describe('TestRegisteringAlreadyExistingUsername', function() {
    it('Test if user will be registered if providing already existing username', function() {
        cy.visit('localhost:5000')

        cy.contains('Sign up').click()
        cy.contains('Customer').click()

        cy.get('input').first().type('test.user2@test.com')
        cy.get('input').eq(1).type('TestCustomer')
        cy.get('input').eq(2).type('123456')
        cy.get('input').last().type('123456')

        cy.get('.normal').last().click()

        cy.contains('Username already taken')

    })
})


describe('TestProvidingDifferentPasswords', function() {
    it('Test if user will be registered if providing differing passwords', function() {
        cy.visit('localhost:5000')

        cy.contains('Sign up').click()
        cy.contains('Customer').click()

        cy.get('input').first().type('test.user2@test.com')
        cy.get('input').eq(1).type('TestCustomer2')
        cy.get('input').eq(2).type('123456')
        cy.get('input').last().type('654321')

        cy.get('.normal').last().click()

        cy.contains('Password confirmation has to be identical to the password.')

    })
})


describe('TestDataInWrongFormat', function() {
    it('Test if user will be registered if some data is in wrong format or missing', function() {
        cy.visit('localhost:5000')

        cy.contains('Sign up').click()
        cy.contains('Customer').click()

        cy.get('input').first().type('test.user2test.com')
        cy.get('input').eq(2).type('1234')
        cy.get('input').last().type('1234')

        cy.get('.normal').last().click()

        cy.url().should('not.include', '/.+')

    })
})

