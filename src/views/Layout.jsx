import { Outlet, NavLink } from 'react-router-dom';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';

export function Layout() {
	const { user } = useAuth();

	return (
		<>
			<div className="flex">
				{/* Sidebar */}
				<nav className="w-64 min-w-64 bg-white border-b-1 border-r-1 border-gray-200 h-screen">
					<div className="p-4">
						<NavLink
							to="/"
							className="block px-4 py-1 rounded-md hover:bg-gray-100"
						>
							Home
						</NavLink>
						<NavLink
							to="/list"
							className="block px-4 py-1 mt-2 rounded-md hover:bg-gray-100"
						>
							List
						</NavLink>
						<NavLink
							to="/manage-list"
							className="block px-4 py-1 mt-2 rounded-md hover:bg-gray-100"
						>
							Manage List
						</NavLink>
					</div>
					<div className="absolute p-4 bottom-0 w-full">
						{user ? <SignOutButton /> : <SignInButton />}
					</div>
				</nav>
				{/* Main content */}
				<main className="flex-grow bg-gray-50 p-6 pb-0">
					<Outlet />
				</main>
			</div>
		</>
	);
}
