describe('TestLogin', function() {
    it('Test if logging with password fails', function() {
        cy.visit('localhost:5000')

        cy.contains('Log in').click()

        cy.get('input').first().type('TestUser')
        cy.get('input').last().type('123456')
        cy.get('.normal').last().click()

    })

})

describe('TestEditRestaurantFail', function() {
    it('Test if editing restaurant will fail with no acceptable data', function() {

        cy.contains('Edit information').click()

        cy.get('input').eq(2).clear()
        cy.get('input').eq(2).type('ABCDEF 4321')
        cy.get('.normal').last().click()

        cy.contains('Location data cannot be calculated')

        cy.type({esc})
    })
})


describe('TestEditRestaurant', function() {
    it('Test if editing restaurant work', function() {


        cy.contains('Edit information').click()
        cy.get('input').eq(2).clear()
        cy.get('input').eq(2).type('Slavonska 10')
        cy.get('.normal').last().click()

        cy.contains('Slavonska 10')

        cy.wait(3000)
        cy.contains('Edit information').click()

        cy.get('input').eq(2).clear()
        cy.get('input').eq(2).type('Unska 4')
        cy.get('.normal').last().click()
    })
})
