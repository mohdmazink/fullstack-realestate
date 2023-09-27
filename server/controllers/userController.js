import { json } from "express";
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

// function to book a visit to residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookVisits: true },
    });

    if (alreadyBooked.bookVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookVisits: { push: { id, date } },
        },
      });
      res.send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all bokings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookVisits: true },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err);
  }
});
