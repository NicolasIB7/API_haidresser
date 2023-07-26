import { body } from "express-validator";

export const validatorRegister = [
  body("email", "Email format incorrect.").trim().isEmail().normalizeEmail(),
  body(
    "password",
    "Password must include: At least 8 characters long. At least one capital letter. At least one lowercase letter. At least one digit."
  )
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
  body("repassword", "password do not match").custom((value, { req }) => {
    return value === req.body.password;
  }),
  body("name", "This field must exists").exists(),
  body("name", "The name field cannot be empty").notEmpty(),
  body("lastname", "This field must exists").exists(),
  body("lastname", "The lastname field cannot be empty").notEmpty(),
  body("dni", "This field must exists").exists(),
  body("dni", "The dni field must have a correct length")
    .notEmpty()
    .isInt()
    .isLength({ min: 8, max: 8 }),
  body("date", "This field must exists").exists(),
  body("date", "The date field must have a correct format.").isDate(),
  body("phone", "This field must exists").exists(),
  body(
    "phone",
    "The cell phone number must have an argentinian format"
  ).matches(/^(\+?54)?9\d{10}$/),
  body("location", "This field must exists").exists(),
  body("location", "The location field cannot be empty").notEmpty(),
];

export const validatorLogin = [
  body("email", "Email format incorrect.").trim().isEmail().normalizeEmail(),
  body("password", "Password format incorrect.").trim().isLength({ min: 8 }),
];
