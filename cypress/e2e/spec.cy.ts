describe('Навигация', () => {
  it('Правильная работа навигации', () => {
    cy.visit('/')
    cy.wait(10000)
    cy.get('[data-testid="About"]').click()
    cy.document().should('include.text', 'Lorem ipsum dolor sit amet')
    cy.url().should('include', '/about')
    cy.get('[data-testid="Form"]').click()
    cy.url().should('include', '/form')
  })
  it('Рендер 404 страницы', () => {
    cy.visit('/qwerty')
    cy.url().should('include', '/qwerty')
    cy.document().should('include.text', 'Sorry, an unexpected error has occurred.')
  })
  it('Проверяем current page', () => {
    cy.visit('/about')
    cy.contains('Current page:').should('include.text', '/about')
  })
})
