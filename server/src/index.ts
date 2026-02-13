import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import favoritesRoutes from "./routes/favorites";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true);

			if (origin.startsWith("http://localhost")) {
				return callback(null, true);
			}

			if (origin.endsWith(".vercel.app")) {
				return callback(null, true);
			}

			callback(new Error("Not allowed by CORS"));
		},
		credentials: true,
	}),
);

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is running!");
});

app.use("/auth", authRoutes);
app.use("/user/favorites", favoritesRoutes);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}/`);
});
