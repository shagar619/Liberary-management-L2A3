"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrowBook_controller_1 = require("./borrowBook.controller");
const borrowRoute = (0, express_1.Router)();
borrowRoute.post("/", borrowBook_controller_1.borrowController.borrowBook);
borrowRoute.get("/", borrowBook_controller_1.borrowController.getBorrowSummary);
exports.default = borrowRoute;
