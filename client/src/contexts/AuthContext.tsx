// contexts/AuthContext.tsx
import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type {
	User,
	LoginCredentials,
	RegisterCredentials,
} from "../types/index";
import { authService } from "../services/authService";

// Defining What Data We Are Sharing
interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (credentials: LoginCredentials) => Promise<void>;
	register: (credentials: RegisterCredentials) => Promise<void>;
	logout: () => void;
}

// Creating The Container That Will Hold Our Auth Data
export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

// Helper Functions That Will Load Saved Data
const getInitialToken = (): string | null => {
	return localStorage.getItem("token");
};

const getInitialUser = (): User | null => {
	const storedUser = localStorage.getItem("user");
	return storedUser ? JSON.parse(storedUser) : null;
};

// Whatever We Wrap In AuthProvider Will Be Considered Children
export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(getInitialUser);
	const [token, setToken] = useState<string | null>(getInitialToken);

	const login = async (credentials: LoginCredentials) => {
		const response = await authService.login(credentials);

		setToken(response.token);
		setUser(response.user);

		localStorage.setItem("token", response.token);
		localStorage.setItem("user", JSON.stringify(response.user));
	};

	const register = async (credentials: RegisterCredentials) => {
		await authService.register(credentials);
		await login(credentials);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ user, token, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);

	
}
