import joi from "joi";

export const choiceTitleSchema = joi.object({
  title: joi.string().required(),
});
