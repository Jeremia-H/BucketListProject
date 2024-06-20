import { RequestHandler } from "express";
import user from "../models/user";
import bcrypt from "bcrypt"

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const userdata = await user.find().exec(); //With this we get the data from the database
    res.status(200).json(userdata); // this catches the response from the await above as ok and then gives out the sensordata as json
  } catch (error) {
    //Error Handling Part 2
    next(error); // give the error over to the next route.
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body; // get the username and password from the request body
    const hashedpass = await bcrypt.hash(password, 10); // hash the password with bcrypt
    console.log(hashedpass)
      const newUser = await user.create({ username,password: hashedpass }); // create a new user with the username and password
      res.status(201).json(newUser); // send the new user as json
      console.log(newUser.username), + "created";
      return newUser;
  } catch (error) {

      next(error);
  }
};

/**
 * Explain in Documentation:
 * 1. Get User Funktion
 * 2. Create User Funktion
 * 3. Password hashing mit bcrypt
 * 4. async await
 * 5. Error Handling
 * 6. Request Handler
 * 7. mongoose find() und create()
 */