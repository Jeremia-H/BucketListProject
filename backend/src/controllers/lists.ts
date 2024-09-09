import { RequestHandler } from "express";                                                                                         //It doesnt matter what we call the import, it just imports what we sepcified in the sensordata.ts as export
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined"; //
import listModel from "../models/list";

export const getLists: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        const lists = await listModel.find({ userId: authenticatedUserId }).exec();
        res.json(lists);
    } catch (error) {
        next(error);
    }
};

export const getList: RequestHandler = async (req, res, next) => {
    const listID = req.params.listID;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(listID)) {
            throw createHttpError(400, "Invalid list ID");
        }

        const list = await listModel.findById(listID).exec();
        if (!list) {
            throw createHttpError(404, "List not found");
        }

        if (!list.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this list");
        }

        res.json(list);
    } catch (error) {
        next(error);
    }
};

interface CreateListBody {
    title?: string;
    notes?: string;
    budget?: number;
    country?: string;
    city?: string;
    activity?: string;
    actbudget?: number;
    category?: string;
    date?: Date;
}

export const createList: RequestHandler<unknown, unknown, CreateListBody, unknown> = async (
    req,
    res,
    next
) => {
    const title = req.body.title;
    const notes = req.body.notes;
    const authenticatedUserId = req.session.userId;
    const budget = req.body.budget;
    const country = req.body.country;
    const city = req.body.city;
    const activity = req.body.activity;
    const actbudget = req.body.actbudget;
    const category = req.body.category;
    const date = req.body.date;
    try {
        assertIsDefined(authenticatedUserId);
        if (!title) {
            console.log(req.body);
            throw createHttpError(400, "List must have a titel create");
        }

        const newList = new listModel({
            userId: authenticatedUserId,
            title,
            notes,
            budget,
            country,
            city,
            activity,
            actbudget,
            category,
            date,
        });
const savedList = await newList.save();
        res.status(201).json(savedList);
    } catch (error) {
        next(error);
    }
};

interface UpdateListParams {
    listdataID: string;
}

interface UpdateListBody {
    title?: string;
    notes?: string;
    budget?: number;
    country?: string;
    city?: string;
    activity?: string;
    actbudget?: number;
    category?: string;
    date?: Date;
}

export const updateList: RequestHandler<UpdateListParams, unknown, UpdateListBody, unknown> = async (
    req,
    res,
    next
) => {
    const listID = req.params.listdataID;
    const newTitle = req.body.title;
    const newNotes = req.body.notes;
    const newBudget = req.body.budget;
    const newCountry = req.body.country;
    const newCity = req.body.city;
    const newActivity = req.body.activity;
    const newActbudget = req.body.actbudget;
    const newCategory = req.body.category;
    const newDate = req.body.date;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(listID)) {
            throw createHttpError(400, "Invalid list ID");
        }
        if (!newTitle) {
            throw createHttpError(400, "List must have a titel");
        }
        const list = await listModel.findById(listID).exec();
        if (!list) {
            throw createHttpError(404, "List not found");
        }

        if (!list.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this list");
        }


        list.title = newTitle;
        list.notes = newNotes;
        list.budget = newBudget;
        list.country = newCountry;
        list.city = newCity;
        list.activity = newActivity;
        list.actbudget = newActbudget;
        list.category = newCategory;
        list.date = newDate;

        const updatedList = await list.save();

        res.status(200).json(updatedList);
    } catch (error) {
        next(error);
    }
};

export const deleteList: RequestHandler = async (req, res, next) => {
    const listID = req.params.listID;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(listID)) {
            throw createHttpError(400, "Invalid list ID");
        }

        const list = await listModel.findById(listID).exec();
        if (!list) {
            throw createHttpError(404, "List not found");
        }

        if (!list.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this list");
        }

        await list.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};