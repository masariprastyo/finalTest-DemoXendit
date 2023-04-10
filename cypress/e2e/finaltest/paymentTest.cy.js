/// <reference types="cypress" />

describe('Payment useing Xendit demo', () => {

    beforeEach('Visit the website', () => {
      cy.visit('https://demo.xendit.co/')
      cy.get('.panel-configure__title').should('contain.text', 'Welcome to')
    });
    

    // Positive test OVO
    it('Make payment with OVO', () => {
        cy.get('#button-start-demo').click();
        cy.get('#xdt-checkout-ewallet').click();
        cy.get('#payment-channel-ovo').click();

        cy.get('input[type="tel"]').clear();
        cy.get('input[type="tel"]').type('08123456789');
        cy.get('#payNow').click();

        cy.wait(10000);

        cy.get('.body__title').should('contain.text', 'Thank you for trying our demo!');

        cy.get('.panel__link').click();
    });

    // Positive test DANA
    it('Make payment with DANA', () => {
        cy.get('#button-start-demo').click();
        cy.get('#xdt-checkout-ewallet').click();
        cy.get('#payment-channel-dana').click();
        cy.get('#proceed-button').click();

        cy.wait(10000);

        cy.get('.body__title').should('contain.text', 'Thank you for trying our demo!');

        cy.get('.panel__link').click();
    });
    
    // Positive test AKULAKU
    it('Make payment with AKULAKU', () => {
        cy.get('#button-start-demo').click();
        cy.get('#xdt-checkout-paylater').click();
        cy.get('.css-tlfecz-indicatorContainer').click();
        cy.get('#payment-provider-akulaku').click();

        cy.get('input[name="given_names"]').clear();
        cy.get('input[name="given_names"]').type('Masari');

        cy.get('input[name="surname"]').clear();
        cy.get('input[name="surname"]').type('Pras Tyo');

        cy.get('input[name="email"]').clear();
        cy.get('input[name="email"]').type('masari@email.com');

        cy.get('input[name="mobile_number"]').clear();
        cy.get('input[name="mobile_number"]').type('8123456789');

        cy.get('input[name="street_line1"]').clear();
        cy.get('input[name="street_line1"]').type('Jl.Perintis Kemerdekaan');

        cy.get('input[name="city"]').clear();
        cy.get('input[name="city"]').type('Pekalongan');

        cy.get('input[name="postal_code"]').clear();
        cy.get('input[name="postal_code"]').type('51117');

        cy.get('#continue').click();
        cy.get('#createCharge').click();
        cy.get('#proceed-button').click();

        cy.wait(20000);

        cy.get('.body__title').should('contain.text', 'Thank you for trying our demo!');

        cy.get('.panel__link').click();
    });

    // Negative test Credit / Debit Card
    it('Make payment with Credit / Debit Card', () => {
        cy.get('#button-start-demo').click();
        cy.get('#xdt-checkout-credit_card').click();

        cy.get('input[name="cardNumber"]').clear();
        cy.get('input[name="cardNumber"]').type('1234567812345678');

        cy.get('input[name="validThru"]').clear();
        cy.get('input[name="validThru"]').type('1224');

        cy.get('input[name="cvv"]').clear();
        cy.get('input[name="cvv"]').type('123');

        cy.get('#payNow').click();

        cy.get('p').should('contain.text', 'Card number is invalid');
    });

    // Negative test BRI Direct Debit
    it('Make payment with BRI Direct Debit', () => {
        cy.get('#button-start-demo').click();
        cy.get('#xdt-checkout-direct_debit').click();
        cy.get('.w-20 > svg > [d="M2 10.2842H10.7568C14.3064 10.2842 16.9519 11.9585 16.9519 15.4914C16.9519 18.0866 15.7296 19.5265 13.6032 20.28V20.347C16.1314 20.8995 17.4542 22.3729 17.4542 24.8677C17.4542 29.7735 13.4525 30.8116 10.0368 30.8116H2V10.2842ZM7.07325 18.4047H8.49644C10.154 18.4047 11.8786 17.9694 11.8786 16.2281C11.8786 14.3528 10.2378 14.1687 8.54667 14.1687H7.07325V18.4047ZM7.07325 26.9271H8.58016C10.4387 26.9271 12.3642 26.6257 12.3642 24.5496C12.3642 22.3059 10.3717 22.105 8.63039 22.105H7.07325V26.9271Z"]').click();

        cy.get('input[name="firstName"]').clear();
        cy.get('input[name="firstName"]').type('Masari');

        cy.get('input[name="lastName"]').clear();
        cy.get('input[name="lastName"]').type('Pras Tyo');
        
        cy.get('input[name="mobileNumber"]').clear();
        cy.get('input[name="mobileNumber"]').type('8123456789');

        cy.get('input[name="email"]').clear();
        cy.get('input[name="email"]').type('masari@email.com');

        cy.get('input[name="cardLastFour"]').clear();
        cy.get('input[name="cardLastFour"]').type('4321');

        cy.get('input[name="cardExpiry"]').clear();
        cy.get('input[name="cardExpiry"]').type('0625');

        cy.get('#payNow').click();

        cy.get('.modal-show > .my-6 > .border-0 > .py-4 > .font-sans').should('contain.text', 'Invalid Account Details');
        cy.get('.modal-show > .my-6 > .border-0 > .flex-auto > .font-sans').should('contain.text', 'The account details you have provided is invalid');

        cy.get('.modal-show > .my-6 > .border-0 > .p-6 > .btn > .flex').click();
    });

  })
