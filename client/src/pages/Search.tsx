import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { githubService } from "../services/githubService";
import type { GitHubRepo } from "../services/githubService";
import { favoritesService } from "../services/favoriteService";
import { getErrorMessage } from "../utils/errorHandlers";
import Navbar from "../components/Navbar";
import LanguageIcon from "../components/LanguageIcon";

export default function Search() {
	const [username, setUsername] = useState("");
	const [repos, setRepos] = useState<GitHubRepo[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [savingRepoId, setSavingRepoId] = useState<number | null>(null);

	// Mutation for saving favorites
	const saveFavoriteMutation = useMutation({
		mutationFn: favoritesService.createFavorite,
		onSuccess: () => {
			alert("Saved to favorites!");
			setSavingRepoId(null);
		},
		onError: (error: unknown) => {
			alert(getErrorMessage(error));
			setSavingRepoId(null);
		},
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);
		setRepos([]);

		try {
			const data = await githubService.getUserRepos(username);
			setRepos(data);
		} catch (error: unknown) {
			setError(getErrorMessage(error));
		} finally {
			setIsLoading(false);
		}
	};

	const handleSaveFavorite = (repo: GitHubRepo) => {
		setSavingRepoId(repo.id);

		saveFavoriteMutation.mutate({
			repo_full_name: repo.full_name,
			stargazers_count: repo.stargazers_count,
			description: repo.description ?? undefined,
			language: repo.language ?? undefined,
			html_url: repo.html_url,
		});
	};

	return (
		<div className='min-h-screen bg-gray-100'>
			<Navbar />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='bg-white rounded-lg shadow p-6 mb-6'>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>
						Search GitHub Repositories
					</h2>

					<form onSubmit={handleSubmit} className='flex gap-4'>
						<input
							type='text'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder='Enter GitHub Username'
							required
							className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<button
							type='submit'
							disabled={isLoading}
							className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed'
						>
							{isLoading ? "Searching..." : "Search"}
						</button>
					</form>

					{error && (
						<div className='mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
							{error}
						</div>
					)}
				</div>

				{repos.length > 0 && (
					<div className='bg-white rounded-lg shadow p-6'>
						<h3 className='text-xl font-bold text-gray-900 mb-4'>
							Found {repos.length} repositories
						</h3>

						<div className='space-y-4'>
							{repos.map((repo) => (
								<div
									key={repo.id}
									className='border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors'
								>
									<div className='flex items-start justify-between'>
										<div className='flex-1'>
											<h4 className='text-lg font-semibold text-blue-600'>
												<a
													href={repo.html_url}
													target='_blank'
													rel='noopener noreferrer'
													className='hover:underline'
												>
													{repo.name}
												</a>
											</h4>

											<p className='text-gray-600 mt-1'>
												{repo.description || "No description provided"}
											</p>

											<div className='flex gap-4 mt-2 text-sm text-gray-500'>
												{repo.language && <LanguageIcon language={repo.language} />}
												<span>⭐ {repo.stargazers_count}</span>
											</div>
										</div>

										<button
											onClick={() => handleSaveFavorite(repo)}
											disabled={savingRepoId === repo.id}
											className='ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed'
										>
											{savingRepoId === repo.id ? "Saving..." : "Save"}{" "}
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{!isLoading && repos.length === 0 && !error && (
					<div className='bg-white rounded-lg shadow p-6 text-center text-gray-500'>
						Enter a GitHub username to search for repositories
					</div>
				)}
			</main>
		</div>
	);
}
