import express, { Request, Response } from "express";
import { body } from "express-validator";

import { validateRequest } from "../middlewares/validate-requests";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be from 4 to 12 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }
    const newUser = User.build({ email, password });
    await newUser.save();

    //GENERATE JWT
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: token };
    res.status(201).send(newUser);
  }
);

export { router as signupRouter };
