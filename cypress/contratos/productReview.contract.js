import Joi from "joi";

const productReviewSchema = Joi.object({
    id: Joi.number().required(),
    date_created: Joi.date().required(),
    date_created_gmt: Joi.date().required(),
    product_id: Joi.number().required(),
    status: Joi.string().required(),
    reviewer: Joi.string().required(),
    reviewer_email: Joi.string().required(),
    review: Joi.string().required(),
    rating: Joi.number().required(),
    verified: Joi.bool().required(),
    reviewer_avatar_urls: Joi.object({
        24: Joi.string().required(),
        48: Joi.string().required(),
        96: Joi.string().required()
    }).required(),
    _links: Joi.object({
        self: Joi.array().required().items(
            Joi.object({
                href: Joi.string().required()
            }).required()
        ),
        collection: Joi.array().required().items(
            Joi.object({
                href: Joi.string().required()
            }).required()
        ),
        up: Joi.array().required().items(
            Joi.object({
                href: Joi.string().required()
            }).required()
        ),
        reviewer: Joi.array().items(
            Joi.object({
                embeddable: Joi.bool().required(),
                href: Joi.string().required()
            })
        )
    }).required(),
    // as propriedades abaixo nao estavam inclusas na documentacao
    product_name: Joi.string().required(),
    product_permalink: Joi.string().required(),
})

export default productReviewSchema