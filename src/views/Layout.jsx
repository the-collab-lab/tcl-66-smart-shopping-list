import { Outlet, NavLink } from 'react-router-dom';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';

export function Layout() {
	const { user } = useAuth();

	const sidebarWidth = 'xsm:min-w-24 sm:min-w-36 md:w-48 lg:w-64';
	const sidebarPadding = 'xsm:pt-4 sm:pt-4 md:p-4';
	const signInOutContainer = 'absolute xsm:pb-4 sm:pb-4 md:p-4 bottom-0 w-full';
	const mainContentMargin = 'xsm:ml-24 sm:ml-36 md:ml-48 lg:ml-64';

	return (
		<>
			<div className={`flex xsm:text-sm sm:text-md md:text-lg`}>
				{/* Sidebar */}
				<nav
					className={`fixed ${sidebarWidth} bg-white border-b-1 border-r-1 border-gray-200 min-h-screen`}
				>
					<div className={sidebarPadding}>
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
					</div>
					<div className={signInOutContainer}>
						{user ? <SignOutButton /> : <SignInButton />}
					</div>
				</nav>
				{/* Main content */}
				<main
					className={`min-h-screen flex-grow bg-gray-50 p-2 md:p-6 ${mainContentMargin} pb-12`}
				>
					<Outlet />
				</main>
			</div>
		</>
	);
}
