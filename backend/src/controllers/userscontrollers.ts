import { RequestHandler } from "express";
import user from "../models/user";


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
      const newUser = await user.create({ username, password }); // create a new user with the username and password
      res.status(201).json(newUser); // send the new user as json
      return newUser;
  } catch (error) {
      next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params; // get the user id from the request parameters
    const deletedUser = await user.findByIdAndDelete(id); // find and delete the user by id
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" }); // if user is not found, return 404 status code
    }
    res.status(200).json({ message: "User deleted successfully" }); // send success message as json
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params; // get the user id from the request parameters
    const { username, password } = req.body; // get the updated username and password from the request body
    const updatedUser = await user.findByIdAndUpdate(id, { username, password }, { new: true }); // find and update the user by id
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" }); // if user is not found, return 404 status code
    }
    res.status(200).json(updatedUser); // send the updated user as json
  } catch (error) {
    next(error);
  }
};