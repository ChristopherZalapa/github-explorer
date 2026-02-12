import { api } from "./api";
import type { Favorite, CreateFavoriteData } from "../types/index";

export const favoritesService = {
	getFavorites: async (): Promise<Favorite[]> => {
		const { data } = await api.get<{ favorites: Favorite[] }>("/user/favorites");
		return data.favorites;
	},

	createFavorite: async (
		favoriteData: CreateFavoriteData,
	): Promise<Favorite> => {
		const { data } = await api.post<{ favorite: Favorite }>(
			"/user/favorites",
			favoriteData,
		);
		return data.favorite;
	},

	deleteFavorite: async (id: string): Promise<void> => {
		await api.delete(`/user/favorites/${id}`);
	},
};
