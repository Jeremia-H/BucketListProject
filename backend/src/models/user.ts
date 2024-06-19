import { InferSchemaType, Schema, model } from "mongoose"; 

const userSchema = new Schema({
    username: { type: String, required: true },
    password:  { type: String, required: true },
});

type user= InferSchemaType<typeof userSchema>; // type for the model

/**
 * user model with fields username and password
 */
export default model<user>("user", userSchema)
