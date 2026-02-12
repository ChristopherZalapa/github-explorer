import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

const githubAPI = axios.create({
	baseURL: GITHUB_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export type GitHubRepo = {
	id: number;
	name: string;
	description: string | null;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
	full_name: string;
	html_url: string;
	created_at: string;
	updated_at: string;
};

export const githubService = {
	getUserRepos: async (username: string): Promise<GitHubRepo[]> => {
		const { data } = await githubAPI.get<GitHubRepo[]>(
			`/users/${username}/repos`,
		);
		return data;
	},
};
