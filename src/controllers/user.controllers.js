const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.models");

const router = express.Router();

router.post(
  "/",
  // body('username').isEmail(),
  body("first_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("First Name cannot be empty"),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("pincode")
    .not()
    .isEmpty()
    .withMessage("pincode cannot be empty")
    .isNumeric()
    
    .withMessage("pincode must be exactly 6 digit number")
    .custom((value) => {
      value=value.toString()
      if (value.length != 6) {
        throw new Error("Incorrect pincode");
      }
      return true;
    }),
    body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be in between 1 to 100")
    .custom((value)=>{
      if(value < 1 || value > 100){
        throw new Error("Incorrect age");
      }
      return  true
    }),

 
  async (req, res) => {
    try {
     // console.log(body("first_name"));
      const errors = validationResult(req);
     // console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

module.exports = router;

