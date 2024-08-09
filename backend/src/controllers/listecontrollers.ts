import { RequestHandler } from "express";
import liste from "../models/liste";

const getliste: RequestHandler = async (req, res, next) => {
  try {
    const listeData = await liste.find().exec();
    res.status(200).json({ listeData });
  } catch (error) {
    next(error);
  }
};


const createliste: RequestHandler = async (req, res, next) => {
  try {
    const { besucht, budget, Datum, Titel, Freitext, Ort, Kategorie, Prioritaet } = req.body;
    const newliste = new liste({
      besucht,
      budget,
      Datum,
      Titel,
      Freitext,
      Ort,
      Kategorie,
      Prioritaet,
    });
    const listeData = await newliste.save();
    res.status(201).json({ listeData });
  } catch (error) {
    next(error);
  }
};

const editliste: RequestHandler = async (req, res, next) => {
  try {
    const { besucht, budget, Datum, Titel, Freitext, Ort, Kategorie, Prioritaet } = req.body;
    if (!Titel) {
      res.status(400).json({ message: "Please provide a title" });
      console.log("Please provide a title");
      return;
    }
    const newlisteData = await liste
        .findOne({ Titel: Titel })
        .exec();
    console.log(newlisteData?.Titel + " found");
    if (!newlisteData) {
      console.log("List not found");
      return;
    }
    await newlisteData.updateOne({ besucht, budget, Datum, Titel, Freitext, Ort, Kategorie, Prioritaet });
    res.status(200).json({ message: "List updated" });
    } catch (error) {
    next(error);
    }
}

const deleteliste: RequestHandler = async (req, res, next) => {
  try {
    const { Titel } = req.body;
    if (!Titel) {
      res.status(400).json({ message: "Please provide a title" });
      console.log("Please provide a title");
      return;
    }
    const newlisteData = await liste
        .findOne({ Titel: Titel })
        .exec();
    console.log(newlisteData?.Titel + " found");
    if (!newlisteData) {
      console.log("List not found");
      return;
    }
    await newlisteData.deleteOne();
    res.status(200).json({ message: "List deleted" });
    } catch (error) {
    next(error);
    }
}

export { getliste, createliste, editliste, deleteliste };
