import express from "express"
import linkRouter from "../routes/link.routes.js";
import { redirectToLink } from "../controllers/link.controller.js";

const app = express();

app.use(express.json())

app.use("/api/url", linkRouter)
app.get("/:code", redirectToLink)

export default app;