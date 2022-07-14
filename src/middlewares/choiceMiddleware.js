import { choiceTitleSchema } from "../schemas/choiceSchema.js";

export function choiceValidation(req, res, next) {
  const { title, pollId } = req.body;
  const choiceTitleValidate = choiceTitleSchema.validate({ title });
  if (choiceTitleValidate.error) {
    console.log(
      "erro ao cadastrar nome da opção",
      choiceTitleValidate.error.details
    );
    return res.sendStatus(422);
  }
  next();
}
