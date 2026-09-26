import express from "express"
import linkRouter from "../routes/link.routes.js";
import { redirectToLink } from "../controllers/link.controller.js";
import cors from "cors"
const app = express();

app.use(express.json())

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST','DELETE']
}

app.use(cors(corsOptions))
app.use("/api/url", linkRouter)
app.get("/:code", redirectToLink)

export default app;