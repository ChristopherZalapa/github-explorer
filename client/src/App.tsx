import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";

export default function App() {
	const authContext = useContext(AuthContext);

	if (!authContext) {
		throw new Error("App must be used within AuthProvider");
	}

	const { user } = authContext;

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/login'
					element={user ? <Navigate to='/' replace /> : <Login />}
				/>

				<Route
					path='/register'
					element={user ? <Navigate to='/' replace /> : <Register />}
				/>

				<Route
					path='/'
					element={user ? <Dashboard /> : <Navigate to='/login' replace />}
				/>

				<Route
					path='/search'
					element={user ? <Search /> : <Navigate to='/login' replace />}
				/>

				<Route
					path='/favorites'
					element={user ? <Favorites /> : <Navigate to='/login' replace />}
				/>
			</Routes>
		</BrowserRouter>
	);
}
