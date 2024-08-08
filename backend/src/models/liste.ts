import { InferSchemaType, Schema, model } from "mongoose"; 

const listeSchema = new Schema({
    besucht: { type: String, required: false },
    budget:  { type: String, required: false },
    Datum: { type: String, required: false },
    Titel: { type: String, required: true },
    Freitext: { type: String, required: false },
    Ort: { type: String, required: false },
    Kategorie: { type: String, required: false },
    Prioritaet: { type: String, required: false },


});

type liste = InferSchemaType<typeof listeSchema>; // type for the model

/**
 * besucht : String, 
    budget : String
    Datum : String,
    Titel : tring, 
    Freitext : String,
    Ort : String, 
    Kategorie : String
    Prioritaet : String
 */
export default model<liste>("liste", listeSchema)
