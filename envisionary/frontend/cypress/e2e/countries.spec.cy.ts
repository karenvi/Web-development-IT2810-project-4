/**
 * Test first goes to page 2, checking the paging functionality, then opens Austria and checks that the information is correct.
 * Next, it checks if the review by Willy exists, then goes back and searches for Taiwan. This tests the search functionality
 * because Taiwan is otherwise only accessible by going to another page. 
 * Then it clicks the dropdown menu and selects continent, and types 'America*. After, it looks for Argentina, confirming that
 * searching on continent works.
 */

export {};
describe('Testing countries page', () => {
  it('Goes to page 2 and opens Austria', () => {
    cy.visit('http://localhost:3000')
    cy.get('button').contains("Next").scrollIntoView().click()
    cy.contains("Austria").click()
  })

  it('Austria contains correct information', () => {
    cy.get('h1' ).contains('Austria')
    cy.wait(300)
    cy.get('span').contains('Population rank: 99')
    cy.get('span').contains('Country code: AUT')
    cy.get('span').contains('Capital: Vienna')
    cy.get('span').contains('Continent: Europe')
    cy.get('span').contains('Density: 106.5877 per km²')
    cy.get('span').contains('GDP growth rate: 1.002')
    cy.get('span').contains('Percentage of world population: 0.11%')

  })

  it('Austria has review by Willy', () => {
    cy.contains('Reviews').click()
    cy.contains('Willy')
    cy.get('p').contains('HELT TIPPTOPP Å VÆRE I ØSTERRIKE MED MINE GODE VENNER :-) ØNSKER DERE ALLE EN RIKTIG GOD HELG VIDERE.')
  })

  it('Go back and search for Taiwan', () => {
    cy.go('back')
    cy.get('#header-search').type('taiwan').should('have.value', 'taiwan')
    cy.get('tbody').contains('Taiwan').click()
  })

  it('Go back and search on category America and find Argentina', () => {
    cy.go('back')
    cy.get('#demo-simple-select').click()
    cy.get('li').contains('Continent').click()
    cy.get('#header-search').clear().type('America').should('have.value', 'America')
    cy.contains('Argentina')
    cy.contains('Afghanistan').should('not.exist')
  })

  it('Search for nonsense, should yield no results', () => {
    cy.get('#demo-simple-select').click()
    cy.get('li').contains('Country').click()
    cy.get('#header-search').clear().type('Bakvendtland').should('have.value', 'Bakvendtland')
    cy.get('tbody').children().should('contain.html', 'Sorry, no results matched your search')
  })

  it('Sort for descending country and check for correct countries', () => {
    cy.get('#header-search').clear()
    cy.get('#filter-category').click()
    cy.get('li').contains('Descending country').click()
    cy.get('tbody > tr').should('have.length', 11)
    cy.contains('Zimbabwe')
    cy.contains('Zambia')
    cy.contains('Wallis and Futuna')
    cy.contains('Vatican City')
    cy.contains('Afghanistan').should('not.exist')
    cy.contains('Algeria').should('not.exist')
    cy.contains('Angola').should('not.exist')
  })

})

