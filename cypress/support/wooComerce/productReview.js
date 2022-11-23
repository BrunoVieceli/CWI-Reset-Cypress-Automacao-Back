/// <reference types="cypress"/>

import token from '../../fixtures/token.json'

Cypress.Commands.add('getProductReviewsWooComerce', () => {
    cy.request({
        method: "GET",
        url: Cypress.config('baseUrl') + '/products/reviews',
        headers: {
            Authorization: token.token,
        },
    })
})

Cypress.Commands.add('postProductReviewsWooComerce', (productId, review, reviewer, reviewerEmail, rating) => {
    cy.request({
        method: "POST",
        url: Cypress.config('baseUrl') + '/products/reviews',
        headers: {
            Authorization: token.token,
            ContentType: "application/json"
        },
        body: {
            "product_id": productId,
            "review": review,
            "reviewer": reviewer,
            "reviewer_email": reviewerEmail,
            "rating": rating
        }
    })
})

Cypress.Commands.add('putProductReviewsWooComerce', (id, productId, review, reviewer, reviewerEmail, rating) => {
    cy.request({
        method: "PUT",
        url: Cypress.config('baseUrl') + `/products/reviews/${id}`,
        headers: {
            Authorization: token.token,
            ContentType: "application/json"
        },
        body: {
            "product_id": productId,
            "review": review,
            "reviewer": reviewer,
            "reviewer_email": reviewerEmail,
            "rating": rating
        }
    })
})

Cypress.Commands.add('deleteProductReviewsWooComerce', (id, force) => {
    cy.request({
        method: "DELETE",
        url: Cypress.config('baseUrl') + `/products/reviews/${id}?force=${force}`,
        headers: {
            Authorization: token.token,
        }
    })
})
