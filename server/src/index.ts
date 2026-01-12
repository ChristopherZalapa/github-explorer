import express, { Request, Response } from "express";

const server = express();
const PORT: number = 3000;

server.get("/", (req: Request, res: Response) => {
	res.send("Hello from the server side!");
});

server.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}/`);
});
