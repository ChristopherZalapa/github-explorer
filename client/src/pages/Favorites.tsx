import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { favoritesService } from "../services/favoriteService";
import type { Favorite } from "../types";
import { getErrorMessage } from "../utils/errorHandlers";
import Navbar from "../components/Navbar";
import LanguageIcon from "../components/LanguageIcon";

export default function Favorites() {
	const queryClient = useQueryClient();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const {
		data: favorites,
		isLoading,
		error,
	} = useQuery<Favorite[]>({
		queryKey: ["favorites"],
		queryFn: favoritesService.getFavorites,
	});

	const deleteMutation = useMutation({
		mutationFn: favoritesService.deleteFavorite,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites"] });
			setDeletingId(null);
		},
		onError: (err: unknown) => {
			alert(getErrorMessage(err));
			setDeletingId(null);
		},
	});

	const handleDelete = async (id: string) => {
		if (window.confirm("Are you sure you want to remove this favorite?")) {
			setDeletingId(id);
			try {
				await deleteMutation.mutateAsync(id);
			} catch (err: unknown) {
				console.log(err);
			}
		}
	};

	return (
		<div className='min-h-screen bg-gray-100'>
			<Navbar />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='bg-white rounded-lg shadow p-6'>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>
						My Favorite Repositories
					</h2>

					{isLoading && (
						<div className='text-center py-12'>
							<div className='text-gray-600'>Loading your favorites...</div>
						</div>
					)}

					{error && (
						<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
							{getErrorMessage(error)}
						</div>
					)}

					{!isLoading && !error && favorites && favorites.length === 0 && (
						<div className='text-center py-12'>
							<p className='text-gray-600 text-lg mb-4'>
								You haven't saved any favorites yet.
							</p>
							<p className='text-gray-500'>
								Search for repositories and save your favorites!
							</p>
						</div>
					)}

					{!isLoading && favorites && favorites.length > 0 && (
						<div className='space-y-4'>
							{favorites.map((favorite) => (
								<div
									key={favorite.id}
									className='border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors'
								>
									<div className='flex items-start justify-between'>
										<div className='flex-1'>
											<h3 className='text-lg font-semibold text-blue-600'>
												<a
													href={favorite.html_url}
													target='_blank'
													rel='noopener noreferrer'
													className='hover:underline'
												>
													{favorite.repo_full_name}
												</a>
											</h3>

											<p className='text-gray-600 mt-1'>
												{favorite.description || "No description provided"}
											</p>

											<div className='flex gap-4 mt-2 text-sm text-gray-500'>
												{favorite.language && (
													<LanguageIcon language={favorite.language} />
												)}
												<span>⭐ {favorite.stargazers_count}</span>
											</div>

											<div className='text-xs text-gray-400 mt-2'>
												Saved on{" "}
												{new Date(favorite.created_at).toLocaleDateString()}
											</div>
										</div>

										<button
											onClick={() => handleDelete(favorite.id)}
											disabled={deletingId === favorite.id}
											className='ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed'
										>
											{deletingId === favorite.id
												? "Removing..."
												: "Remove"}{" "}
										</button>
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
