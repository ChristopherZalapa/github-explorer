import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { favoritesService } from "../services/favoriteService";
import type { Favorite } from "../types";
import { getErrorMessage } from "../utils/errorHandlers";
import Navbar from "../components/Navbar";
import LanguageIcon from "../components/LanguageIcon";

export default function Dashboard() {
	const navigate = useNavigate();

	// Fetch favorites with Tanstack
	const {
		data: favorites,
		isLoading,
		error,
	} = useQuery<Favorite[]>({
		queryKey: ["favorites"],
		queryFn: favoritesService.getFavorites,
	});

	return (
		<div className='min-h-screen bg-gray-100'>
			<Navbar />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='bg-white rounded-lg shadow p-6 mb-6'>
					<h2 className='text-2xl font-bold text-gray-900 mb-2'>
						Welcome to GitHub Explorer!
					</h2>
					<p className='text-gray-600'>
						Search for repositories and manage your favorites.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
					<button
						onClick={() => navigate("/search")}
						className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left'
					>
						<div className='text-3xl mb-2'>🔍</div>
						<h3 className='text-lg font-semibold text-gray-900 mb-1'>
							Search Repositories
						</h3>
						<p className='text-gray-600 text-sm'>
							Find and explore GitHub repositories by username
						</p>
					</button>

					<button
						onClick={() => navigate("/favorites")}
						className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left'
					>
						<div className='text-3xl mb-2'>❤️</div>
						<h3 className='text-lg font-semibold text-gray-900 mb-1'>
							My Favorites
						</h3>
						<p className='text-gray-600 text-sm'>
							View and manage your saved repositories
						</p>
					</button>
				</div>

				{/* Recent Favorites */}
				<div className='bg-white rounded-lg shadow p-6'>
					<div className='flex justify-between items-center mb-4'>
						<h3 className='text-xl font-bold text-gray-900'>
							Recent Favorites
						</h3>
						{favorites && favorites.length > 0 && (
							<button
								onClick={() => navigate("/favorites")}
								className='text-blue-600 hover:text-blue-700 font-medium text-sm'
							>
								View All
							</button>
						)}
					</div>

					{isLoading && (
						<div className='text-center py-8'>
							<div className='text-gray-600'>Loading favorites...</div>
						</div>
					)}

					{error && (
						<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
							{getErrorMessage(error)}
						</div>
					)}

					{!isLoading && !error && favorites && favorites.length === 0 && (
						<div className='text-center py-8'>
							<p className='text-gray-600 mb-4'>
								You haven't saved any favorites yet.
							</p>
							<button
								onClick={() => navigate("/search")}
								className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
							>
								Start Searching
							</button>
						</div>
					)}

					{!isLoading && favorites && favorites.length > 0 && (
						<div className='space-y-3'>
							{favorites.slice(0, 5).map((favorite) => (
								<div
									key={favorite.id}
									className='border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors'
								>
									<div className='flex items-start justify-between'>
										<div className='flex-1'>
											<h4 className='text-lg font-semibold text-blue-600'>
												<a
													href={favorite.html_url}
													target='_blank'
													rel='noopener noreferrer'
													className='hover:underline'
												>
													{favorite.repo_full_name}
												</a>
											</h4>

											<p className='text-gray-600 text-sm mt-1'>
												{favorite.description || "No description provided"}
											</p>

											<div className='flex gap-4 mt-2 text-sm text-gray-500'>
												{favorite.language && (
													<LanguageIcon language={favorite.language} />
												)}
												<span>⭐ {favorite.stargazers_count}</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
