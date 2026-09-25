import Router from "express"
import { deleteLink, generateLink, getAllLinks } from "../controllers/link.controller.js";

const linkRouter = Router();

linkRouter.post("/create", generateLink);
linkRouter.get("/allLinks", getAllLinks);
linkRouter.delete("/delete/:id", deleteLink)
export default linkRouter;