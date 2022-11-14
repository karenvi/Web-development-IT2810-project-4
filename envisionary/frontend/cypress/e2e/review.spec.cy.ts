/**
 * Test first tries to submit without entering anything and expects error message
 * for name. It then tries after entering review text onlye. At last, tries with all the required 
 * information, chosing random rating, name and review content.
 */

export {};

const countries: string[] = ['Saint Vincent and the Grenadines', 'Timor-Leste', 'Djibouti', 'Sao Tome and Principe', 'Sierra Leone'];
const names: string[] = ['Bombibjørn123', 'SuperOlivia', 'Bernt med barten', 'Salmonellamannen', 'PowerPuffGirl627'];
const reviewContents: string[] = [
    'En meget god tur for meg og familien',
    'Helt alreit, ønsket litt mer fart og spenning',
    'Er jo akkurat som hjemme, kunne like godt ikke dratt',
    'Å gurimalla altså, for et land! Må ta med meg vennene mine fra syklubben neste gang!',
    'Jeg er kanskje fem-og-nitti, men etter å ha besøkt dette landet føler jeg meg som fire-og-før!'
];

describe('Testing give review page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')

        // Search for random country
        const country: string = countries[Math.floor(Math.random() * countries.length)];
        cy.get('#header-search').type(country).should('have.value', country)
        cy.get('tbody').contains(country).click()
        cy.get('button').contains('Review').click()
    })

    it('Submit without entering anything', () => {
        // Error messages 'Name is required' should appear after clicking submit
        cy.get('button').contains('Submit').click()
        cy.get('#name-field-helper-text').should('contain.html', 'Name is required')
    })

    it('Submit after typing reviewtext only', () => {
        cy.get('#review-content-field').click().type('Lukter vondt, ikke for de med sensitivt lukteapparat >:( ')

        // Error message should be 'Name is required' after clicking submit
        cy.get('button').contains('Submit').click()
        cy.get('#name-field-helper-text').should('contain.html', 'Name is required')
    })

    it('Submit after entering/chosing required info', () => {
        
        // Pick random name and review content
        const name: string = names[Math.floor(Math.random() * names.length)];
        const reviewContent: string = reviewContents[Math.floor(Math.random() * reviewContents.length)];
        cy.get('#name-field').click().type(name).should('have.value', name);
        cy.get('#review-content-field').click().type(reviewContent).should('have.value', reviewContent);

        // Give random rating
        const rating: number = Math.random() * 135;
        cy.get('#rating-stars').click(rating, 0);
        
        // Submit
        cy.get('button').contains('Submit').click();
        //cy.contains('Countries').click()

        // Confirm review exists and is correct
        cy.contains(name)
        cy.get('p').contains(reviewContent);
    })
})