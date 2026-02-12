import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required" });
	}
	try {
		// Check if user exists
		const { data: existingUser } = await supabase
			.from("users")
			.select("*")
			.eq("email", email)
			.maybeSingle();

		if (existingUser) {
			return res.status(409).json({ error: "Email already exists" });
		}

		//Hash Password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Insert User
		const { data: newUser, error } = await supabase
			.from("users")
			.insert({
				email,
				password: hashedPassword,
			})
			.select()
			.single();

		if (error) {
			throw error;
		}

		res.status(201).json({
			message: "User register successfully",
			userId: newUser.id,
		});
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

router.post("/login", async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			error: "Email and password are required",
		});
	}

	try {
		// Find User
		const { data: existingUser, error } = await supabase
			.from("users")
			.select("*")
			.eq("email", email)
			.single();

		if (error || !existingUser) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			existingUser.password,
		);

		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// Gernerate JWT
		const token = jwt.sign(
			{ userId: existingUser.id },
			process.env.JWT_SECRET!,
			{ expiresIn: "7d" },
		);

		console.log("User logged in successfully!");

		res.status(200).json({
			token,
			user: {
				id: existingUser.id,
				email: existingUser.email,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
});

export default router;
