import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const getFavorites = async (req: Request, res: Response) => {
	try {
		// This gets user ID from JWT Token
		const userId = req.userId;

		// Getting user favorites from database
		const { data: favorites, error } = await supabase
			.from("favorites")
			.select("*")
			.eq("user_id", userId)
			.order("created_at", { ascending: false });

		if (error) {
			throw error;
		}

		res.json({ favorites });
	} catch (error) {
		console.error("GET favorites error:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
};

export const createFavorites = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;

		const {
			repo_full_name,
			stargazers_count,
			description,
			language,
			html_url,
		} = req.body;

		if (!repo_full_name || stargazers_count === undefined || !html_url) {
			return res.status(400).json({
				error:
					"Missing required fields: repo_full_name, stargazers_count, html_url",
			});
		}

		const { data: newFavorite, error } = await supabase
			.from("favorites")
			.insert({
				user_id: userId,
				repo_full_name,
				stargazers_count,
				description,
				language,
				html_url,
			})
			.select()
			.single();

		if (error) {
			if (error.code === "23505") {
				return res.status(409).json({
					error: "Repository already favorited",
				});
			}
			throw error;
		}

		res.status(201).json({
			favorite: newFavorite,
		});
	} catch (error) {
		console.error("Create favorite error", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteFavorite = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;

		// Grabs favorite ID from the URL parameter
		const favoriteId = req.params.id;

		const { error } = await supabase
			.from("favorites")
			.delete()
			.eq("id", favoriteId)
			.eq("user_id", userId);

		if (error) {
			throw error;
		}

		res.status(201).send();
	} catch (error) {
		console.error("Delete favorite error:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
};
