Cypress.Commands.add("validarContrato", (contrato, responseRetornado) => {
    return contrato.validateAsync(responseRetornado)
})