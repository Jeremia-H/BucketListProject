import { InferSchemaType, Schema, model } from "mongoose"; // imports the mongoose functions we need 

const listSchema = new Schema({ // create new schema 
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true }, // updated field name
    country: { type: String }, // updated field name
    city: { type: String }, // updated field name
    activity: { type: String }, // updated field name
    category: { type: String }, // updated field name
    budget: { type: Number }, // updated field name
    actbudget: { type: Number }, // updated field name
    date: { type: Date }, // updated field name
    notes: { type: String }, // updated field name
}, { timestamps: true }); // timestamps outside because mongoose will do this field automatically with this

type ListData = InferSchemaType<typeof listSchema>; // Create a type ListData and say to use the listSchema for it. 

export default model<ListData>("ListData", listSchema); // just like in app.ts we export this now so we can use it somewhere else