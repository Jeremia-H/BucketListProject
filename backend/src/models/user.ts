import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true, select: false}
});

export default model <User>("User", userSchema);
type User = InferSchemaType<typeof userSchema>;
