import { Router } from "express";
import bookRoute from "../book/book.route";
import borrowRoute from "../borrowBook/borrowBook.route";


const routes = Router();

routes.use("/book", bookRoute);
routes.use("/borrow", borrowRoute);

export default routes;