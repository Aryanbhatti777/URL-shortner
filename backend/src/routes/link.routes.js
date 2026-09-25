import Router from "express"
import { generateLink, getlAllLinks } from "../controllers/link.controller.js";

const linkRouter = Router();

linkRouter.post("/create", generateLink);
linkRouter.get("/allLinks", getlAllLinks)
export default linkRouter;