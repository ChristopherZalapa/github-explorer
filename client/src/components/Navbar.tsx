import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const authContext = useContext(AuthContext);

	if (!authContext) {
		throw new Error("Navbar needs to be used within AuthProvider");
	}

	const { user, logout } = authContext;

	const isActive = (path: string) => {
		return location.pathname === path;
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const handleHomeClick = () => {
		navigate("/");
	};

	const handleHeaderClick = () => {
		navigate("/");
	};

	const handleSearchClick = () => {
		navigate("/search");
	};

	const handleFavoritesClick = () => {
		navigate("/favorites");
	};

	return (
		<nav className='bg-white shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16 items-center'>
					{/* Logo/Title */}
					<div className='flex items-center gap-8'>
						<h1
							onClick={handleHeaderClick}
							className='text-xl font-bold text-blue-600 cursor-pointer hover:text-blue-700'
						>
							GitHub Explorer
						</h1>

						<div className='flex gap-6'>
							<button
								onClick={handleHomeClick}
								className={`font-medium transition-colors ${
									isActive("/")
										? "text-blue-600 border-b-2 border-blue-600"
										: "text-gray-700 hover:text-blue-600"
								}`}
							>
								Dashboard
							</button>

							<button
								onClick={handleSearchClick}
								className={`font-medium transition-colors ${
									isActive("/search")
										? "text-blue-600 border-b-2 border-blue-600"
										: "text-gray-700 hover:text-blue-600"
								}`}
							>
								Search
							</button>

							<button
								onClick={handleFavoritesClick}
								className={`font-medium transition-colors ${
									isActive("/favorites")
										? "text-blue-600 border-b-2 border-blue-600"
										: "text-gray-700 hover:text-blue-600"
								}`}
							>
								Favorites
							</button>
						</div>
					</div>

					{/* User Menu */}
					<div className='flex items-center gap-4'>
						<span className='text-gray-700 text-sm'>{user?.email}</span>
						<button
							onClick={handleLogout}
							className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
