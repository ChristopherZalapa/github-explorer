import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Get Authorization Header
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({ error: "No token provided" });
		}

		const token = authHeader.split(" ")[1];

		if (!token) {
			return res.status(401).json({
				error: "Invalid token format",
			});
		}

		// Verify Token
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			userId: string;
		};

		req.userId = decoded.userId;

		next();
	} catch (error) {
		res.status(401).json({ error: "Invalid or expired token" });
	}
};
