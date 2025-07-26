import { Router } from "express";
import { borrowController } from "./borrowBook.controller";


const borrowRoute = Router();

borrowRoute.post("/", borrowController.borrowBook);
borrowRoute.get("/", borrowController.getBorrowSummary);


export default borrowRoute;