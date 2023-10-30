describe('Form', () => {
  beforeEach(() => {
    cy.visit('/form')
  })
  it('Добавялем карточку', () => {
    cy.get('[data-testid=input-text]').type('sodapng')
    cy.get('[data-testid=input-date]').type('2023-04-14')
    cy.get('[data-testid=select]').select('United States')
    cy.get('[data-testid=input-checkbox]').click()
    cy.get('[data-testid=input-radio]').first().click()
    cy.get('[data-testid=input-file]').selectFile({
      fileName: 'image1.png',
      contents: ['Destruction_1'],
    })
    cy.get('[data-testid=form]').submit()
    cy.get('.Toastify__toast-body').click()
    cy.get('[data-testid=About]').click()
    cy.get('[data-testid=Form]').click()
  })
  it('Кликаем на Send без заполнения данных', () => {
    cy.get('[data-testid=form]').submit()
    cy.document()
      .should('include.text', 'Error: Required')
      .get('.text-red-700')
      .should('have.length', 6)
    cy.get('[data-testid=input-text]').type('1')
    cy.get('[data-testid=form]').submit()
    cy.document().should('include.text', 'Error: String must contain at least 5 character(s)')
  })
})
