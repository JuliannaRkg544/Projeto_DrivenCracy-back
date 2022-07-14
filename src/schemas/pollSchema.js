import joi from "joi";

const regexDate = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}\ [0-9]{2}:[0-9]{2}$/;

export const pollnameSchema = joi.object({
  title: joi.string().min(4).required(),
});

export const pollexpireSchema = joi.object({
  expireAt: joi.string().pattern(regexDate),
});
