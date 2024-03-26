import { Outlet, NavLink } from 'react-router-dom';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import { useTheme } from '../context/ThemeProvider.jsx';
import { ThemeToggle } from '../components/ThemeToggle.jsx';

export function Layout() {
	const { user } = useAuth();
	const { theme } = useTheme();

	const sidebarWidth = 'xsm:min-w-24 sm:min-w-36 md:w-48 lg:w-64';
	const sidebarPadding = 'xsm:pt-4 sm:pt-4 md:p-4';
	const signInOutContainer = 'absolute xsm:pb-4 sm:pb-4 md:p-4 bottom-0 w-full';
	const mainContentMargin = 'xsm:ml-24 sm:ml-36 md:ml-48 lg:ml-64';

	return (
		<>
			<div className={`flex xsm:text-sm sm:text-md md:text-lg`}>
				{/* Sidebar */}
				<nav
					className={`fixed ${sidebarWidth} ${theme === 'light' ? 'bg-navBg text-baseFont border-navBorder' : 'bg-navBgDark text-baseFontDark border-navBorderDark'} border-b-1 border-r-1 min-h-screen`}
				>
					<div className={sidebarPadding}>
						<NavLink
							to="/"
							className={`block px-4 py-1 rounded-md hover:bg-${theme === 'light' ? 'hover' : 'hoverDark'}`}
						>
							Home
						</NavLink>
						<NavLink
							to="/list"
							className={`block px-4 py-1 mt-2 rounded-md hover:bg-${theme === 'light' ? 'hover' : 'hoverDark'}`}
						>
							List
						</NavLink>
					</div>
					<div className={signInOutContainer}>
						{user ? <SignOutButton /> : <SignInButton />}
						<ThemeToggle />
					</div>
				</nav>
				{/* Main content */}
				<main
					className={`min-h-screen bg-cover flex-grow ${theme === 'light' ? `bg-appBg text-baseFont bg-[url('assets/lightGraph.png')]` : `bg-appBgDark bg-blend-overlay bg-[url('assets/graph.png')] text-baseFontDark bg-blend-overlay'}`} p-2 md:p-6 ${mainContentMargin} pb-12`}
				>
					<Outlet />
				</main>
			</div>
		</>
	);
}
