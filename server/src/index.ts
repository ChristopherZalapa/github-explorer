import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth";
import favoritesRoutes from "./routes/favorites";

const app = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user/favorites", favoritesRoutes);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello from the app side!");
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}/`);
});
