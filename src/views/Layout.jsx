import { Outlet, NavLink } from 'react-router-dom';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';

export default function Layout() {
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
					className={`fixed ${sidebarWidth} bg-navBg border-b-1 border-r-1 border-navBorder min-h-screen`}
				>
					<span className="flex flex-col min-h-screen justify-between">
						<div className={sidebarPadding}>
							<NavLink
								to="/"
								className="block px-4 py-1 rounded-md hover:bg-hover"
							>
								Home
							</NavLink>
							<NavLink
								to="/list"
								className="block px-4 py-1 mt-2 rounded-md hover:bg-hover"
							>
								List
							</NavLink>
						</div>
					</span>
					<div className={signInOutContainer}>
						{user ? <SignOutButton /> : <SignInButton />}
					</div>
				</nav>
				{/* Main content */}
				<main
					className={`min-h-screen flex-grow bg-appBg p-2 md:p-6 ${mainContentMargin} pb-12`}
				>
					<Outlet />
					{/* Modal for inviting friends */}
				</main>
			</div>
		</>
	);
}
