import Joi from 'joi';

// Schéma pour validation POST (tous les champs sont requis)
const postSchema = Joi.object({
  nom: Joi.string().required().min(5),
  typeCuisine: Joi.string().required()
});

// Schéma pour validation PUT (champs facultatifs mais validés s'ils sont présents)
const putSchema = Joi.object({
    nom: Joi.optional(),
  typeCuisine: Joi.optional()
});

export const validateDelivery = (req, res, next) => {
  let schema;

  if (req.method === 'POST') {
    schema = postSchema;
  } else if (req.method === 'PUT') {
    schema = putSchema;
  }

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};
