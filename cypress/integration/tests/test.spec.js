describe('Book Sorting App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8084');
  });

  it('should display the book list', () => {
    cy.get('h1').should('contain.text', 'Book List');
    cy.get('table').should('exist');
    cy.get('tbody tr').should('have.length.greaterThan', 0);
  });

  it('should have sorting dropdowns', () => {
    cy.get('select').eq(0).should('exist');
    cy.get('select').eq(1).should('exist');
    
    // Check sort by options
    cy.get('select').eq(0).find('option').should('have.length', 3);
    cy.get('select').eq(0).find('option').eq(0).should('have.value', 'title');
    cy.get('select').eq(0).find('option').eq(1).should('have.value', 'author');
    cy.get('select').eq(0).find('option').eq(2).should('have.value', 'publisher');
    
    // Check sort order options
    cy.get('select').eq(1).find('option').should('have.length', 2);
    cy.get('select').eq(1).find('option').eq(0).should('have.value', 'asc');
    cy.get('select').eq(1).find('option').eq(1).should('have.value', 'desc');
  });

  it('should sort books by title', () => {
    // Select title sorting
    cy.get('select').eq(0).select('title');
    
    // Get all titles and check they are sorted
    cy.get('tbody tr td:nth-child(1)').then(($titles) => {
      const titles = $titles.map((i, el) => Cypress.$(el).text()).get();
      const sortedTitles = [...titles].sort();
      
      expect(titles).to.deep.equal(sortedTitles);
    });
  });

  it('should sort books by author', () => {
    // Select author sorting
    cy.get('select').eq(0).select('author');
    
    // Get all authors and check they are sorted
    cy.get('tbody tr td:nth-child(2)').then(($authors) => {
      const authors = $authors.map((i, el) => Cypress.$(el).text()).get();
      const sortedAuthors = [...authors].sort();
      
      expect(authors).to.deep.equal(sortedAuthors);
    });
  });

  it('should sort books by publisher', () => {
    // Select publisher sorting
    cy.get('select').eq(0).select('publisher');
    
    // Get all publishers and check they are sorted
    cy.get('tbody tr td:nth-child(3)').then(($publishers) => {
      const publishers = $publishers.map((i, el) => Cypress.$(el).text()).get();
      const sortedPublishers = [...publishers].sort();
      
      expect(publishers).to.deep.equal(sortedPublishers);
    });
  });

  it('should sort books in descending order', () => {
    // Select title sorting and descending order
    cy.get('select').eq(0).select('title');
    cy.get('select').eq(1).select('desc');
    
    // Get all titles and check they are sorted in descending order
    cy.get('tbody tr td:nth-child(1)').then(($titles) => {
      const titles = $titles.map((i, el) => Cypress.$(el).text()).get();
      const sortedTitles = [...titles].sort().reverse();
      
      expect(titles).to.deep.equal(sortedTitles);
    });
  });
});