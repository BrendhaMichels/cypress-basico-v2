/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    }) 
    it('verifica o título da aplicação', function() {       
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })


  it('preenche os campos obrigatorios e envia o formulario', function(){
    const longText = 'teste, teste, teste, teste'
    cy.get('#firstName').type('Brendha')
    cy.get('#lastName').type('Ramos')
    cy.get('#email').type('brendha.ramos@getconnect.com.br')
    cy.get('#open-text-area').type(longText, {  delay:0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulario com um email com formatacao', function(){
    const longText = 'teste, teste, teste, teste'
    cy.get('#firstName').type('Brendha')
    cy.get('#lastName').type('Ramos')
    cy.get('#email').type('brendha.ramos@getconnect,com.br')
    cy.get('#open-text-area').type(longText, {  delay:0 })
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
  
  it('campo telefone continua vazio quando preenchido com valor nao-numerico', function(){
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas nao e preenchido', function(){
    cy.get('#firstName').type('Brendha')
    cy.get('#lastName').type('Ramos')
    cy.get('#email').type('brendha.ramos@getconnect.com.br')
    cy.get('#phone-checkbox').type('Ramos')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it.only('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
      .type('Brendha')
      .should('have.value', 'Brendha')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Ramos')
      .should('have.value', 'Ramos')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('brendha.ramos@getconnect.com.br')
      .should('have.value', 'brendha.ramos@getconnect.com.br')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('99999999')
      .should('have.value', '99999999')
      .clear()
      .should('have.value', '')    
    
  })


 

})