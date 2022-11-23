/// <reference types="cypress"/>

import statusFixture from '../../fixtures/status.json'
import productReviewSchema from '../../contratos/productReview.contract'
import productReviewDeleteSchema from '../../contratos/productReviewDelete.contract'
import { faker } from '@faker-js/faker'

const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const productId = 22
const review = faker.lorem.words(5)
const reviewer = firstName + ' ' + lastName
const reviewerEmail = faker.internet.email(firstName, lastName)
const rating = faker.datatype.number({ min: 1, max: 5 })

describe('Product Review', () => {
    it('Listar todas as product reviews - Aceitação e Contrato', () => {
        cy.getProductReviewsWooComerce().should((getProductReviewResponse) => {
            expect(getProductReviewResponse.status).to.be.eq(statusFixture.ok)
            expect(getProductReviewResponse.body).to.have.length.greaterThan(0)
            for (let i = 0; i < getProductReviewResponse.body.length; i++) {
                cy.validarContrato(productReviewSchema, getProductReviewResponse.body[i])
            }
        })
    })

    it('Cadastro de product review - Aceitação e Contrato', () => {
        cy.postProductReviewsWooComerce(productId, review, reviewer, reviewerEmail, rating).should((postProductReviewResponse) => {
            expect(postProductReviewResponse.status).to.be.eq(statusFixture.created)
            expect(postProductReviewResponse.body.product_id).to.be.eq(productId)
            expect(postProductReviewResponse.body.review).to.be.eq(review)
            expect(postProductReviewResponse.body.reviewer).to.be.eq(reviewer)
            expect(postProductReviewResponse.body.reviewer_email).to.be.eq(reviewerEmail)
            expect(postProductReviewResponse.body.rating).to.be.eq(rating)
            cy.validarContrato(productReviewSchema, postProductReviewResponse.body)
            cy.deleteProductReviewsWooComerce(postProductReviewResponse.body.id, true)
        })
    })

    it('Alteração de product review - Aceitação e Contrato', () => {
        cy.postProductReviewsWooComerce(productId, review, reviewer, reviewerEmail, rating).should((postProductReviewResponse) => {
            const newFirstName = faker.name.firstName()
            const newLastName = faker.name.lastName()
            const newProductId = 22
            const newReview = faker.lorem.words(5)
            const newReviewer = newFirstName + ' ' + newLastName
            const newReviewerEmail = faker.internet.email(newFirstName, newLastName)
            const newRating = faker.datatype.number({ min: 1, max: 5 })
            cy.putProductReviewsWooComerce(postProductReviewResponse.body.id, newProductId, newReview, newReviewer, newReviewerEmail, newRating).should((putProductReviewResponse) => {
                expect(putProductReviewResponse.status).to.be.eq(statusFixture.ok)
                expect(putProductReviewResponse.body.product_id).to.be.eq(newProductId)
                expect(putProductReviewResponse.body.review).to.be.eq(newReview)
                expect(putProductReviewResponse.body.reviewer).to.be.eq(newReviewer)
                expect(putProductReviewResponse.body.reviewer_email).to.be.eq(newReviewerEmail)
                expect(putProductReviewResponse.body.rating).to.be.eq(newRating)
                cy.validarContrato(productReviewSchema, putProductReviewResponse.body)
                cy.deleteProductReviewsWooComerce(putProductReviewResponse.body.id, true)
            })
        })
    })

    it('Exclusão de product review - Aceitação e Contrato', () => {
        cy.postProductReviewsWooComerce(productId, review, reviewer, reviewerEmail, rating).should((postProductReviewResponse) => {
            cy.deleteProductReviewsWooComerce(postProductReviewResponse.body.id, true).should((deleteProductReviewResponse) => {
                expect(deleteProductReviewResponse.status).to.be.eq(statusFixture.ok)
                expect(deleteProductReviewResponse.body.deleted).to.be.eq(true)
                expect(deleteProductReviewResponse.body.previous.product_id).to.be.eq(productId)
                expect(deleteProductReviewResponse.body.previous.review).to.be.eq(review)
                expect(deleteProductReviewResponse.body.previous.reviewer).to.be.eq(reviewer)
                expect(deleteProductReviewResponse.body.previous.reviewer_email).to.be.eq(reviewerEmail)
                expect(deleteProductReviewResponse.body.previous.rating).to.be.eq(rating)
                cy.validarContrato(productReviewDeleteSchema, deleteProductReviewResponse.body)
            })
        })
    })
})