// const Joi = require("joi");
// const review = require("./models/review");
// module.exports.listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     location: Joi.string().required(),
//     country: Joi.string().required(),
//     price: Joi.number().required().min(0),
//     // image: Joi.string().allow("", null),
//   }).required(),
// });

// console.log("SCHEMA FILE LOADED");


// module.exports.reviewSchema = Joi.object({
//   review: Joi.object({
//     name: Joi.string().required(),
//     rating: Joi.number().required().min(1).max(5),
//     comment: Joi.string().required(),
//   }).required(),
// });

const Joi = require("joi");

console.log("SCHEMA FILE LOADED");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0)
  })
  .unknown(true)   
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    name: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
