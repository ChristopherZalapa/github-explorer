import { api } from "./api";
import type {
	AuthResponse,
	LoginCredentials,
	RegisterCredentials,
	RegisterResponse,
} from "../types";

export const authService = {
	// Register new user
	register: async (
		credentials: RegisterCredentials,
	): Promise<RegisterResponse> => {
		const { data } = await api.post<RegisterResponse>(
			"/auth/register",
			credentials,
		);
		return data;
	},

	// Login existing user
	login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
		const { data } = await api.post<AuthResponse>("/auth/login", credentials);
		return data;
	},
};
