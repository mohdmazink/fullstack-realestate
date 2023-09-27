import { prisma } from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user...");

  let { email } = req.body;
  const userExist = await prisma.user.findUnique({ where: { email: email } });
  if (!userExist) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registred succesfully!",
      user: user,
    });
  } else res.status(201).send({ message: "User already registred" });
});
