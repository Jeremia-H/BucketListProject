import express from "express";
import * as UserData from "../controllers/userscontrollers";

const router = express.Router(); //create a router object
router.get("/users", UserData.getUser);
router.post("/users", UserData.createUser);
router.patch("/users", UserData.editUser);
router.delete("/users", UserData.deleteUser);

export default router;

