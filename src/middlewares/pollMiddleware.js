import { pollnameSchema, pollexpireSchema } from "../schemas/pollSchema.js";

export function pollValidation(req, res, next) {
  const { title, expireAt } = req.body;

  const validatePollName = pollnameSchema.validate({ title });

  if (validatePollName.error) {
    console.log("error to validate name", validatePollName.error.details);
    res.sendStatus(422);
    return;
  }
  const validateExpireAt = pollexpireSchema.validate({ expireAt });
  if (validateExpireAt.error) {
    console.log("error to validate expireAt", validateExpireAt.error.details);
    res.sendStatus(422);
    return;
  }

  next();
}
