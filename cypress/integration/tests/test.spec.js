describe('BooksList', () => {
  it('should render the header with title "Books List"', () => {
    cy.visit('http://localhost:8086/')
    cy.get('h1').should('have.text', 'Books List')
  })

  it('should render the "sort by" dropdown', () => {
    cy.visit('http://localhost:8080/')
    cy.get(':nth-child(1) > select').should('exist')
    cy.get(':nth-child(1) > select > option').should('have.length', 3)
  })

  it('should render the "order" dropdown', () => {
    cy.visit('http://localhost:8080/')
    cy.get(':nth-child(2) > select').should('exist')
    cy.get(':nth-child(2) > select > option').should('have.length', 2)
  })

  it('should render the table with book data', () => {
    cy.visit('http://localhost:8080/')
    cy.get('tbody > tr').should('have.length', 60)
  })

  it('should render the book data in sorted order by title by default', () => {
    cy.visit('http://localhost:8080/')
    cy.get('tbody > tr').eq(0).find('td').eq(0).should('exist')
  })
})