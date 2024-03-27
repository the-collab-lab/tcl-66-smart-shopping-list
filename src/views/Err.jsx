import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo.jsx';

export function Err() {
	return (
		<div className="flex my-auto h-screen bg-[url('assets/contrastGraph.png')] bg-cover xsm:p-4">
			<div className="m-auto">
				<div className="flex flex-1 pb-14 sm:justify-center xsm:justify-between items-center">
					<Logo />
					<div className="inline-block h-[26px] min-h-[1em] w-[3px] self-stretch bg-loginLine/50"></div>
					<h1 className="sm:ps-6 xsm:pl-2 xsm:text-[14px] sm:text-lg ">
						Error Page
					</h1>
				</div>
				<div className="flex justify-between flex-col w-max-w-xl p-7 gap-5 h-[174px] rounded-lg shadow-lg bg-white">
					<h2 className="leading-6 font-semibold text-lg">
						Sorry, the page you're looking for doesn't exist.
					</h2>
					<div className="inline-block border-t-1 self-stretch border-loginLine/50"></div>
					<div className="px-4">
						{' '}
						{/* Add padding to the container */}
						<h3>
							Please navigate back to the{' '}
							<NavLink
								to="/"
								aria-current="page"
								className="text-blue-500 hover:text-red-300"
							>
								Login
							</NavLink>{' '}
							page.
						</h3>{' '}
						{/* Style NavLink using Tailwind CSS */}
					</div>
				</div>
			</div>
		</div>
	);
}
