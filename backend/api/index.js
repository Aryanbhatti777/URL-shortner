import app from "../src/app/app";
import { connectDB } from "../src/config/db.config";

await connectDB();

export default app;