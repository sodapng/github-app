describe('Main', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('При первом рендере 20 карточек', () => {
    cy.get('[data-testid="card_main"]').should('have.length', 20)
  })
  it('Загрузка отедльной карточки, закрытие модального окна', () => {
    cy.get('[data-testid="Alan Rails"]').click()
    cy.document().should('include.text', `Worldender's lair`)
    cy.get('[data-testid=modal-close]').click()
    cy.get('[data-testid=search]').type('annie{enter}')
    cy.get('[data-testid="Annie"]').click()
    cy.document().should('include.text', 'Anatomy Park')
    cy.get('[data-testid=modal-close]').click()
    cy.get('[data-testid=About]').click()
    cy.get('[data-testid=Home]').click()
    cy.get('[data-testid=search]').type('anniepppp{enter}')
    cy.document().should('include.text', 'There is nothing here')
    cy.get('.Toastify__toast-body > div:nth-child(2)').click()
  })
})
