import { RequestHandler } from "express";
import user from "../models/user";
import bcrypt from "bcrypt";

const getUser: RequestHandler = async (req, res, next) => {
  try {
    const userdata = await user.find().exec(); //With this we get the data from the database
    res.status(200).json(userdata); // this catches the response from the await above as ok and then gives out the sensordata as json
  } catch (error) {
    //Error Handling Part 2
    next(error); // give the error over to the next route.
  }
};

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body; // get the username and password from the request body
    const hashedpass = await bcrypt.hash(password, 10); // hash the password with bcrypt
    console.log(hashedpass);
    const newUser = await user.create({ username, password: hashedpass }); // create a new user with the username and password
    res.status(201).json(newUser); // send the new user as json
    console.log(newUser.username), +"created";
    return newUser;
  } catch (error) {
    next(error);
  }
};

const editUser: RequestHandler = async (req, res, next) => {
  try {
        const { username, password, newpassword } = req.body;
        //check if username or password or both were provided
        if (!username || !password) 
          {
            res.status(400).json({ message: "Please provide username and password" });
            console.log("Please provide username and password");
            return;
          }
        const newUserData = await user.findOne({ username: username }).exec();
        console.log(newUserData?.username + " found");
        if (!newUserData?.password) 
          {
            console.log("User not found");
            return;
          }
        const isPasswordCorrect = await bcrypt.compare(password, newUserData.password);
        if (!isPasswordCorrect) 
          {
            res.status(401).json({ message: "Invalid password" });
            console.log("Invalid password");
            return;
          }
        console.log("Password correct");
        await newUserData.updateOne({password: await bcrypt.hash(newpassword, 10)});
        console.log(newUserData.password);
        res.status(200).json({ message: "Password changed" });
      } 
  catch (error) {
    next(error);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Please provide username and password" });
      console.log("Please provide username and password");
      return;
    }
    const newUserData = await user.findOne({ username: username }).exec();
    console.log(newUserData?.username + " found");
    if (!newUserData?.password) {
      console.log("User not found");
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, newUserData.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Invalid password" });
      console.log("Invalid password");
      return;
    }
    console.log("Password correct");
    await newUserData.deleteOne();
    res.status(200).json({ message: "User deleted" });
  }
  catch (error) {
    next(error);
  }
};

export { getUser, createUser, editUser,deleteUser };

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
