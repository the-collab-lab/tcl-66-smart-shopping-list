import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo.jsx';

export function Err() {
	return (
		<div className="flex my-auto h-screen bg-[url('assets/lightContrastGraph.png')] bg-cover xsm:p-4">
			<div className="m-auto">
				<div className="flex flex-1 pb-14 justify-center items-center">
					<Logo />
					<div className="inline-block h-[26px] min-h-[1em] w-[3px] self-stretch bg-loginLine/50 xsm:ml-2 sm:ml-0"></div>
					<h1 className="sm:ps-6 xsm:ps-3 xsm:pl-2 xsm:text-[14px] sm:text-lg ">
						Navigation error
					</h1>
				</div>
				<div className="w-full max-w-xl p-7 lg:p-10 gap-5 rounded-lg shadow-lg bg-white">
					<h2 className="leading-6 font-semibold text-lg">
						Eeep, it seems the page you're looking for doesn't exist.
					</h2>
					<div className="inline-block border-t-1 self-stretch border-loginLine/50"></div>
					<div className="px-4">
						<h3>
							Click{' '}
							<NavLink
								to="/"
								aria-current="page"
								className="text-blue-500 hover:text-red-300"
							>
								here
							</NavLink>{' '}
							to return to your lists.
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
}
