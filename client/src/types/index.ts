export interface User {
	id: string;
	email: string;
}

export interface AuthResponse {
	token: string;
	user: User;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	email: string;
	password: string;
}

export interface Favorite {
	id: string;
	user_id: string;
	repo_full_name: string;
	stargazers_count: number;
	description: string | null;
	language: string | null;
	html_url: string;
	created_at: string;
}

export interface CreateFavoriteData {
	repo_full_name: string;
	stargazers_count: number;
	description?: string;
	language?: string;
	html_url: string;
}

export interface ApiError {
	error: string;
}

export interface RegisterResponse {
	message: string;
	userId: string;
}
